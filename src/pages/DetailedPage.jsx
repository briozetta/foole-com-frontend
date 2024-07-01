import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const DetailedPage = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(4); // Number of products to load per page
  const [searchQuery, setSearchQuery] = useState("");

  const observer = useRef(null);
  const lastProductRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return; // Exit early if there are no more products to load

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [displayedProducts, hasMore]);

  useEffect(() => {
    // Function to filter products based on search query and load more products
    const loadFilteredProducts = () => {
      const startIndex = (pageNumber - 1) * pageSize;
      let filteredProducts = products;

      // Apply search query filter
      if (searchQuery.trim() !== "") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.productName &&
            product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      const endIndex = startIndex + pageSize;
      const newProducts = filteredProducts.slice(startIndex, endIndex);

      if (newProducts.length === 0) {
        setHasMore(false); // No more products to load
      } else {
        setDisplayedProducts([...displayedProducts, ...newProducts]); // Append new products
      }
    };

    loadFilteredProducts();
  }, [pageNumber, searchQuery]); // Load more products when pageNumber or searchQuery changes

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setPageNumber(1); // Reset page number when search query changes
    setDisplayedProducts([]); // Clear displayed products to fetch new filtered products
    setHasMore(true); // Reset hasMore flag
  };

  return (
    <div className="mt-0 xl:padding-x py-24 mb-6 mx-auto">
      {displayedProducts.length === 0 && !hasMore ? (
        <p className="text-center poppins-bold text-gray-900 mt-44">No products found in this category.</p>
      ) : (
        <>
        <div className="mb-4 md:pt-14 padding-x xl:pt-16">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="grid sm:padding-x grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-0">
          {displayedProducts.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              ref={
                index === displayedProducts.length - 1 ? lastProductRef : null
              }
              className="bg-white border rounded-sm sm:rounded-md border-gray-300 p-4 sm:border-gray-200
                shadow-lg flex flex-col transform transition-transform hover:scale-105"
            >
              <img
                src={product?.images[0]}
                alt={product?.productName}
                className="w-full h-44 object-contain bg-zinc-100 mb-3"
              />
              <div className="p-3">
                <h2 className="text-base poppins-semibold text-darker-gray-medium mb-1 line-clamp-1">
                  {product.productName}
                </h2>
                <div className="sm:flex flex-col sm:flex-row items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-red-500 text-lg font-normal mr-2">
                      -27%
                    </span>
                    <p className="sm:text-xl text-lg font-semibold text-gray-800">
                      ₹{product.price}
                    </p>
                  </div>
                  <button className="text-darker-blue poppins-regular py-1 px-4 rounded-md hover:from-darker-gray-medium hover:to-blue-700 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default DetailedPage;
