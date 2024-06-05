import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { useInView } from "react-intersection-observer";

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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-darker-gray">
          Discover Our <span className="text-darker-gray-light">Products</span>
        </h2>
        <Filter
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          products={products}
        />

        <div className="mt-6 grid grid-cols-1 bg-primary gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 shadow-lg p-9 rounded-md">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative bg-slate-200 btnHover rounded-xl p-3 flex flex-col"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64 flex-grow">
                <img
                  src={product?.images[0]}
                  alt={product?.images[0]}
                  className="h-full w-full object-fill p-2 object-center lg:h-56 lg:w-full"
                />
              </div>
              <div className="flex flex-col mt-1">
                <h1 className="text-lg font-bold text-darker-gray">
                  {product.productName}
                </h1>
                <div className="mt-2 flex justify-between items-center">
                  <Link to={`/product/${product._id}`}
                    className="text-sm bg-darker-gray rounded-lg p-2 btnHover
           hover:bg-black text-gray-100 cursor-pointer"
                  >
                    Buy now
                  </Link>
                  <p className="text-md font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && <div ref={ref}></div>}

        {loading && (
          <p className="text-darker-gray-medium text-center mt-9 font-semibold">
            products Loading please wait...
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
