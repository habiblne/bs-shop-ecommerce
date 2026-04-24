from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product, StoreInfo


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_ar", "slug", "is_active", "created_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("name_en", "name_ar", "slug")
    prepopulated_fields = {"slug": ("name_en",)}
    ordering = ("name_en",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "image_preview",
        "name_en",
        "name_ar",
        "category",
        "price_dzd",
        "stock",
        "is_featured",
        "is_new_arrival",
        "is_active",
        "updated_at",
    )
    list_filter = ("category", "is_featured", "is_new_arrival", "is_active", "created_at")
    search_fields = ("name_en", "name_ar", "description_en", "description_ar")
    list_editable = ("price_dzd", "stock", "is_featured", "is_new_arrival", "is_active")
    readonly_fields = ("image_preview_large", "created_at", "updated_at")
    fieldsets = (
        ("Product names", {"fields": ("name_en", "name_ar", "category")}),
        ("Descriptions", {"fields": ("description_en", "description_ar")}),
        ("Pricing and stock", {"fields": ("price_dzd", "old_price_dzd", "stock")}),
        ("Product image", {"fields": ("image", "image_preview_large")}),
        ("Options", {"fields": ("sizes", "colors")}),
        ("Visibility", {"fields": ("is_featured", "is_new_arrival", "is_active")}),
        ("Dates", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:56px;height:72px;object-fit:cover;border:1px solid #ddd;" />',
                obj.image.url,
            )
        return "No image"

    @admin.display(description="Current image preview")
    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width:260px;max-height:340px;object-fit:cover;border:1px solid #ddd;" />',
                obj.image.url,
            )
        return "Upload an image to preview it here."


@admin.register(StoreInfo)
class StoreInfoAdmin(admin.ModelAdmin):
    list_display = ("name", "instagram", "phone", "rating", "reviews_count")
    search_fields = ("name", "address_en", "address_ar", "instagram", "line", "phone")
    fieldsets = (
        ("Identity", {"fields": ("name", "instagram", "line", "phone")}),
        ("Address", {"fields": ("address_en", "address_ar", "map_url")}),
        ("Reputation", {"fields": ("rating", "reviews_count")}),
        ("Opening hours", {"fields": ("opening_hours_en", "opening_hours_ar")}),
    )

    def has_add_permission(self, request):
        if StoreInfo.objects.exists():
            return False
        return super().has_add_permission(request)
