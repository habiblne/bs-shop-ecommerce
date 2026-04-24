from django.urls import path

from .views import CategoryListView, ProductListView, StoreInfoView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("store-info/", StoreInfoView.as_view(), name="store-info"),
]
