import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsSlice";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);

  // Fetch categories memoized with useCallback
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("/todos");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Fetch categories and products on component mount
  useEffect(() => {
    fetchCategories();
    dispatch(fetchProducts());
  }, [dispatch, fetchCategories]);

  // Scroll left function memoized with useCallback
  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    }
  }, []);

  // Scroll right function memoized with useCallback
  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  }, []);

  // Function to get products by category memoized with useCallback
  const getProductsByCategory = useCallback(
    (category) => {
      return products.filter((product) => product.category === category);
    },
    [products]
  );

  return (
    <div className="relative overflow-hidden">
      <h1 className="poppins-bold text-xl sm:text-2xl padding-x text-left text-darker-gray-medium flex items-center">
        Categories{" "}
        <FaShoppingCart className="text-darker-gray-light" size={29} />
      </h1>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full p-2 focus:outline-none"
      >
        &lt;
      </button>
      <div
        className="overflow-x-scroll whitespace-nowrap py-4 sm:no-scrollbar"
        ref={scrollRef}
      >
        <div className="inline-flex space-x-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={"/products-details"}
              state={{ products: getProductsByCategory(category.categories) }}
              className="flex-none w-40"
            >
              <div className="rounded-none p-4 flex flex-col justify-center items-center transition-transform transform hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-2"
                />
                <h3 className="text-sm text-center font-medium text-gray-700">
                  {category.categories}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full p-2 focus:outline-none"
      >
        &gt;
      </button>
    </div>
  );
};

export default CategorySlider;
