import React, { useEffect, useState } from "react";
import ProductDetailsCard from "../components/shared/ProductDetailsCard";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import UserAddForm from "../components/shared/UserAddForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.2,
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
      const { data } = await axios.get(`/all-products?page=${page}&limit=3`);
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

  const refreshData = () => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  };

  if (error) {
    return toast.error(error.message);
  }

  return (
    <>
    {showSignupForm&& <div className=" z-50 absolute ">
      <UserAddForm setShowSignupForm={setShowSignupForm} 
      currentUser={currentUser}/>
      </div>}
      <div className="padding-x mt-7 ">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-4xl text-darker-gray mb-1">
            Your <span className="text-darker-gray-medium">Products</span>
          </h1>
          {currentUser && currentUser.role === "Agent" && <button onClick={()=>setShowSignupForm(true)} className="bg-darker-gray-medium text-white
           px-3 py-1 rounded-md">Add Users</button>}
          {currentUser && currentUser.role === "Admin" ? (
            <Link to={"/admin-add-products"}>
              <button className="px-4 py-2 text-white bg-darker-gray-medium rounded hover:bg-darker-gray-light transition duration-300 ease-in-out flex justify-center items-center gap-1 btnHover">
                <FaPlusCircle size={22} />
                Add New Products
              </button>
            </Link>
          ) : null}
        </div>
        <p className="text-lg text-gray-500 mb-8">
          {currentUser && currentUser.role === "Admin"
            ? "  Check out the products you have added"
            : "Share the products with your customers"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="sm:flex justify-around hidden ">
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none mb-4"
          />
          <FaSearch className="bg-green-500 px-2 py-2 rounded-md" size={39} />
        </div>
        <div>
          <span className="font-medium text-darker-gray">Filter: </span>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          >
            <option value="">All</option>
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Products */}
      <>
      {filteredProducts
        .filter((product) => !product.disabled)
        .map((product, index) => (
          <ProductDetailsCard
            key={index}
            product={product}
            refreshData={refreshData}
          />
        ))}
      </>

      {/* Intersection observer target */}
      {hasMore && <div ref={ref}></div>}

      {loading && (
        <div className="flex justify-center h-1/2 items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-5 border-darker-blue h-8 w-8 mr-2"></div>
          <p className="text-darker-gray-medium font-semibold">
            Loading please wait...
          </p>
        </div>
      )}
    </>
  );
}
