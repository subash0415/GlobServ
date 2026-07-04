from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, BeforeValidator, ConfigDict

# ---------------- Config ----------------

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")
CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",") if o.strip()]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# ---------------- Helpers ----------------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def set_auth_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=60 * 60 * 12,
        path="/",
    )


async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Not authorized")
    user["_id"] = str(user["_id"])
    user.pop("password_hash", None)
    return user


# ---------------- Models ----------------

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class InquiryCreate(BaseModel):
    name: str
    company: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    product: Optional[str] = ""
    order_type: Optional[str] = ""
    message: str


class Inquiry(BaseModel):
    id: str
    name: str
    company: str = ""
    email: str
    phone: str = ""
    product: str = ""
    order_type: str = ""
    message: str
    created_at: str
    status: str = "new"


class ProductCreate(BaseModel):
    name: str
    slug: str
    category: str  # "core" | "optional"
    tagline: str
    description: str
    origin: str = "South India"
    image_url: str = ""
    moq: str = "On enquiry"
    specs: List[dict] = []  # [{"key":"Moisture","value":"< 7%"}]
    packaging: List[str] = []
    order_index: int = 0


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    origin: Optional[str] = None
    image_url: Optional[str] = None
    moq: Optional[str] = None
    specs: Optional[List[dict]] = None
    packaging: Optional[List[str]] = None
    order_index: Optional[int] = None


class Product(BaseModel):
    id: str
    name: str
    slug: str
    category: str
    tagline: str
    description: str
    origin: str
    image_url: str
    moq: str
    specs: List[dict]
    packaging: List[str]
    order_index: int


class Settings(BaseModel):
    whatsapp_number: str
    business_email: str
    business_tagline: str
    address: str


# ---------------- App ----------------

app = FastAPI(title="GlobServ International Traders API")
api = APIRouter(prefix="/api")


def product_from_doc(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name", ""),
        "slug": doc.get("slug", ""),
        "category": doc.get("category", "core"),
        "tagline": doc.get("tagline", ""),
        "description": doc.get("description", ""),
        "origin": doc.get("origin", "South India"),
        "image_url": doc.get("image_url", ""),
        "moq": doc.get("moq", "On enquiry"),
        "specs": doc.get("specs", []),
        "packaging": doc.get("packaging", []),
        "order_index": doc.get("order_index", 0),
    }


def inquiry_from_doc(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name", ""),
        "company": doc.get("company", ""),
        "email": doc.get("email", ""),
        "phone": doc.get("phone", ""),
        "product": doc.get("product", ""),
        "order_type": doc.get("order_type", ""),
        "message": doc.get("message", ""),
        "created_at": doc.get("created_at", ""),
        "status": doc.get("status", "new"),
    }


# ---------------- Auth Routes ----------------

@api.post("/auth/login")
async def login(payload: LoginRequest, response: Response):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    token = create_access_token(str(user["_id"]), email)
    set_auth_cookie(response, token)
    return {"email": email, "role": "admin", "token": token}


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


@api.get("/auth/me")
async def me(current=Depends(get_current_admin)):
    return current


# ---------------- Public: Products & Settings ----------------

@api.get("/products")
async def list_products():
    docs = await db.products.find({}).sort("order_index", 1).to_list(200)
    return [product_from_doc(d) for d in docs]


@api.get("/settings")
async def get_settings():
    doc = await db.settings.find_one({"_id": "main"})
    if not doc:
        return {
            "whatsapp_number": "+91 95852 18525",
            "business_email": "globservtraders@gmail.com",
            "business_tagline": "Specialist Agri Exporters from Ranipet, Tamil Nadu",
            "address": "No.171/2C1A, Abdullapuram, Ranipet, Tamil Nadu — 631102",
        }
    doc.pop("_id", None)
    return doc


# ---------------- Public: Inquiries (Create) ----------------

@api.post("/inquiries")
async def create_inquiry(payload: InquiryCreate):
    doc = payload.model_dump()
    doc["email"] = doc["email"].lower().strip()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["status"] = "new"
    result = await db.inquiries.insert_one(doc)
    doc["_id"] = result.inserted_id
    return inquiry_from_doc(doc)


# ---------------- Admin: Inquiries ----------------

@api.get("/admin/inquiries")
async def admin_list_inquiries(current=Depends(get_current_admin)):
    docs = await db.inquiries.find({}).sort("created_at", -1).to_list(500)
    return [inquiry_from_doc(d) for d in docs]


