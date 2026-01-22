"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProductsStore } from "@/lib/products-store";
import { Product } from "@/types";
import { getWhatsAppUrl } from "@/lib/config";

export default function HomePage() {
  const { products, setProducts } = useProductsStore();
  const [loading, setLoading] = useState(true);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-donat');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Hallo Sahabat MarinCookies, Mau ngobrol dengan admin kami ?, \n Silahkan Chat dengan Admin kami :).\nSaya mau pesan ...";
    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const parsedProducts: Product[] = await response.json();
          setProducts(parsedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Keep existing local products if API fails
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchProducts();

    // Set up periodic polling every 30 seconds to check for updates
    const interval = setInterval(fetchProducts, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [setProducts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-4 text-gray-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Donat Segar
                <br />
                <span className="text-yellow-200">Setiap Hari</span>
              </h1>
              <p className="text-xl mb-8 text-orange-100 leading-relaxed">
                Nikmati kelezatan donat premium dengan berbagai varian rasa.
                Dibuat fresh setiap hari dengan bahan berkualitas tinggi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3 text-lg"
                  onClick={scrollToMenu}
                >
                  Pesan Sekarang
                </Button>
                
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://media.indozone.id/crop/photo/p2/94/2025/05/06/rekitchensidoarjo-133177400.jpg"
                  alt="Showcase berbagai macam donat segar dengan berbagai topping dan rasa"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-white/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pengiriman Cepat</h3>
              <p className="text-gray-600">Donat fresh diantar langsung ke alamat Anda dalam kondisi terbaik</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Bayar di Tempat</h3>
              <p className="text-gray-600">Sistem COD yang aman dan mudah, bayar setelah barang diterima</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Kualitas Premium</h3>
              <p className="text-gray-600">Bahan berkualitas tinggi dan resep rahasia untuk rasa yang tak terlupakan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="menu-donat" className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Menu Donat Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilihan donat terbaik dengan berbagai rasa yang menggugah selera
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memesan?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Hubungi kami sekarang melalui WhatsApp untuk pemesanan yang lebih cepat
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 text-lg"
            onClick={handleWhatsAppClick}
          >
            📱 Chat WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
