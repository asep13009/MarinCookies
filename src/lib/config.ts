// Konfigurasi aplikasi MarinCookies
export const APP_CONFIG = {
  // Nomor WhatsApp untuk menerima pesanan (format: 62xxxxxxxxxx tanpa tanda +)
  WHATSAPP_NUMBER: '6285183480050',
  
  // Informasi toko
  STORE_NAME: 'MarinCookies',
  STORE_PHONE: '0851-8348-0050',
  STORE_EMAIL: 'info@marincookies.com',
  STORE_ADDRESS: 'Cintanagra, Jatinagara Kabupaten Ciamis',
  
  // Jam operasional
  OPERATING_HOURS: {
    weekdays: 'Senin - Jumat: 08:00 - 21:00',
    weekend: 'Sabtu - Minggu: 09:00 - 22:00',
    holiday: 'Hari Libur: 10:00 - 20:00'
  },
  
  // Pengaturan aplikasi
  CURRENCY: 'IDR',
  LOCALE: 'id-ID',
  
  // Pesan WhatsApp template
  WHATSAPP_GREETING: 'Halo, saya ingin memesan:',
  WHATSAPP_CLOSING: 'Mohon konfirmasi ketersediaan dan estimasi pengiriman. Terima kasih!'
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