from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product, StoreInfo
from .serializers import CategorySerializer, ProductSerializer, StoreInfoSerializer


def is_truthy(value):
    return str(value).lower() in {"1", "true", "yes", "on"}


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by("name_en")


class ProductListView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = (
            Product.objects.filter(is_active=True, category__is_active=True)
            .select_related("category")
            .order_by("-created_at")
        )

        category = self.request.query_params.get("category")
        search = self.request.query_params.get("search")
        featured = self.request.query_params.get("featured")
        new_arrival = self.request.query_params.get("new_arrival")

        if category and category != "all":
            queryset = queryset.filter(category__slug=category)

        if search:
            queryset = queryset.filter(
                Q(name_en__icontains=search)
                | Q(name_ar__icontains=search)
                | Q(description_en__icontains=search)
                | Q(description_ar__icontains=search)
                | Q(category__name_en__icontains=search)
                | Q(category__name_ar__icontains=search)
            )

        if featured is not None:
            queryset = queryset.filter(is_featured=is_truthy(featured))

        if new_arrival is not None:
            queryset = queryset.filter(is_new_arrival=is_truthy(new_arrival))

        return queryset


class StoreInfoView(APIView):
    def get(self, request):
        store_info = StoreInfo.objects.first()
        if not store_info:
            return Response({})
        serializer = StoreInfoSerializer(store_info, context={"request": request})
        return Response(serializer.data)
