// src/components/PopularCategories.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';
import { Link } from 'react-router-dom';
import AdditionalPopularCard from '../helpers/AdditionalPopularCard';

const PopularCategories = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProductsByPrice = (minPrice, maxPrice) => {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  const getProductsByCategories = (categories) => {
    return products.filter((product) => categories.includes(product.category));
  };

  const productsByPrice = getProductsByPrice(99, 2000);
  const productsByCategory = getProductsByCategories(["Laptop", "mobile"]);

  const cardData = [
    {
      title: "Products Starting from 99",
      link: "/details/starting-from-99",
      items: productsByPrice,
    },
    { title: "Laptop and Mobiles", items: productsByCategory },
    {
      title: "All Products",
      items: products,
    },
  ];

  return (
    <div className="xl:padding-x mx-auto p-2 pt-8 pb-12 grid gap-5 sm:grid-cols-2 bg-gray-200 xl:grid-cols-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-md p-5 transition-transform transform hover:scale-105 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-darker-gray font-sans">
              {card.title}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {card.items.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.productName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                  />
                  <p className="text-xs sm:text-sm font-bold text-center text-gray-700">
                    {item.productName}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link
            to={"/products-details"}
            state={{ products: card.items }}
            className="text-blue-600 hover:text-blue-800 font-semibold mt-6 block"
          >
            Explore more
          </Link>
        </div>
      ))}

      {/* Additional card with product details */}
      <AdditionalPopularCard shuffledProducts={products} />
    </div>
  );
};

export default PopularCategories;
