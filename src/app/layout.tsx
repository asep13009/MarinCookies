import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarinCookies - Toko Cookies & Donat Online Terbaik",
  description: "Pesan cookies dan donat segar dengan mudah. Berbagai varian rasa, pembayaran COD, dan pengiriman cepat ke seluruh kota.",
  keywords: "cookies, donat, toko cookies, pesan cookies online, cookies segar, COD, pengiriman cookies",
  authors: [{ name: "MarinCookies Team" }],
  openGraph: {
    title: "MarinCookies - Toko Cookies & Donat Online Terbaik",
    description: "Pesan cookies dan donat segar dengan mudah. Berbagai varian rasa, pembayaran COD, dan pengiriman cepat.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen`}>
        <div className="relative">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                    <img src="./marin-logo.png" alt="Logo MC" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-orange-800">MarinCookies</h1>
                    <p className="text-sm text-orange-600">Cookies & Donat Segar</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex items-center space-x-2 text-orange-700">
                    <span className="text-sm">📞</span>
                    <span className="text-sm font-medium">0851-8348-0050</span>
                  </div>
                  <CartProvider />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-orange-800 text-white py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-orange-800 font-bold">M</span>
                    </div>
                    <h3 className="text-xl font-bold">MarinCookies</h3>
                  </div>
                  <p className="text-orange-200 mb-4">
                    Toko cookies dan donat online terpercaya dengan cita rasa autentik dan bahan berkualitas tinggi.
                  </p>
                  <div className="flex space-x-4">
                    <span className="text-2xl">📱</span>
                    <span className="text-2xl">📧</span>
                    <span className="text-2xl">📍</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Jam Operasional</h4>
                  <div className="space-y-2 text-orange-200">
                    <p>Senin - Jumat: 08:00 - 21:00</p>
                    <p>Sabtu - Minggu: 09:00 - 22:00</p>
                    <p>Hari Libur: 10:00 - 20:00</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Hubungi Kami</h4>
                  <div className="space-y-2 text-orange-200">
                    <p>📞 WhatsApp: 0851-8348-0050</p>
                    <p>📧 Email: info@MarinCookies.com</p>
                    <p>📍 Cintanagra, Jatinagara Kabupaten Ciamis</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-orange-700 mt-8 pt-8 text-center text-orange-200">
                <p>&copy; 2024 MarinCookies. Semua hak cipta dilindungi.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}