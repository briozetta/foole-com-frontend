import React from "react";
import Skeleton from "react-loading-skeleton";

const CartSkeleton = () => {
   
  const skeletonItems = Array(3).fill(null); // Array to render multiple skeleton items

  return (
    <div className="max-w-6xl mx-auto pt-32 bg-white shadow-lg mb-9 rounded-lg overflow-hidden">
      <div className="px-6 py-4 pt-11">
        <h1 className="font-bold text-3xl text-darker-gray mb-6 flex items-center">
          <Skeleton width={200} height={30} />
          <span className="ml-4 text-darker-gray-light rounded-full px-3 py-1 text-sm font-medium">
            <Skeleton width={50} height={20} />
          </span>
        </h1>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center mb-6 p-4 bg-gray-50 rounded-lg shadow"
          >
            <Skeleton width={96} height={96} />
            <div className="ml-0 md:ml-6 flex-1">
              <Skeleton width={200} height={20} />
              <Skeleton width={100} height={20} style={{ marginTop: 10 }} />
              <Skeleton width={150} height={20} style={{ marginTop: 10 }} />
              <div className="flex items-center mt-2">
                <Skeleton width={20} height={20} />
                <Skeleton width={60} height={20} style={{ marginLeft: 10 }} />
                <Skeleton width={60} height={20} style={{ marginLeft: 10 }} />
              </div>
            </div>
            <div className="ml-0 md:ml-6 text-lg text-darker-gray font-bold">
              <Skeleton width={60} height={20} />
            </div>
          </div>
        ))}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold"><Skeleton width={100} height={20} /></span>
            <span><Skeleton width={60} height={20} /></span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span><Skeleton width={100} height={20} /></span>
            <span><Skeleton width={60} height={20} /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
