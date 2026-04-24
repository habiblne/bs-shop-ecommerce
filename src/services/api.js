const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");

const gradients = [
  "linear-gradient(145deg, #111111 0%, #3f4650 48%, #ececec 100%)",
  "linear-gradient(145deg, #f8f8f8 0%, #b8b4ad 45%, #1d1d1d 100%)",
  "linear-gradient(145deg, #0f0f0f 0%, #6d665e 48%, #f3f1ec 100%)",
  "linear-gradient(145deg, #ffffff 0%, #c9c9c9 52%, #080808 100%)",
  "linear-gradient(145deg, #050505 0%, #3b342e 48%, #d8d3cc 100%)",
  "linear-gradient(145deg, #f6f6f6 0%, #dedbd5 50%, #222222 100%)",
  "linear-gradient(145deg, #111111 0%, #27303c 55%, #bfc4ca 100%)",
  "linear-gradient(145deg, #0b0b0b 0%, #5b554e 46%, #efeee9 100%)",
];

async function request(path, params = {}) {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchCategories() {
  const categories = await request("/categories/");
  return categories.map((category) => ({
    id: category.slug,
    label: {
      en: category.name_en || category.label?.en || category.slug,
      ar: category.name_ar || category.label?.ar || category.name_en || category.slug,
    },
  }));
}

export async function fetchProducts(params = {}) {
  const products = await request("/products/", params);
  return products.map(normalizeProduct);
}

export async function fetchStoreInfo(fallbackStoreInfo) {
  const storeInfo = await request("/store-info/");
  if (!storeInfo || Object.keys(storeInfo).length === 0) {
    return fallbackStoreInfo;
  }

  return {
    ...fallbackStoreInfo,
    name: storeInfo.name || fallbackStoreInfo.name,
    type: storeInfo.type || fallbackStoreInfo.type,
    rating: String(storeInfo.rating ?? fallbackStoreInfo.rating),
    reviewCount: storeInfo.reviewCount ?? storeInfo.reviews_count ?? fallbackStoreInfo.reviewCount,
    address: storeInfo.address || {
      en: storeInfo.address_en || fallbackStoreInfo.address.en,
      ar: storeInfo.address_ar || fallbackStoreInfo.address.ar,
    },
    phone: storeInfo.phone_label || {
      en: storeInfo.phone || fallbackStoreInfo.phone.en,
      ar: storeInfo.phone || fallbackStoreInfo.phone.ar,
    },
    instagram: storeInfo.instagram || fallbackStoreInfo.instagram,
    instagramUrl: storeInfo.instagramUrl || fallbackStoreInfo.instagramUrl,
    lineContact: storeInfo.lineContact || storeInfo.line || fallbackStoreInfo.lineContact,
    hours: storeInfo.hours || {
      en: storeInfo.opening_hours_en || fallbackStoreInfo.hours.en,
      ar: storeInfo.opening_hours_ar || fallbackStoreInfo.hours.ar,
    },
    city: storeInfo.city || fallbackStoreInfo.city,
    mapUrl: storeInfo.map_url || fallbackStoreInfo.mapUrl,
  };
}

function normalizeProduct(product, index = 0) {
  const name = product.name || {
    en: product.name_en,
    ar: product.name_ar || product.name_en,
  };
  const description = product.description || {
    en: product.description_en || "",
    ar: product.description_ar || "",
  };
  const categoryName = product.category_name || {
    en: product.category_slug,
    ar: product.category_slug,
  };

  return {
    id: product.id,
    name,
    description,
    price: product.price_dzd,
    oldPrice: product.old_price_dzd,
    category: product.category_slug,
    categoryName,
    rating: 4.8,
    tag: product.is_new_arrival
      ? { en: "New", ar: "جديد" }
      : { en: categoryName.en || "Edit", ar: categoryName.ar || "اختيار" },
    gradient: gradients[index % gradients.length],
    imageUrl: product.image_url,
    sizes: product.sizes || [],
    colors: product.colors || [],
    stock: product.stock,
    featured: product.is_featured,
    arrival: product.is_new_arrival,
  };
}
