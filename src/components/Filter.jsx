import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { IoFilterOutline } from "react-icons/io5";

const Filter = ({
  searchQuery,
  handleSearchChange,
  selectedCategory,
  handleCategoryChange,
  products,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectCategory = (category) => {
    handleCategoryChange({ target: { value: category } });
    setIsDropdownOpen(false);
  };

  return (
    <div className="sm:mt-12 px-4 sm:px-0 flex sm:flex-row flex-col mt-6 sm:items-center sm:justify-between">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            className="block w-full pl-10 pr-4 py-2 border font-semibold border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search products"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiSearch2Line size={23} className="text-blue-700" />
          </div>
        </div>

      <div className="ml-4 mt-3 sm:mt-0 relative">
        <div className="relative inline-block w-full text-gray-700">
          <div
            onClick={toggleDropdown}
            className="block appearance-none w-full px-10 bg-white border border-gray-300 hover:border-gray-400  py-2 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            {selectedCategory || "Filter by category"}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoFilterOutline className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-56 overflow-y-auto border border-gray-300">
              <div
                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                onClick={() => selectCategory("")}
              >
                All Category
              </div>
              {Array.from(
                new Set(products.map((product) => product.category))
              ).map((category) => (
                <div
                  key={category}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
