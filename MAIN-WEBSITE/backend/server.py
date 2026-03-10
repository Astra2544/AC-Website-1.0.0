"""
Astra Capital e.U. - Backend API Server
FastAPI Backend für Kontaktformular, Newsletter und allgemeine API-Funktionen
"""

import os
import json
import smtplib
from datetime import datetime, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn


# Environment Variables
DOMAIN = os.environ.get('DOMAIN', 'astra-capital.eu')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'info@astra-capital.at')
SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASS = os.environ.get('SMTP_PASS', '')
API_PORT = int(os.environ.get('API_PORT', '8000'))

# Data storage path
DATA_DIR = '/app/data'
CONTACTS_FILE = os.path.join(DATA_DIR, 'contacts.json')
NEWSLETTER_FILE = os.path.join(DATA_DIR, 'newsletter.json')


def ensure_data_dir():
    """Ensure data directory exists"""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not os.path.exists(CONTACTS_FILE):
        with open(CONTACTS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(NEWSLETTER_FILE):
        with open(NEWSLETTER_FILE, 'w') as f:
            json.dump([], f)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    ensure_data_dir()
    print(f"[Astra Backend] Server started on port {API_PORT}")
    print(f"[Astra Backend] Domain: {DOMAIN}")
    print(f"[Astra Backend] Contact Email: {CONTACT_EMAIL}")
    yield
    print("[Astra Backend] Server shutting down...")


app = FastAPI(
    title="Astra Capital API",
    description="Backend API für Astra Capital e.U. Website",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        f"https://{DOMAIN}",
        f"https://www.{DOMAIN}",
        "http://localhost:8080",
        "http://localhost:3000",
        "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# MODELS
# ============================================

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Kontaktanfrage"
    message: str
    area: Optional[str] = "general"  # development, ecom, consulting, vending, general


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = ""


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    domain: str


# ============================================
# HELPER FUNCTIONS
# ============================================

def load_json_file(filepath: str) -> list:
    """Load data from JSON file"""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_json_file(filepath: str, data: list):
    """Save data to JSON file"""
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, default=str)


def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """Send email via SMTP (if configured)"""
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASS]):
        print("[Email] SMTP not configured, skipping email send")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = SMTP_USER
        msg['To'] = to_email
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
        
        print(f"[Email] Successfully sent to {to_email}")
        return True
    except Exception as e:
        print(f"[Email] Failed to send: {e}")
        return False


# ============================================
# API ROUTES
# ============================================

@app.get("/", response_model=HealthResponse)
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version="1.0.0",
        domain=DOMAIN
    )


@app.get("/api/info")
async def api_info():
    """API Information"""
    return {
        "name": "Astra Capital API",
        "version": "1.0.0",
        "company": "Astra Capital e.U.",
        "areas": ["development", "ecom", "consulting", "vending"],
        "endpoints": {
            "health": "/health",
            "contact": "/api/contact",
            "newsletter": "/api/newsletter"
        }
    }


@app.post("/api/contact")
async def submit_contact(form: ContactForm, request: Request):
    """
    Submit contact form
    Speichert die Anfrage und sendet optional E-Mail-Benachrichtigung
    """
    # Get client IP
    client_ip = request.client.host if request.client else "unknown"
    
    # Create contact entry
    contact_entry = {
        "id": datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S%f"),
        "name": form.name,
        "email": form.email,
        "subject": form.subject,
        "message": form.message,
        "area": form.area,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "ip": client_ip,
        "status": "new"
    }
    
    # Load existing contacts and append
    contacts = load_json_file(CONTACTS_FILE)
    contacts.append(contact_entry)
    save_json_file(CONTACTS_FILE, contacts)
    
    # Send notification email to admin
    area_names = {
        "development": "Astra Development",
        "ecom": "Astra Ecom",
        "consulting": "Astra Consulting",
        "vending": "Astra Vending",
        "general": "Allgemein"
    }
    
    email_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden;">
            <div style="background: #ff264a; color: #fff; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Neue Kontaktanfrage</h1>
            </div>
            <div style="padding: 30px;">
                <p><strong>Bereich:</strong> {area_names.get(form.area, form.area)}</p>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>E-Mail:</strong> {form.email}</p>
                <p><strong>Betreff:</strong> {form.subject}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p><strong>Nachricht:</strong></p>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">{form.message}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">
                    Zeitstempel: {contact_entry['timestamp']}<br>
                    ID: {contact_entry['id']}
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    email_sent = send_email(
        CONTACT_EMAIL,
        f"[Astra Capital] Neue Anfrage: {form.subject}",
        email_html
    )
    
    return {
        "success": True,
        "message": "Vielen Dank für Ihre Nachricht! Wir werden uns schnellstmöglich bei Ihnen melden.",
        "id": contact_entry["id"],
        "email_notification": email_sent
    }


@app.post("/api/newsletter")
async def subscribe_newsletter(data: NewsletterSubscribe, request: Request):
    """
    Subscribe to newsletter
    """
    client_ip = request.client.host if request.client else "unknown"
    
    # Load existing subscribers
    subscribers = load_json_file(NEWSLETTER_FILE)
    
    # Check if email already exists
    existing = [s for s in subscribers if s.get('email') == data.email]
    if existing:
        return {
            "success": True,
            "message": "Diese E-Mail-Adresse ist bereits für unseren Newsletter angemeldet.",
            "already_subscribed": True
        }
    
    # Create subscriber entry
    subscriber = {
        "id": datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S%f"),
        "email": data.email,
        "name": data.name,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "ip": client_ip,
        "status": "active"
    }
    
    subscribers.append(subscriber)
    save_json_file(NEWSLETTER_FILE, subscribers)
    
    return {
        "success": True,
        "message": "Vielen Dank! Sie wurden erfolgreich für unseren Newsletter angemeldet.",
        "already_subscribed": False
    }


@app.get("/api/stats")
async def get_stats():
    """
    Get basic statistics (for internal use)
    """
    contacts = load_json_file(CONTACTS_FILE)
    subscribers = load_json_file(NEWSLETTER_FILE)
    
    return {
        "contacts": {
            "total": len(contacts),
            "new": len([c for c in contacts if c.get('status') == 'new']),
            "by_area": {
                area: len([c for c in contacts if c.get('area') == area])
                for area in ['development', 'ecom', 'consulting', 'vending', 'general']
            }
        },
        "newsletter": {
            "total_subscribers": len(subscribers),
            "active": len([s for s in subscribers if s.get('status') == 'active'])
        }
    }


# ============================================
# MAIN
# ============================================

if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=API_PORT,
        reload=False
    )
