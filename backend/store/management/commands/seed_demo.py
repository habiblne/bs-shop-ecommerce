from django.core.management.base import BaseCommand

from store.models import Category, Product, StoreInfo


class Command(BaseCommand):
    help = "Seed editable BS SHOP demo data for local development."

    def handle(self, *args, **options):
        categories = [
            ("men", "Men", "رجال"),
            ("women", "Women", "نساء"),
            ("kids", "Kids", "أطفال"),
            ("shoes", "Shoes", "أحذية"),
            ("bags", "Bags", "حقائب"),
        ]

        category_map = {}
        for slug, name_en, name_ar in categories:
            category, _ = Category.objects.update_or_create(
                slug=slug,
                defaults={"name_en": name_en, "name_ar": name_ar, "is_active": True},
            )
            category_map[slug] = category

        products = [
            {
                "name_en": "Straight Denim Jacket",
                "name_ar": "جاكيت جينز مستقيم",
                "description_en": "A clean denim layer for everyday city looks.",
                "description_ar": "طبقة جينز نظيفة للوكات المدينة اليومية.",
                "category": "men",
                "price_dzd": 5900,
                "sizes": ["S", "M", "L", "XL"],
                "colors": ["Black", "Blue"],
                "stock": 12,
                "is_featured": True,
                "is_new_arrival": True,
            },
            {
                "name_en": "Oversized Hoodie",
                "name_ar": "هودي واسع",
                "description_en": "Soft oversized hoodie with a relaxed fashion fit.",
                "description_ar": "هودي ناعم واسع بقصة مريحة وفاشن.",
                "category": "women",
                "price_dzd": 3900,
                "sizes": ["S", "M", "L"],
                "colors": ["Grey", "Black"],
                "stock": 18,
                "is_featured": True,
                "is_new_arrival": True,
            },
            {
                "name_en": "Satin Flow Dress",
                "name_ar": "فستان ساتان انسيابي",
                "description_en": "A fluid satin dress for a sharp evening silhouette.",
                "description_ar": "فستان ساتان انسيابي لإطلالة مسائية أنيقة.",
                "category": "women",
                "price_dzd": 4900,
                "old_price_dzd": 6200,
                "sizes": ["S", "M", "L"],
                "colors": ["Black", "Champagne"],
                "stock": 8,
                "is_featured": True,
                "is_new_arrival": True,
            },
            {
                "name_en": "White Sneakers",
                "name_ar": "سنيكرز بيضاء",
                "description_en": "Minimal white sneakers for daily styling.",
                "description_ar": "سنيكرز بيضاء بسيطة للّباس اليومي.",
                "category": "shoes",
                "price_dzd": 6900,
                "sizes": ["39", "40", "41", "42", "43"],
                "colors": ["White"],
                "stock": 15,
                "is_featured": True,
                "is_new_arrival": True,
            },
            {
                "name_en": "Structured Fashion Bag",
                "name_ar": "حقيبة فاشن بتصميم منظم",
                "description_en": "A structured fashion bag inspired by clean editorial styling.",
                "description_ar": "حقيبة فاشن منظمة بروح ستايل نظيف.",
                "category": "bags",
                "price_dzd": 7900,
                "sizes": ["One size"],
                "colors": ["Black", "Brown"],
                "stock": 7,
                "is_featured": True,
                "is_new_arrival": False,
            },
            {
                "name_en": "Essential T-Shirt",
                "name_ar": "تيشيرت أساسي",
                "description_en": "A simple essential t-shirt for kids.",
                "description_ar": "تيشيرت أساسي وبسيط للأطفال.",
                "category": "kids",
                "price_dzd": 1900,
                "sizes": ["6Y", "8Y", "10Y", "12Y"],
                "colors": ["White", "Black"],
                "stock": 24,
                "is_featured": False,
                "is_new_arrival": False,
            },
            {
                "name_en": "Raw Slim Jeans",
                "name_ar": "جينز سليم داكن",
                "description_en": "Dark slim jeans with a clean city fit.",
                "description_ar": "جينز داكن بقصة سليم نظيفة.",
                "category": "men",
                "price_dzd": 4500,
                "sizes": ["38", "40", "42", "44"],
                "colors": ["Raw blue"],
                "stock": 10,
                "is_featured": False,
                "is_new_arrival": False,
            },
            {
                "name_en": "Casual Blazer",
                "name_ar": "بليزر كاجوال",
                "description_en": "A casual blazer for elevated everyday outfits.",
                "description_ar": "بليزر كاجوال لإطلالات يومية راقية.",
                "category": "women",
                "price_dzd": 8900,
                "old_price_dzd": 10500,
                "sizes": ["S", "M", "L"],
                "colors": ["Black", "Taupe"],
                "stock": 6,
                "is_featured": True,
                "is_new_arrival": False,
            },
        ]

        for item in products:
            category = category_map[item.pop("category")]
            Product.objects.update_or_create(
                name_en=item["name_en"],
                defaults={**item, "category": category, "is_active": True},
            )

        StoreInfo.objects.update_or_create(
            id=1,
            defaults={
                "name": "BS SHOP",
                "address_en": "P392+M6W, Rue des 3 frères Djillali, Birkhadem",
                "address_ar": "P392+M6W، شارع الإخوة الثلاثة جيلالي، بئر خادم",
                "phone": "Instagram DM",
                "instagram": "@bs_shop2",
                "line": "bowl99",
                "rating": 3.3,
                "reviews_count": 15,
                "opening_hours_en": "Open today - closes at 00:00",
                "opening_hours_ar": "مفتوح اليوم - يغلق على 00:00",
                "map_url": (
                    "https://www.google.com/maps/search/?api=1&query=P392%2BM6W%2C%20"
                    "Rue%20des%203%20fr%C3%A8res%20Djillali%2C%20Birkhadem"
                ),
            },
        )

        self.stdout.write(self.style.SUCCESS("BS SHOP demo data seeded."))
