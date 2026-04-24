import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Star,
  Eye,
  Plus,
  Minus,
  Filter,
  Trash2,
  Edit3,
  CreditCard,
} from "lucide-react";
import "./styles.css";

const initialProducts = [
  {
    id: 1,
    name: "معطف شتوي فاخر",
    price: 2500,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "معاطف",
    rating: 5,
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "قميص حرير",
    price: 1200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400",
    category: "قمصان",
    rating: 4.8,
    stock: 25,
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "بوت شيلسي جلد",
    price: 3200,
    image: "https://images.unsplash.com/photo-1543165308-4ba819f2a284?w=400",
    category: "أحذية",
    rating: 4.9,
    stock: 8,
    sizes: ["42", "43", "44"],
  },
  {
    id: 4,
    name: "سويتر كشمير",
    price: 1800,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "سويتر",
    rating: 5,
    stock: 18,
    sizes: ["S", "M", "L"],
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Admin functions
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...newProduct }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filter || p.category === filter)
  );

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Admin Panel Toggle */}
      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
      >
        {showAdmin ? "✨ متجر" : "⚙️ تحكم"}
      </button>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm p-6 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-3xl border border-gray-100/50 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
                لوحة التحكم
              </h2>
              <button
                onClick={() => setShowAdmin(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {(editingProduct || true) && (
              <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                <h3 className="text-xl font-bold mb-4">منتج جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="اسم المنتج"
                    className="p-3 border rounded-xl"
                  />
                  <input
                    placeholder="السعر (جنيه)"
                    type="number"
                    className="p-3 border rounded-xl"
                  />
                  <input
                    placeholder="رابط الصورة"
                    className="p-3 border rounded-xl col-span-2"
                  />
                  <input
                    placeholder="الفئة"
                    className="p-3 border rounded-xl"
                  />
                  <button className="md:col-span-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
                    {editingProduct ? "تعديل" : "إضافة منتج"}
                  </button>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{product.name}</h4>
                      <p>{product.price} جنيه</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-blue-100 rounded-xl">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 hover:bg-red-100 rounded-xl text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl shadow-lg border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent cursor-pointer">
            LUXE
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                placeholder="ابحث..."
                className="pl-12 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="absolute left-4 top-2.5 text-gray-500"
                size={20}
              />
            </div>
            <button className="p-3 relative bg-gray-100 hover:bg-gray-200 rounded-2xl">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button className="p-3 relative bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen bg-gradient-to-br from-black via-gray-900">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=2000"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 py-20">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-light leading-tight mb-8 font-serif">
            أناقة
            <br />
            <span className="font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
              خالدة
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
            الأناقة الفاخرة التي تتجاوز الموضة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="px-12 py-5 bg-white text-gray-900 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
              تسوق الآن →
            </button>
            <button className="px-12 py-5 border-2 border-white/50 backdrop-blur-sm rounded-3xl font-semibold hover:bg-white/20 hover:shadow-2xl transition-all duration-500">
              شاهد الفيديو
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 items-center mb-12">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-2xl transition-all">
            <Filter size={20} />
            <span>الفئة</span>
          </button>
          <select
            className="px-6 py-3 bg-gray-200 rounded-2xl"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="معاطف">معاطف</option>
            <option value="قمصان">قمصان</option>
            <option value="أحذية">أحذية</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 overflow-hidden border border-gray-100/50"
            >
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-6 right-6 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button className="w-12 h-12 bg-white/90 hover:bg-white shadow-2xl rounded-2xl flex items-center justify-center hover:scale-110 transition-all">
                    <Eye size={18} />
                  </button>
                  <button className="w-12 h-12 bg-amber-500 hover:bg-yellow-500 shadow-2xl rounded-2xl flex items-center justify-center hover:scale-110 transition-all">
                    <Heart size={18} className="text-white" />
                  </button>
                </div>
                {product.stock < 5 && (
                  <div className="absolute bottom-6 left-6 bg-red-500/95 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.stock} متبقي!
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < product.rating
                            ? "fill-current"
                            : "stroke-current opacity-40"
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.rating})
                    </span>
                  </div>
                  <span className="text-3xl font-black text-gray-900">
                    {product.price}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 px-8 rounded-2xl font-bold text-lg uppercase tracking-wide hover:from-amber-500 hover:to-yellow-500 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 shadow-xl"
                >
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-3xl transform transition-transform duration-500 ${
          cart.length ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="p-8 border-b">
          <h2 className="text-2xl font-bold mb-4">سلة التسوق</h2>
          <p className="text-2xl font-bold text-gray-900">{totalPrice} جنيه</p>
        </div>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold">{item.name}</h4>
                <p>{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold">{item.qty}</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus size={16} />
                </button>
              </div>
              <button className="p-2 hover:bg-red-50 rounded-xl text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-8 border-t">
          <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-3xl hover:-translate-y-1 transition-all">
            <CreditCard size={20} className="inline mr-2" />
            إتمام الشراء
          </button>
        </div>
      </div>

      {/* Mobile Cart Button */}
      {cart.length > 0 && (
        <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-40">
          <ShoppingBag size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {cart.length}
          </span>
        </button>
      )}
    </div>
  );
}

export default App;
