"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/lib/cart-store';
import { sendToWhatsApp, validatePhoneNumber, formatPrice } from '@/lib/whatsapp';
import { APP_CONFIG } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin, Phone, User, MessageSquare, CreditCard } from 'lucide-react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().refine(validatePhoneNumber, 'Format nomor HP tidak valid'),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onBack: () => void;
}

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart, closeCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'COD' | 'transfer'>('COD');

  const totalPrice = getTotalPrice();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Send to WhatsApp
      sendToWhatsApp(items, data, totalPrice, selectedPaymentMethod);

      // Clear cart and close
      clearCart();
      closeCart();
      reset();

      // Show success message (optional)
      alert('Pesanan berhasil dikirim ke WhatsApp! Silakan tunggu konfirmasi dari kami.');

    } catch (error) {
      console.error('Error sending order:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto -mx-6 px-6">
        <div className="space-y-6 py-4 pb-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity}x {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-orange-600">{formatPrice(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Data Pelanggan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Nomor WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    placeholder="08123456789"
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Format: 08xxxxxxxxx atau +628xxxxxxxxx
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Alamat Lengkap
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                    rows={3}
                    {...register('address')}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Catatan (Opsional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Catatan khusus untuk pesanan (patokan alamat, waktu pengiriman, dll)"
                    rows={2}
                    {...register('notes')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={(value) => setSelectedPaymentMethod(value as 'COD' | 'transfer')}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50 border-green-200">
                    <RadioGroupItem value="COD" id="cod" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="font-semibold text-green-800 cursor-pointer">
                        {APP_CONFIG.PAYMENT_METHODS.COD.name}
                      </Label>
                      <p className="text-sm text-green-600">{APP_CONFIG.PAYMENT_METHODS.COD.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-blue-50 border-blue-200">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <div className="flex-1">
                      <Label htmlFor="transfer" className="font-semibold text-blue-800 cursor-pointer">
                        {APP_CONFIG.PAYMENT_METHODS.TRANSFER.name}
                      </Label>
                      <p className="text-sm text-blue-600">{APP_CONFIG.PAYMENT_METHODS.TRANSFER.description}</p>
                    </div>
                  </div>
                </RadioGroup>

                {selectedPaymentMethod === 'transfer' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Detail Rekening:</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nomor Dana:</strong> {APP_CONFIG.PAYMENT_METHODS.TRANSFER.accountNumber}</p>
                      <p><strong>Atas Nama:</strong> {APP_CONFIG.PAYMENT_METHODS.TRANSFER.accountName}</p>
                      <p className="text-blue-700 mt-2">{APP_CONFIG.PAYMENT_METHODS.TRANSFER.instructions}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="flex-shrink-0 border-t bg-white pt-4 space-y-3 -mx-6 px-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Pembayaran:</span>
          <span className="text-orange-600">{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isSubmitting}
          >
            Kembali
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : '📱 Pesan via WhatsApp'}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          Dengan melanjutkan, Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan
        </p>
      </div>
    </div>
  );
}