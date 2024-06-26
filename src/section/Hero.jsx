import React from "react";
import gallery from "../assets/gallery.mp4";
import img2 from "../assets/img2.png";

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-5 lg:pt-[80px] lg:pb-[50px] bg-white">
        <div className="relative bg-gray-900">
          <img
            src={img2}
            alt="Hero Background"
            className="w-full h-96 md:h-full xl:h-screen object-fill"
          />
          <div className="absolute inset-0 bg-zinc-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-opacity-50 p-4">
              <h1 className="text-4xl md:text-5xl xl:text-8xl poppins-bold text-white text-center animate-fadeInUp">
                Raining Offers{" "}
                <span className="text-slate-300 poppins-semibold">
                  For All Products!
                </span>
              </h1>
              <p className="mt-4 poppins-regular-italic text-base sm:text-2xl text-white text-center animate-fadeInUp animation-delay-1">
                <span className="text-green-600 poppins-semibold-italic text-xl sm:text-4xl">
                  25%{" "}
                </span>
                Off On All Products
              </p>
              <div className="sm:mt-8 mt-4 flex space-x-4 animate-fadeInUp animation-delay-2">
                <button className="bg-transparent border-2 hover:bg-darker-gray-light text-white font-bold px-1 sm:py-2 sm:px-4 rounded">
                  Shop Now
                </button>
                <button className="bg-darker-gray border-white border-2 hover:bg-darker-gray-medium text-white font-bold py-2 px-2 sm:py-2 sm:px-4 ">
                  Find More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
