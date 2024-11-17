"use client";  // Ensure this component runs on the client side

import React from 'react';
import { mockCourse } from './mockDatabase';
import { useRouter } from 'next/navigation';  // Next 13 app router uses `next/navigation`

const CourseDetailPage: React.FC = () => {
  const router = useRouter();

  const handleBuy = async () => {
    const url = `/purchase?userId=1&courseId=${mockCourse.id}&price=${mockCourse.price}`;
    router.push(url);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{mockCourse.title}</h1>
      <p>{mockCourse.description}</p>
      <p>Price: ${mockCourse.price}</p>
      <button onClick={handleBuy} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
        Buy Now
      </button>
    </div>
  );
};

export default CourseDetailPage;
