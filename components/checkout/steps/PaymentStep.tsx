'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FloatingLabelInput} from '@/components/shared/floatingLabelInput';
import {OrderSummaryTotals} from '../OrderSummary';
import {
  PaymentFormData,
  paymentSchema,
  DeliveryFormData,
} from '@/lib/validators';
import {Button} from '@/components/shared/button';
import AccordionSection, {Accordion} from '@/components/shared/Accordion';
import {SiKlarna} from 'react-icons/si';
import Image from 'next/image';
import {CiCreditCard1} from 'react-icons/ci';
import {useCart} from '@/context/CartProvider';
import {createOrder} from '@/actions/orders';
interface PaymentStepProps {
  onBack?: () => void;
  onNext: () => void;

  deliveryData?: DeliveryFormData | null;
}

export default function PaymentStep({onNext, deliveryData}: PaymentStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {cartItems, totalPrice} = useCart();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: '',
      cardNumber: '1234 5678 9012 3456',
      expiryDate: '01/25',
      cvv: '123',
      swishNumber: '1234567890',
      klarnaNumber: '1234567890',
      campaignCode: '',
    },
  });

  const selectedMethod = form.watch('paymentMethod');

  const selectPaymentMethod = (method: string) => {
    if (selectedMethod === method) return;
    form.setValue('paymentMethod', method, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    console.log('Payment method set to:', method);
  };

  const onAccordionToggle = (method: string) => {
    selectPaymentMethod(method);
  };

  const handleSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    try {
      const paymentInfo = {
        method: data.paymentMethod as 'card' | 'swish' | 'klarna',
      };
      if (!deliveryData) {
        throw new Error('Delivery data is required');
      }
      const result = await createOrder(cartItems, deliveryData, paymentInfo);
      if (!result.success || !result.orderId) {
        throw new Error(result.error || 'Failed to create order');
      }
      onNext();
    } catch (error) {
      console.error('Error processing payment:', error);

      alert('Ett fel uppstod vid betalningen. Försök igen.');
    } finally {
      setIsLoading(false);
    }
  };

  // Payment option 
  const PaymentTitle = (
    method: string,
    label: string,
    icon: React.ReactNode
  ) => (
    <div
      className={`flex items-center w-full ${selectedMethod === method ? 'font-semibold' : ''}`}
      onClick={() => {
        selectPaymentMethod(method);
      }}
    >
      <input
        type='radio'
        id={`radio-${method}`}
        name='paymentMethod'
        value={method}
        checked={selectedMethod === method}
        onChange={() => selectPaymentMethod(method)}
        className='hidden'
      />
      <div className='flex items-center gap-3 w-full'>
        <div className='p-2'>{icon}</div>
        <p className='font-medium'>{label}</p>
      </div>
    </div>
  );

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <h3 className='font-medium mb-2'>BETALNINGSMETOD</h3>

        {/* Dolt fält för att säkerställa att formuläret har det valda betalningssättet */}
        <input
          type='hidden'
          {...form.register('paymentMethod')}
          value={selectedMethod}
        />

        {/* Payment options with accordions */}
        <Accordion
          singleOpen={true}
          preventSelfClose={true}
          className='space-y-4'
        >
          {/* KORT */}
          <AccordionSection
            showChevron={false}
            id='card'
            title={PaymentTitle(
              'card',
              'Visa, Mastercard',

              <CiCreditCard1 size={32} />
            )}
            defaultOpen={selectedMethod === 'card'}
            onToggle={() => onAccordionToggle('card')}
            className={`border overflow-hidden transition-colors duration-200 ${selectedMethod === 'card' ? 'border-black' : 'border-gray-300 hover:border-gray-400'}`}
            headerClassName='flex justify-between items-center px-4 py-3 cursor-pointer w-full'
            contentClassName='flex flex-col gap-3'
          >
            <div className='space-y-4  px-4 py-3'>
              <FloatingLabelInput
                {...form.register('cardNumber')}
                type='text'
                id='cardNumber'
                label='Kortnummer'
              />
              {form.formState.errors.cardNumber && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.cardNumber.message}
                </p>
              )}

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <FloatingLabelInput
                    {...form.register('expiryDate')}
                    type='text'
                    id='expiryDate'
                    label='Utgångsdatum'
                  />
                  {form.formState.errors.expiryDate && (
                    <p className='text-red-500 text-sm'>
                      {form.formState.errors.expiryDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <FloatingLabelInput
                    {...form.register('cvv')}
                    type='text'
                    id='cvv'
                    label='CVV'
                  />
                  {form.formState.errors.cvv && (
                    <p className='text-red-500 text-sm'>
                      {form.formState.errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* SWISH */}
          <AccordionSection
            showChevron={false}
            id='swish'
            title={PaymentTitle(
              'swish',
              'Swish',
              <div className='w-8 h-8 relative'>
                <Image
                  src='/images/swish-logo-official.svg'
                  alt='Swish logo'
                  fill
                  sizes='auto'
                  priority
                  className='object-contain w-auto h-auto'
                />
              </div>
            )}
            defaultOpen={selectedMethod === 'swish'}
            onToggle={() => onAccordionToggle('swish')}
            className={`border  overflow-hidden transition-colors duration-200 ${selectedMethod === 'swish' ? 'border-black' : 'border-gray-300 hover:border-gray-400'}`}
            headerClassName='flex justify-between items-center px-4 py-3 cursor-pointer w-full'
            contentClassName='flex flex-col gap-3'
          >
            <div className=' px-4 py-3'>
              <FloatingLabelInput
                {...form.register('swishNumber')}
                type='text'
                id='swishNumber'
                label='Swishnummer'
              />
              {form.formState.errors.swishNumber && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.swishNumber.message}
                </p>
              )}
            </div>
          </AccordionSection>

          {/* KLARNA */}
          <AccordionSection
            showChevron={false}
            id='klarna'
            title={PaymentTitle(
              'klarna',
              'Klarna',
              <SiKlarna size={32} className='text-[#ffb3c7]' />
            )}
            defaultOpen={selectedMethod === 'klarna'}
            onToggle={() => onAccordionToggle('klarna')}
            className={`border  overflow-hidden transition-colors duration-200 ${selectedMethod === 'klarna' ? 'border-black' : 'border-gray-300 hover:border-gray-400'}`}
            headerClassName='flex justify-between items-center px-4 py-3 cursor-pointer w-full'
            contentClassName='flex flex-col gap-3'
          >
            <div className=' px-4 py-3'>
              <p className='text-sm text-gray-600'>Betala senare med Klarna</p>
              <p className='text-xs text-gray-500 mt-2'>
                När du klickar på "Betala" kommer du att omdirigeras till
                Klarnas hemsida för att slutföra din betalning.
              </p>
            </div>
          </AccordionSection>
        </Accordion>

        <div className='md:hidden mt-6'>
          <OrderSummaryTotals />
        </div>

        <Button
          type='submit'
          className='px-4 py-3 mt-0 h-16 cursor-pointer bg-black font-semibold  text-base text-white w-full'
          disabled={isLoading || !selectedMethod}
        >
          {isLoading ? 'Bearbetar...' : `Betala ${totalPrice} kr`}
        </Button>
      </form>
    </div>
  );
}
