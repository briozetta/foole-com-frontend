import React from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Product 1",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Divider = () => {
  return (
    <div className="bg-gray-100 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {featuredProducts.map((product) => (
        <div key={product.id} className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <div className="text-center text-white">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-2">{product.price}</p>
              <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  </div>
  );
};

export default Divider;
