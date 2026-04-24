from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name_en = models.CharField(max_length=120)
    name_ar = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name_en"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name_en

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name_en)
        super().save(*args, **kwargs)


class Product(models.Model):
    name_en = models.CharField(max_length=180)
    name_ar = models.CharField(max_length=180)
    description_en = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.PROTECT)
    price_dzd = models.PositiveIntegerField()
    old_price_dzd = models.PositiveIntegerField(blank=True, null=True)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    sizes = models.JSONField(default=list, blank=True)
    colors = models.JSONField(default=list, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_new_arrival = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name_en


class StoreInfo(models.Model):
    name = models.CharField(max_length=120, default="BS SHOP")
    address_en = models.CharField(max_length=255)
    address_ar = models.CharField(max_length=255)
    phone = models.CharField(max_length=80, blank=True)
    instagram = models.CharField(max_length=120, blank=True)
    line = models.CharField(max_length=120, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews_count = models.PositiveIntegerField(default=0)
    opening_hours_en = models.CharField(max_length=180, blank=True)
    opening_hours_ar = models.CharField(max_length=180, blank=True)
    map_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Store information"
        verbose_name_plural = "Store information"

    def __str__(self):
        return self.name
