import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../helpers/Alert";
import { useSelector } from "react-redux";
import { FaShareAlt } from "react-icons/fa";


export default function ProductDetailsCard({ product, refreshData }) {
  const [showAlert, setShowAlert] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  // const handleCopyLink = () => {
  //   const productLink = `${window.location.origin}/shared-product/${product._id}/${currentUser._id}`;
  //   if (navigator.share) {
  //     navigator.share({
  //       title: product.productName,
  //       text: 'Check out this product!',
  //       url: productLink,
  //     })
  //     .then(() => console.log('Successful share'))
  //     .catch((error) => console.log('Error sharing', error));
  //   } else {
  //     handleCopyLink();
  //   }
  // };

  return (
    <div className="max-w-sm mx-auto p-7 border-[1.5px] border-gray-200 bg-white rounded-xl  overflow-hidden md:max-w-6xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-44 w-full object-contain md:w-40"
            src={product?.images[0]}
            alt="Man looking at item at a store"
          />
        </div>
        <div className="px-5 p-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product.category}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {product?.productName}
          </a>
          <p className="mt-2 text-gray-500">
            Include popular icons in your React projects easily with
            react-icons, which utilizes ES6 imports that allows you to include
            only the icons that your project is using.
          </p>
          <div className="flex font-bold gap-2 mt-4">
            <h3>Price</h3>
            <span className="text-teal-600">{product?.price}</span>
          </div>

          <div className="mt-2 sm:flex sm:justify-between sm:items-center">
            <h1 className="text-darker-gray font-semibold">
              Availablity:
              <span className="text-darker-gray-light">
                {product?.availability}
              </span>
            </h1>
            {currentUser.role === "Admin" ? (
              <div className="flex">
                <Link to={`/admin-edit-products/${product._id}`}>
                  {" "}
                  <button className="px-2 py-2 text-darker-blue font-medium">
                    Edit product
                  </button>
                </Link>
                <button
                  className="px-2 py-2 text-darker-violet font-medium ml-2"
                  onClick={() => setShowAlert(true)}
                >
                  Delete
                </button>
                {showAlert && (
                  <Alert
                    onCancel={handleCancelAlert}
                    productID={product._id}
                    refreshData={refreshData}
                  />
                )}
              </div>
            ) : (
              <Link to={`/product/${product._id}`} className="flex">
                <button className="px-2 py-2 flex items-center gap-2 justify-center
                 text-darker-gray-medium bg-slate-200 font-medium ml-2 btnHover rounded-md">
                  View <FaShareAlt />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
