// pages/vnpay_return.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const VnPayReturnPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<{ status: string; message: string; data?: any } | null>(null);

  useEffect(() => {
    // Convert search parameters to an object to send to the backend
    const queryParams = Object.fromEntries(searchParams.entries());

    // Call backend to verify the payment
    const verifyPayment = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/vnpay_return?${new URLSearchParams(queryParams)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setPaymentStatus(data);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus({ status: 'error', message: 'An error occurred. Please try again.' });
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>VNPay Payment Status</h1>
      {paymentStatus ? (
        <div>
          {paymentStatus.status === 'success' ? (
            <div>
              <h2>Payment Successful!</h2>
              <p>Amount: {paymentStatus.data.amount}</p>
              <p>Bank Code: {paymentStatus.data.bankCode}</p>
              <p>Transaction No: {paymentStatus.data.transactionNo}</p>
              <p>Transaction Status: {paymentStatus.data.transactionStatus}</p>
              <p>Order Info: {paymentStatus.data.orderInfo}</p>
            </div>
          ) : (
            <div>
              <h2>Payment Failed</h2>
              <p>{paymentStatus.message}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading payment information...</p>
      )}
    </div>
  );
};

export default VnPayReturnPage;
