import { useEffect, useState } from "react";
import CartSidebar from "./components/CartSidebar.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import InstagramEdit from "./components/InstagramEdit.jsx";
import Navbar from "./components/Navbar.jsx";
import NewArrivals from "./components/NewArrivals.jsx";
import Newsletter from "./components/Newsletter.jsx";
import ProductSection from "./components/ProductSection.jsx";
import PromoBanner from "./components/PromoBanner.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Toast from "./components/Toast.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import {
  categoryOptions as fallbackCategories,
  products as fallbackProducts,
  storeInfo as fallbackStoreInfo,
  testimonials,
  uiCopy,
} from "./data/products.js";
import { fetchCategories, fetchProducts, fetchStoreInfo } from "./services/api.js";

function filterFallbackProducts(activeCategory, searchQuery) {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  return fallbackProducts.filter((product) => {
    const categoryLabel = fallbackCategories.find((category) => category.id === product.category);
    const searchableText = [
      product.name.en,
      product.name.ar,
      product.tag.en,
      product.tag.ar,
      categoryLabel?.label.en,
      categoryLabel?.label.ar,
    ]
      .join(" ")
      .toLowerCase();
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = searchableText.includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
}

export default function App() {
  const [locale, setLocale] = useState("en");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(fallbackCategories);
  const [storeInfo, setStoreInfo] = useState(fallbackStoreInfo);
  const [displayProducts, setDisplayProducts] = useState(fallbackProducts);
  const [newArrivals, setNewArrivals] = useState(
    fallbackProducts.filter((product) => product.arrival).slice(0, 4),
  );
  const [productsLoading, setProductsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const content = uiCopy[locale];
  const isArabic = locale === "ar";

  useEffect(() => {
    let cancelled = false;

    async function loadStoreData() {
      try {
        const [apiCategories, apiStoreInfo, apiNewArrivals] = await Promise.all([
          fetchCategories(),
          fetchStoreInfo(fallbackStoreInfo),
          fetchProducts({ new_arrival: true }),
        ]);

        if (cancelled) return;

        setCategories([fallbackCategories[0], ...apiCategories]);
        setStoreInfo(apiStoreInfo);
        setNewArrivals(
          apiNewArrivals.length > 0
            ? apiNewArrivals
            : fallbackProducts.filter((product) => product.arrival).slice(0, 4),
        );
      } catch (error) {
        if (cancelled) return;
        setIsUsingFallback(true);
        setCategories(fallbackCategories);
        setStoreInfo(fallbackStoreInfo);
        setNewArrivals(fallbackProducts.filter((product) => product.arrival).slice(0, 4));
      }
    }

    loadStoreData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setProductsLoading(true);
      try {
        const apiProducts = await fetchProducts({
          category: activeCategory,
          search: searchQuery,
        });

        if (cancelled) return;

        setDisplayProducts(apiProducts);
        setIsUsingFallback(false);
      } catch (error) {
        if (cancelled) return;
        setDisplayProducts(filterFallbackProducts(activeCategory, searchQuery));
        setIsUsingFallback(true);
      } finally {
        if (!cancelled) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [activeCategory, searchQuery]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setToast(`${product.name[locale]} ${content.product.added}`);
  };

  const toggleFavorite = (productId) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const incrementItem = (productId) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementItem = (productId) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[var(--page)] text-[var(--ink)]">
      <Navbar
        cartCount={cartCount}
        storeInfo={storeInfo}
        content={content}
        locale={locale}
        isArabic={isArabic}
        isDark={isDark}
        onCartOpen={() => setCartOpen(true)}
        onThemeToggle={() => setIsDark((value) => !value)}
        onLocaleToggle={() => setLocale((value) => (value === "en" ? "ar" : "en"))}
      />
      <main>
        <Hero storeInfo={storeInfo} content={content} locale={locale} />
        <ProductSection
          categories={categories}
          products={displayProducts}
          content={content}
          locale={locale}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          loading={productsLoading}
          isUsingFallback={isUsingFallback}
          favorites={favorites}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
        />
        <PromoBanner content={content} />
        <NewArrivals
          products={newArrivals}
          categories={categories}
          content={content}
          locale={locale}
          favorites={favorites}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
        />
        <InstagramEdit storeInfo={storeInfo} content={content} locale={locale} />
        <WhyChooseUs content={content} />
        <Testimonials testimonials={testimonials} storeInfo={storeInfo} content={content} locale={locale} />
        <Newsletter content={content} onSubscribed={() => setToast(content.newsletter.toast)} />
        <ContactInfo storeInfo={storeInfo} content={content} locale={locale} />
      </main>
      <Footer
        storeInfo={storeInfo}
        content={content}
        categories={categories}
        locale={locale}
      />
      <CartSidebar
        isOpen={cartOpen}
        cartItems={cartItems}
        content={content}
        locale={locale}
        total={total}
        onClose={() => setCartOpen(false)}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
      <Toast message={toast} />
    </div>
  );
}
