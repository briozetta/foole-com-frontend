import React, { useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const categories = [
    { name: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj9zTsUw9GLhneuaoFGKsx3WAzZc9qE1SK_w&s" },
    { name: "Fashion", image: "https://bradleyfair.com/wp-content/uploads/sites/13/2021/05/Gap_Feature-865x577.jpg" },
    { name: "Home", image: "https://4.imimg.com/data4/UU/UU/GLADMIN-/img-household-products-household-2-500x500.jpg" },
    { name: "Books", image: "https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/Stack-books-isolated-3d-rendering/960x0.jpg?height=507&width=711&fit=bounds" },
    { name: "Toys", image: "https://m.media-amazon.com/images/I/71c3vZviiDL._AC_UF894,1000_QL80_.jpg" },
    { name: "Sports", image: "https://stxaviersmahad.com/wp-content/uploads/2021/04/Sports-Equipment.jpg" },
    { name: "Beauty", image: "https://m.media-amazon.com/images/I/81z6M14GpRL._AC_UF1000,1000_QL80_.jpg" },
    { name: "Automotive", image: "https://www.expresspartsinc.com/images/productsSlides/2.jpg" },
    { name: "Health", image: "https://m.media-amazon.com/images/I/61u4dH5J5+L.jpg" },
    { name: "Groceries", image: "https://hips.hearstapps.com/hmg-prod/images/online-buying-and-delivery-concept-royalty-free-image-1675370119.jpg?crop=0.74996xw:1xh;center,top&resize=1200:*" },
    { name: "Garden", image: "https://cdn.mos.cms.futurecdn.net/Rx63edvSZCZ9uSg7egSDRU.jpg" },
    { name: "Office Supplies", image: "https://m.foolcdn.com/media/affiliates/images/Office_Supplies_An_Asset-01-Office_Supplies_uj.width-750.png" },
  ];
  
  
const CategorySlider = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
      scrollRef.current.scrollBy({ left: -1000, behavior: 'smooth' });
    };
  
    const scrollRight = () => {
      scrollRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    };
  return (
    <div className="relative overflow-hidden">
    <h1 className='poppins-bold text-xl sm:text-2xl padding-x text-left text-darker-gray-medium flex item-center'>
      Categories <FaShoppingCart className='text-darker-gray-light'  size={29} /></h1>
    <button
      onClick={scrollLeft}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full p-2 focus:outline-none"
    >
      &lt;
    </button>
    <div className="overflow-x-scroll whitespace-nowrap py-4 sm:no-scrollbar" ref={scrollRef}>
      <div className="inline-flex space-x-4">
        {categories.map((category, index) => (
          <div key={index} className="flex-none w-40">
            <div className=" rounded-none p-4 flex flex-col justify-center items-center transition-transform transform hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-2"
              />
              <h3 className="text-sm text-center font-medium text-gray-700">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    <button
      onClick={scrollRight}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700 text-white rounded-full p-2 focus:outline-none"
    >
      &gt;
    </button>
  </div>
  );
};

export default CategorySlider;
