# BS SHOP Store Demo

A bilingual Arabic and English clothing store demo for **BS SHOP** in Birkhadem. The frontend keeps the Zara-style editorial look, while the new Django backend lets the shop owner manage products, categories, images, prices, stock, and store info from Django Admin.

## Stack

- Frontend: React + Vite, Tailwind CSS, Framer Motion, Lucide React
- Backend: Django, Django REST Framework, SQLite, Django Admin
- Media uploads: Django `ImageField` + Pillow
- API/CORS: `django-cors-headers`

## Backend Setup

From the project root:

```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r backend/requirements.txt
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

Admin:

```text
http://127.0.0.1:8000/admin/
```

API endpoints:

```text
GET http://127.0.0.1:8000/api/categories/
GET http://127.0.0.1:8000/api/products/
GET http://127.0.0.1:8000/api/products/?category=men
GET http://127.0.0.1:8000/api/products/?search=bag
GET http://127.0.0.1:8000/api/products/?featured=true
GET http://127.0.0.1:8000/api/products/?new_arrival=true
GET http://127.0.0.1:8000/api/store-info/
```

## Frontend Setup

Create a local env file from the example:

```bash
copy .env.example .env
```

`.env.example`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Install and run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Features

- Products and categories fetched from Django REST API
- Editable products/categories/store info in Django Admin
- Product image upload and media serving in development
- Arabic / English language toggle
- RTL layout and Arabic typography support
- Search works in Arabic and English
- Category filtering from backend data
- Featured and new-arrival API filters
- Cart sidebar, quantity controls, favorites, and toast messages
- Loading and empty states
- Offline fallback demo products if Django is not running
- Seed command for editable starter data: `python manage.py seed_demo`

## Store Content Used

- Name: BS SHOP
- Type: Clothing store / متجر ملابس
- Rating: 3.3/5 from 15 reviews
- Address: P392+M6W, Rue des 3 frères Djillali, Birkhadem
- Arabic address: P392+M6W، شارع الإخوة الثلاثة جيلالي، بئر خادم
- Hours: Open today, closes at 00:00 / مفتوح اليوم، يغلق على 00:00
- Instagram: @bs_shop2
- Public Instagram focus: fashion bags, fashion shoes, new shop
- Instagram public stats checked during build: 18 posts, 109 followers
- Line contact shown in public bio: bowl99