@api.delete("/admin/inquiries/{inquiry_id}")
async def admin_delete_inquiry(inquiry_id: str, current=Depends(get_current_admin)):
    try:
        oid = ObjectId(inquiry_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id")
    await db.inquiries.delete_one({"_id": oid})
    return {"ok": True}


@api.delete("/admin/inquiries")
async def admin_clear_inquiries(current=Depends(get_current_admin)):
    await db.inquiries.delete_many({})
    return {"ok": True}


# ---------------- Admin: Products ----------------

@api.post("/admin/products")
async def admin_create_product(payload: ProductCreate, current=Depends(get_current_admin)):
    doc = payload.model_dump()
    result = await db.products.insert_one(doc)
    doc["_id"] = result.inserted_id
    return product_from_doc(doc)


@api.put("/admin/products/{product_id}")
async def admin_update_product(product_id: str, payload: ProductUpdate, current=Depends(get_current_admin)):
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id")
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if update:
        await db.products.update_one({"_id": oid}, {"$set": update})
    doc = await db.products.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_from_doc(doc)


@api.delete("/admin/products/{product_id}")
async def admin_delete_product(product_id: str, current=Depends(get_current_admin)):
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id")
    await db.products.delete_one({"_id": oid})
    return {"ok": True}


# ---------------- Admin: Settings ----------------

@api.put("/admin/settings")
async def admin_update_settings(payload: Settings, current=Depends(get_current_admin)):
    doc = payload.model_dump()
    doc["_id"] = "main"
    await db.settings.replace_one({"_id": "main"}, doc, upsert=True)
    doc.pop("_id", None)
    return doc


@api.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS if CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- Seed ----------------

DEFAULT_PRODUCTS = [
    {
        "name": "Spirulina",
        "slug": "spirulina",
        "category": "core",
        "tagline": "Cultivated & Processed",
        "description": "Cultivated and processed spirulina, available as dried powder or flakes. Grown under controlled conditions with consistent quality control for food, nutraceutical and feed applications.",
        "origin": "Tamil Nadu, India",
        "image_url": "https://images.pexels.com/photos/13787646/pexels-photo-13787646.jpeg",
        "moq": "500 kg",
        "specs": [
            {"key": "Form", "value": "Powder / Flakes"},
            {"key": "Protein Content", "value": "60 - 70%"},
            {"key": "Moisture", "value": "< 7%"},
            {"key": "Mesh Size", "value": "80 - 100"},
            {"key": "Ash Content", "value": "< 8%"},
            {"key": "Shelf Life", "value": "24 months"},
            {"key": "Colour", "value": "Deep Green"},
            {"key": "Storage", "value": "Cool, dry place"},
        ],
        "packaging": [
            "1 kg / 5 kg / 25 kg food-grade LDPE inside kraft paper bags",
            "Bulk 25 kg drums lined with food-grade LDPE",
            "Private label / OEM packaging available",
        ],
        "order_index": 1,
    },
    {
        "name": "Aloe Vera",
        "slug": "aloe-vera",
        "category": "core",
        "tagline": "Fresh Leaves & Powder",
        "description": "Fresh aloe vera leaves and processed aloe vera powder, produced from mature Barbadensis Miller plants. Suited for cosmetics, nutraceuticals and beverage applications.",
        "origin": "Tamil Nadu, India",
        "image_url": "https://images.pexels.com/photos/33793906/pexels-photo-33793906.jpeg",
        "moq": "1,000 kg (leaves) / 200 kg (powder)",
        "specs": [
            {"key": "Form", "value": "Fresh Leaves / Powder"},
            {"key": "Species", "value": "Aloe Barbadensis Miller"},
            {"key": "Leaf Length", "value": "45 - 70 cm"},
            {"key": "Moisture (Powder)", "value": "< 8%"},
            {"key": "Mesh Size", "value": "80 - 200"},
            {"key": "Aloin Content", "value": "< 10 ppm (optional)"},
            {"key": "Shelf Life", "value": "18 months (powder)"},
            {"key": "Storage", "value": "Refrigerated / Ambient dry"},
        ],
        "packaging": [
            "Fresh leaves: 20 kg export cartons, ventilated",
            "Powder: 25 kg fibre drums, LDPE lined",
            "Reefer container loading for fresh leaves",
        ],
        "order_index": 2,
    },
    {
        "name": "Khus (Vetiver) Roots",
        "slug": "vetiver",
        "category": "core",
        "tagline": "Sun-Dried Roots",
        "description": "Sun-dried Khus (Vetiver) roots, sourced from South India and valued globally for their fragrance in perfumery, essential oils, mats and traditional cooling applications.",
        "origin": "South India",
        "image_url": "https://customer-assets.emergentagent.com/job_agro-trade-portal-3/artifacts/25b0q6uu_image.png",
        "moq": "500 kg",
        "specs": [
            {"key": "Form", "value": "Dried Roots (whole)"},
            {"key": "Length", "value": "15 - 40 cm"},
            {"key": "Moisture", "value": "< 12%"},
            {"key": "Foreign Matter", "value": "< 2%"},
            {"key": "Oil Content", "value": "1.5 - 3.0% (v/w)"},
            {"key": "Colour", "value": "Pale brown to reddish brown"},
            {"key": "Shelf Life", "value": "24 months"},
            {"key": "Storage", "value": "Cool, dry, well ventilated"},
        ],
        "packaging": [
            "25 kg / 50 kg jute bales, compressed",
            "Fibre carton for airfreight sample orders",
            "Full container load: 40'HC ~ 8 - 10 MT",
        ],
        "order_index": 3,
    },
    {
        "name": "Basmati 1121 Rice",
        "slug": "basmati-1121",
        "category": "optional",
        "tagline": "Extra-Long Grain",
        "description": "Extra-long grain Pusa Basmati 1121, available as an optional addition alongside our core export range. Aged and sortex-cleaned for consistent grain length.",
        "origin": "North India",
        "image_url": "https://customer-assets.emergentagent.com/job_agro-trade-portal-3/artifacts/h3qlbnbu_image.png",
        "moq": "20 MT",
        "specs": [
            {"key": "Variety", "value": "Pusa Basmati 1121"},
            {"key": "Grain Length (avg)", "value": "8.30 - 8.40 mm"},
            {"key": "Cooked Length", "value": "18 - 21 mm"},
            {"key": "Moisture", "value": "< 13%"},
            {"key": "Broken", "value": "< 2%"},
            {"key": "Damaged", "value": "< 1%"},
            {"key": "Foreign Matter", "value": "Nil"},
            {"key": "Shelf Life", "value": "24 months"},
        ],
        "packaging": [
            "5 / 10 / 25 kg non-woven PP bags",
            "Jute bags 50 kg for bulk",
            "Container: 25 - 26 MT per 20'FCL",
        ],
        "order_index": 4,
    },
    {
        "name": "Chilli",
        "slug": "chilli",
        "category": "optional",
        "tagline": "Whole & Powdered",
        "description": "Sun-dried whole red chilli and powdered chilli, available on request for buyers combining orders with our core products.",
        "origin": "South India",
        "image_url": "https://images.unsplash.com/photo-1602237514002-c2d8ae2da393?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHJlZCUyMGNoaWxsaXxlbnwwfHx8fDE3ODI3MjE0NzF8MA&ixlib=rb-4.1.0&q=85",
        "moq": "5 MT",
        "specs": [
            {"key": "Form", "value": "Whole / Powder"},
            {"key": "Variety", "value": "S4 / Sannam / Teja"},
            {"key": "Moisture", "value": "< 10%"},
            {"key": "SHU (heat)", "value": "20,000 - 90,000"},
            {"key": "Colour (ASTA)", "value": "60 - 140"},
            {"key": "Broken", "value": "< 3%"},
            {"key": "Foreign Matter", "value": "< 1%"},
            {"key": "Shelf Life", "value": "12 months"},
        ],
        "packaging": [
            "25 kg PP woven bags with liner",
            "Cartons 10 - 20 kg for retail",
            "Container: ~14 MT per 20'FCL",
        ],
        "order_index": 5,
    },
    {
        "name": "Turmeric",
        "slug": "turmeric",
        "category": "optional",
        "tagline": "Erode Origin",
        "description": "Erode turmeric — fingers and powder — known for high curcumin content. Available on request alongside our core export range.",
        "origin": "Erode, Tamil Nadu",
        "image_url": "https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg",
        "moq": "5 MT",
        "specs": [
            {"key": "Form", "value": "Fingers / Powder"},
            {"key": "Variety", "value": "Erode / Salem"},
            {"key": "Curcumin", "value": "2.5 - 4.5%"},
            {"key": "Moisture", "value": "< 10%"},
            {"key": "Mesh (powder)", "value": "60 - 80"},
            {"key": "Colour", "value": "Bright yellow"},
            {"key": "Total Ash", "value": "< 7%"},
            {"key": "Shelf Life", "value": "24 months"},
        ],
        "packaging": [
            "25 kg / 50 kg PP woven bags",
            "Fibre drums for powder",
            "Container: ~18 MT per 20'FCL",
        ],
        "order_index": 6,
    },
]


@app.on_event("startup")
async def startup():
    # Indexes
    await db.users.create_index("email", unique=True)
    await db.inquiries.create_index("created_at")
    await db.products.create_index("slug", unique=True)

    # Seed admin
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if not existing:
        await db.users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin: {ADMIN_EMAIL}")
    else:
        if not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
            await db.users.update_one(
                {"email": ADMIN_EMAIL},
                {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}}
            )
            logger.info(f"Updated admin password: {ADMIN_EMAIL}")

    # Seed products (only if empty)
    count = await db.products.count_documents({})
    if count == 0:
        await db.products.insert_many([dict(p) for p in DEFAULT_PRODUCTS])
        logger.info(f"Seeded {len(DEFAULT_PRODUCTS)} default products")


@app.on_event("shutdown")
async def shutdown():
    client.close()
