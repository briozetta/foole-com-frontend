import React from 'react';
import banner from '../../assets/banner.jpeg';

export default function RunningAds() {
  return (
    <div className="relative overflow-hidden mt-9 bg-gradient-to-r from-blue-100 via-teal-50 to-green-50 py-4 shadow-lg">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 text-lg font-bold text-darker-blue">
          🚀 Super Sale! Up to 50% off on all products!
        </span>
        <span className="mx-4 text-lg font-bold text-darker-gray">
          🚚 Free shipping on orders over $100!
        </span>
        <span className="mx-4 text-lg font-bold text-darker-gray-medium">
          🆕 New arrivals are here, check them out now!
        </span>
        <span className="mx-4 text-lg font-bold text-darker-gray-light">
          ⏳ Limited time offer, don't miss out!
        </span>
      </div>
      <img src={banner} alt="banner img" className="w-full sm:h-[500px] object-cover" />
    </div>
  );
}
