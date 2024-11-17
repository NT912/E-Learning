"use client";  // Ensure this component runs on the client side

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve query parameters from the URL
  const userId = searchParams.get('userId');
  const courseId = searchParams.get('courseId');
  const price = searchParams.get('price');

  const handleVNPay = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/create_payment_url', {
        userId,
        courseId,
        amount: price,
      });

      if (response.status === 200) {
        const paymentUrl = response.data;
        window.location.href = paymentUrl;
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating VNPay payment:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Checkout</h1>
      <p>Course ID: {courseId}</p>
      <p>Price: ${price}</p>

      <h2>Choose Payment Method</h2>
      <button
        onClick={handleVNPay}
        style={{
          padding: '10px 20px',
          background: 'green',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Pay with VNPay
      </button>
    </div>
  );
};

export default PaymentPage;
