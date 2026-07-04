"""Iteration 2 targeted backend tests."""
import os
import requests

BASE = os.environ.get("REACT_APP_BACKEND_URL", "https://agro-trade-portal-3.preview.emergentagent.com").rstrip("/")

VETIVER_URL = "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1600&q=80"
BASMATI_URL = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&q=80"


def test_products_count_and_updated_images():
    r = requests.get(f"{BASE}/api/products", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 6
    by_slug = {p["slug"]: p for p in data}
    assert by_slug["vetiver"]["image_url"] == VETIVER_URL
    assert by_slug["basmati-1121"]["image_url"] == BASMATI_URL
    for p in data:
        assert "pexels-photo-17507324" not in p["image_url"]
        assert "pexels-photo-36346840" not in p["image_url"]


def test_updated_image_urls_are_reachable():
    for u in [VETIVER_URL, BASMATI_URL]:
        r = requests.get(u, timeout=15, stream=True)
        assert r.status_code == 200


def test_inquiry_public_post():
    r = requests.post(f"{BASE}/api/inquiries", json={
        "name": "TEST_QA_iter2",
        "email": "qa_iter2@example.com",
        "message": "iteration 2 regression check",
    }, timeout=15)
    assert r.status_code in (200, 201)
    body = r.json()
    assert "id" in body


def test_admin_login_and_list_inquiries():
    s = requests.Session()
    r = s.post(f"{BASE}/api/auth/login", json={
        "email": "admin@globservinternational.com",
        "password": "6379348863",
    }, timeout=15)
    assert r.status_code == 200
    assert "access_token" in s.cookies
    r2 = s.get(f"{BASE}/api/admin/inquiries", timeout=15)
    assert r2.status_code == 200
    assert isinstance(r2.json(), list)
