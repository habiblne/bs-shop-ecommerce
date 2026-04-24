from rest_framework import serializers

from .models import Category, Product, StoreInfo


class CategorySerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name_en", "name_ar", "slug", "label", "is_active", "created_at"]

    def get_label(self, obj):
        return {"en": obj.name_en, "ar": obj.name_ar}


class ProductSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    category_name = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "name_en",
            "name_ar",
            "description",
            "description_en",
            "description_ar",
            "category",
            "category_slug",
            "category_name",
            "price_dzd",
            "old_price_dzd",
            "image",
            "image_url",
            "sizes",
            "colors",
            "stock",
            "is_featured",
            "is_new_arrival",
            "is_active",
            "created_at",
            "updated_at",
        ]

    def get_name(self, obj):
        return {"en": obj.name_en, "ar": obj.name_ar}

    def get_description(self, obj):
        return {"en": obj.description_en, "ar": obj.description_ar}

    def get_category_name(self, obj):
        return {"en": obj.category.name_en, "ar": obj.category.name_ar}

    def get_image_url(self, obj):
        if not obj.image:
            return ""
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class StoreInfoSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    phone_label = serializers.SerializerMethodField()
    hours = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    reviewCount = serializers.IntegerField(source="reviews_count", read_only=True)
    lineContact = serializers.CharField(source="line", read_only=True)
    instagramUrl = serializers.SerializerMethodField()

    class Meta:
        model = StoreInfo
        fields = [
            "id",
            "name",
            "type",
            "address",
            "address_en",
            "address_ar",
            "phone",
            "phone_label",
            "instagram",
            "instagramUrl",
            "line",
            "lineContact",
            "rating",
            "reviews_count",
            "reviewCount",
            "opening_hours_en",
            "opening_hours_ar",
            "hours",
            "city",
            "map_url",
        ]

    def get_type(self, obj):
        return {"en": "Clothing store", "ar": "متجر ملابس"}

    def get_address(self, obj):
        return {"en": obj.address_en, "ar": obj.address_ar}

    def get_phone_label(self, obj):
        return {"en": obj.phone or "Instagram DM", "ar": obj.phone or "رسائل إنستغرام"}

    def get_hours(self, obj):
        return {"en": obj.opening_hours_en, "ar": obj.opening_hours_ar}

    def get_city(self, obj):
        return {"en": "Birkhadem", "ar": "بئر خادم"}

    def get_instagramUrl(self, obj):
        handle = obj.instagram.lstrip("@")
        return f"https://www.instagram.com/{handle}/" if handle else ""
