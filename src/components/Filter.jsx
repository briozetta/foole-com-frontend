import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { IoFilterOutline } from "react-icons/io5";

const Filter = ({
  searchQuery,
  handleSearchChange,
  selectedCategory,
  handleCategoryChange,
  products,
}) => {
  return (
    <div className="sm:mt-12 flex sm:flex-row flex-col mt-6  sm:items-center sm:justify-between">
      <div className="flex items-center">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            className="block w-full pl-10 pr-4 py-2 border font-semibold border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search products"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiSearch2Line size={23} className="text-gray-400" />
          </div>
        </div>
        <button className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Search
        </button>
      </div>
      <div className="ml-4 relative">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block appearance-none font-semibold text-lg w-full bg-white border border-gray-300 text-gray-700 sm:mt-0 mt-3 py-2 px-4 pr-8 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Filter by category</option>
          <option value="">All</option>
          {Array.from(new Set(products.map((product) => product.category))).map(
            (category) => (
              <option key={category} className="font-semibold " value={category}>
                {category}
              </option>
            )
          )}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <IoFilterOutline className="h-5 w-5 -mx-1 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
