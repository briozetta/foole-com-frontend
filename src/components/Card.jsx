import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { ColorRing } from "react-loader-spinner";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (inView && !loading && !error && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, error, hasMore]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, products, selectedCategory]);

  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.productName &&
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/all-products?page=${page}&limit=4`);
      if (data && Array.isArray(data.result)) {
        if (data.result.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prevProducts) => {
            const newProducts =
              page === 1 ? data.result : [...prevProducts, ...data.result];
            return newProducts;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl sm:text-4xl sm:px-0 px-5 poppins-bold tracking-tight text-darker-gray">
          Discover Our <span className="text-darker-gray-light">Products</span>
        </h2>
        <Filter
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          products={products}
        />

        <div className="container mt-10 mb-6 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-0 ">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`}
                key={product._id}
                className="bg-white border rounded-sm sm:rounded-md border-gray-300 p-4 sm:border-gray-200
                shadow-lg flex flex-col transform transition-transform hover:scale-105"
              >
                <img
                  src={product?.images[0]}
                  alt={product?.productName}
                  className="w-full h-44 object-contain bg-zinc-100  mb-3"
                />
                <div className="p-3">
                <h2 className="text-base poppins-semibold text-darker-gray-medium mb-1 line-clamp-1">
                  {product.productName}
                </h2>
                <div className="sm:flex flex-col sm:flex-row  items-center mb-4">
                <div className="flex items-center">
                 <span className="text-red-500 text-lg font-normal mr-2">-27%</span>
                 <p className="sm:text-xl text-lg font-semibold text-gray-800">
                   ₹{product.price}
                 </p>
                 
               </div>
            <button className=" text-darker-blue poppins-regular py-1 px-4 rounded-md hover:from-darker-gray-medium hover:to-blue-700 transition-colors">
                Buy Now
                </button>
          </div>
                </div>
                
              </Link>
            ))}
          </div>
        </div>
        {hasMore && <div ref={ref}></div>}

        {loading && (
          <div className="flex justify-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#2A3054", "#3A4374", "#647196", "#3A4374", "#2A3054"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
