// Konfigurasi aplikasi MarinCookies
export const APP_CONFIG = {
  // Nomor WhatsApp untuk menerima pesanan (format: 62xxxxxxxxxx tanpa tanda +)
  WHATSAPP_NUMBER: '6285183480050',
  
  // Informasi toko
  STORE_NAME: 'MarinCookies',
  STORE_PHONE: '0851-8348-0050',
  STORE_EMAIL: 'marin.cookies.donut@gmail.com',
  STORE_ADDRESS: 'Cintanagra, Jatinagara Kabupaten Ciamis',
  
  // Jam operasional
  OPERATING_HOURS: {
    weekdays: 'Senin - Jumat: 08:00 - 21:00',
    weekend: 'Sabtu - Minggu: 09:00 - 22:00'
  },
  
  // Pengaturan aplikasi
  CURRENCY: 'IDR',
  LOCALE: 'id-ID',
  
  // Pesan WhatsApp template
  WHATSAPP_GREETING: 'Halo, saya ingin memesan:',
  WHATSAPP_CLOSING: 'Mohon konfirmasi ketersediaan dan estimasi pengiriman. Terima kasih!',

  // Informasi pembayaran transfer
  PAYMENT_METHODS: {
    COD: {
      name: 'COD (Cash on Delivery)',
      description: 'Bayar saat barang diterima'
    },
    TRANSFER: {
      name: 'Transfer Dana',
      description: 'Transfer ke rekening Dana',
      accountNumber: '085183480050',
      accountName: 'Rini Meirani',
      instructions: 'Silakan transfer ke nomor Dana di atas dan kirim bukti transfer ke WhatsApp kami.'
    }
  }
};

// Fungsi untuk memvalidasi dan memformat nomor WhatsApp
export const getWhatsAppNumber = (): string => {
  return APP_CONFIG.WHATSAPP_NUMBER;
};

// Fungsi untuk mendapatkan URL WhatsApp
export const getWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodedMessage}`;
};