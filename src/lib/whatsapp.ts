import { CartItem, Customer } from '@/types';
import { APP_CONFIG, getWhatsAppNumber } from './config';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export const generateWhatsAppMessage = (
  items: CartItem[],
  customer: Customer,
  total: number,
  paymentMethod: 'COD' | 'transfer' = 'COD'
): string => {
  const itemsList = items
    .map(item => `- ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)})`)
    .join('\n');

  const paymentMethodText = paymentMethod === 'COD'
    ? 'COD (Cash on Delivery)'
    : `Transfer ${APP_CONFIG.PAYMENT_METHODS.TRANSFER.name}`;

  const message = `${APP_CONFIG.WHATSAPP_GREETING}

📦 DETAIL PESANAN:
${itemsList}

💰 Total: ${formatPrice(total)}
💳 Pembayaran: ${paymentMethodText}

👤 Data Pelanggan:
Nama: ${customer.name}
HP: ${customer.phone}
Alamat: ${customer.address}${customer.notes ? `\nCatatan: ${customer.notes}` : ''}

${APP_CONFIG.WHATSAPP_CLOSING}`;

  return message;
};

export const sendToWhatsApp = (
  items: CartItem[],
  customer: Customer,
  total: number,
  paymentMethod: 'COD' | 'transfer' = 'COD',
  phoneNumber?: string // Optional override untuk nomor WhatsApp
): void => {
  const message = generateWhatsAppMessage(items, customer, total, paymentMethod);
  const encodedMessage = encodeURIComponent(message);
  const targetNumber = phoneNumber || getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

  // Open WhatsApp in new tab/window
  window.open(whatsappUrl, '_blank');
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Indonesian phone number validation
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove spaces and dashes
  let cleaned = phone.replace(/\s|-/g, '');
  
  // Convert to international format
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('+62')) {
    cleaned = cleaned.substring(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
};