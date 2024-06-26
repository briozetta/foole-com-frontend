import React from 'react';
import AdditionalPopularCard from '../helpers/AdditionalPopularCard';

const cardData = [
  {
    title: 'Revamp your home in style',
    items: [
      { text: 'Cushion covers, bedsheets & more', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWQd-XXJdcmEV_KY7af9MNMg9nvoFlcUPe1Q&s' },
      { text: 'Figurines, vases & more', img: 'https://p1.liveauctioneers.com/380/142806/72282046_1_x.jpg?height=310&quality=70&version=1558738372' },
      { text: 'Home storage', img: 'https://www.home-designing.com/wp-content/uploads/2009/08/home-storage-cabinets.jpg' },
      { text: 'Lighting solutions', img: 'https://cdn.shopify.com/s/files/1/0769/1799/7895/files/Energy-Saving-Lighting-Strategies-for-NTR-Share-House_480x480.jpg?v=1703423202' }
    ],
    linkText: 'Explore all',
    linkHref: '#'
  },
  {
    title: 'Starting ₹99 | Home improvement essentials',
    items: [
      { text: 'Spin mops, wipes & more', img: 'https://m.media-amazon.com/images/I/71NucYvjC4L._AC_UF1000,1000_QL80_.jpg' },
      { text: 'Bathroom hardware & accessories', img: 'https://image.made-in-china.com/2f0j00acSlvBOKpJRA/Stainless-Steel-Round-Washroom-Accessories-Hotel-Bath-Hardware-Accessories-Set.webp' },
      { text: 'Hammers, screwdrivers & more', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqqq9z9gelZxjXhoh8Oj45ws-zlURf46LZg&s' },
      { text: 'Extension boards, plugs & more', img: 'https://m.media-amazon.com/images/I/81uqL4QBHpL._AC_UF1000,1000_QL80_.jpg' }
    ],
    linkText: 'Explore all',
    linkHref: '#'
  },
  {
    title: 'Appliances for your home | Up to 55% off',
    items: [
      { text: 'Air conditioners', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZDvoKK5ZKxbZpwz9LKKaQPfgSvgTkKBY7rg&s' },
      { text: 'Refrigerators', img: 'https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gr-x31fmqhl_amcqebn_eail_in_c/GR-X31FMQHL-Refrigerators-Food-Front-Light-On-450.jpg' },
      { text: 'Microwaves', img: 'https://www.morphyrichardsindia.com/medias/?context=bWFzdGVyfGltYWdlc3wyNTMzNHxpbWFnZS9wbmd8YURZM0wyZ3lOQzg0T0RBM05qQXpOems0TURRMnxhYjVkYTFhMGMwYmI3MTIzOTlmOTM5ZTg1ZDcyMTEwMjExM2I5YWQ1OTVlNDZjN2M3NGU0NTk4N2VmNWZlMDY5' },
      { text: 'Washing machines', img: 'https://whirlpoolindia.vtexassets.com/arquivos/ids/167574/1.png?v=638320917724870000' }
    ],
    linkText: 'See more',
    linkHref: '#'
  },
  {
    title: 'Starting from 100 | Explore and now',
    items: [
      { text: 'Air conditioners', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Refrigerators', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Microwaves', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Washing machines', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' }
    ],
    linkText: 'See more',
    linkHref: '#'
  },
  {
    title: 'Shirts for your home | Up to 45% off',
    items: [
      { text: 'Air conditioners', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Refrigerators', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Microwaves', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' },
      { text: 'Washing machines', img: 'https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024' }
    ],
    linkText: 'See more',
    linkHref: '#'
  },
];

const PopularCategories = () => {
  return (
    <div className="xl:padding-x mx-auto p-2 pt-8 pb-12 grid gap-5 sm:grid-cols-3 bg-gray-200 xl:grid-cols-3">
      {cardData.map((card, index) => (
        <div key={index} className="bg-white shadow-lg rounded-md p-5 transition-transform transform hover:scale-105 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-darker-gray font-sans">{card.title}</h2>
            <div className="grid grid-cols-2 gap-6">
              {card.items.map((item, idx) => (
                <div key={idx} className="flex flex-col justify-center items-center">
                  <img src={item.img} alt={item.text} className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover" />
                  <p className="text-xs sm:text-sm font-bold text-center text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <span className="text-blue-600 hover:text-blue-800 font-semibold mt-6 block">{card.linkText}</span>
        </div>
      ))}

      {/* Additional card with product details */}
      <AdditionalPopularCard/>
    </div>
  );
}

export default PopularCategories;
