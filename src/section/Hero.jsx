import React from "react";
import gallery from "../assets/gallery.mp4"
import RunningAds from "../components/helpers/RunningAds";

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[20px] lg:pb-[90px] bg-white ">
        {/* <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://thumbs.dreamstime.com/b/shopping-trolley-supermarket-25836229.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFoHE9e70ydA2ceDHEZV2XktdCrF-VPPkhuw&usqp=CAU"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://previews.agefotostock.com/previewimage/medibigoff/6dcb6e91ced320f9fa64f20bd48aed31/cie-412-21754.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-8 lg:w-1/2 xl:w-6/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-darker-blue">
                  Welcome to Andru-Ecom
                </span>
                <h2 className="mb-5 text-3xl font-bold text-darker-gray sm:text-[40px]/[48px]">
                  Andru-Ecom Makes our customers happy by giving services.
                </h2>
                <p className="mb-5 text-lg sm:text-lg text-darker-gray-medium font-semibold pr-9 ">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less.
                </p>
                <p className="mb-8  text-lg sm:text-lg text-darker-gray-medium font-semibold pr-9">
                  A domain name is one of the first steps to establishing your
                  brand. Secure a consistent brand image with a domain name that
                  matches your business.
                </p>
                <button

                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-darker-blue hover:bg-opacity-90"
                >
                  Explore Now!
                </button>
              </div>
            </div>
          </div>
        </div> */}

       <div className="bg-gray-50">
      
      <div className="relative w-full h-screen bg-black">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={gallery} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-opacity-50 bg-gray-800 p-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center">
            Welcome to <span className="text-slate-200">Loofee-Ecom Store</span>
          </h1>
          <p className="mt-2 text-lg sm:text-2xl text-white text-center">
            Andru-Ecom Makes our customers happy by giving services.
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-transparent border-2 hover:bg-darker-gray-light text-white font-bold py-2 px-4 rounded">
              Shop Now
            </button>
            <button className="bg-darker-gray hover:bg-darker-gray-medium text-white
             font-bold py-2 px-4 rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
    <RunningAds/>
      </section>
     
    </>
  );
};

export default Hero;
