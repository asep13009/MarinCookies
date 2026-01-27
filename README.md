# 🍩 MarinCookies - Aplikasi Penjualan Donat Online

Aplikasi penjualan donat modern dengan sistem keranjang belanja, checkout terintegrasi, dan auto-redirect WhatsApp untuk konfirmasi pesanan.

## ✨ Fitur Utama

- 🛒 **Keranjang Belanja Interaktif** - Add, update, remove items dengan mudah
- 📱 **Integrasi WhatsApp** - Auto-redirect dengan detail pesanan lengkap
- 💰 **Pembayaran COD** - Cash on Delivery yang aman dan mudah
- 📋 **Form Checkout Lengkap** - Input data pelanggan dan alamat
- 🎨 **Design Responsif** - Mobile-first design dengan Tailwind CSS
- ⚡ **Performance Optimized** - Built with Next.js 15 dan TypeScript

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd MarinCookies-app
pnpm install
```

### 2. Konfigurasi WhatsApp (PENTING!)
Edit file `src/lib/config.ts` dan ganti nomor WhatsApp:

```typescript
export const APP_CONFIG = {
  // Ganti dengan nomor WhatsApp Anda (format: 62xxxxxxxxxx)
  WHATSAPP_NUMBER: '6285183480050', // ← GANTI INI!
  
  // Informasi toko (opsional untuk diubah)
  STORE_NAME: 'MarinCookies',
  STORE_PHONE: '0851-8348-0050',
  STORE_EMAIL: 'marin.cookies.donut@gmail.com',
  STORE_ADDRESS: 'Cintanagra, Jatinagara Kabupaten Ciamis',
  // ...
};
```

**Format Nomor WhatsApp:**
- ✅ Benar: `6285183480050` (62 + nomor tanpa 0 di depan)
- ❌ Salah: `+6285183480050`, `085183480050`, `6285183480050`

### 3. Jalankan Aplikasi
```bash
# Development
pnpm run dev

# Production Build
pnpm run build
pnpm start
```

## 📱 Cara Kerja WhatsApp Integration

1. **Customer** memilih produk dan menambahkan ke keranjang
2. **Checkout** dengan mengisi data (nama, HP, alamat)
3. **Auto-redirect** ke WhatsApp dengan format pesan:

```
Halo, saya ingin memesan:

📦 DETAIL PESANAN:
- 2x Donat Chocolate Glazed (Rp 15.000)
- 1x Donat Boston Cream (Rp 18.000)

💰 Total: Rp 48.000
💳 Pembayaran: COD (Cash on Delivery)

👤 Data Pelanggan:
Nama: John Doe
HP: 08123456789
Alamat: Jl. Merdeka No. 123, Jakarta Pusat

Mohon konfirmasi ketersediaan dan estimasi pengiriman. Terima kasih!
```

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📁 Struktur Project

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ProductCard.tsx     # Card produk donat
│   ├── Cart.tsx            # Sidebar keranjang
│   ├── CheckoutForm.tsx    # Form checkout
│   └── CartProvider.tsx    # Provider untuk cart
├── lib/
│   ├── config.ts           # Konfigurasi app (WhatsApp, dll)
│   ├── products.ts         # Data produk donat
│   ├── cart-store.ts       # Zustand store untuk cart
│   └── whatsapp.ts         # Utility WhatsApp integration
└── types/
    └── index.ts            # TypeScript types
```

## 🍩 Menambah/Edit Produk

Edit file `src/lib/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 1,
    name: "Donat Chocolate Glazed",
    price: 15000,
    description: "Donat lembut dengan lapisan cokelat manis",
    image: "https://placehold.co/300x300?text=Chocolate+Donut",
    category: "Klasik",
    popular: true
  },
  // Tambah produk baru di sini...
];
```

## 🎨 Kustomisasi Design

### Warna Tema
Edit `tailwind.config.js` untuk mengubah warna:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Ganti warna primary (orange) dengan warna pilihan Anda
        primary: {
          50: '#fff7ed',
          500: '#f97316', // Orange
          600: '#ea580c',
        }
      }
    }
  }
}
```

### Logo & Branding
Edit `src/app/layout.tsx` untuk mengubah logo dan nama toko.

## 📞 Support & Kustomisasi

Jika Anda membutuhkan bantuan kustomisasi atau fitur tambahan:

- 📧 Email: support@MarinCookies.com
- 📱 WhatsApp: +62812-3456-7890
- 🌐 Website: https://MarinCookies.com

## 📄 License

MIT License - Bebas digunakan untuk keperluan komersial dan personal.

---

**Dibuat dengan ❤️ untuk UMKM Indonesia**
