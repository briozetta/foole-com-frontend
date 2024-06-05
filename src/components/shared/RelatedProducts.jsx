import React from "react";
const relatedProductsData = [
  {
    id: 1,
    name: "Related Product 1",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
    imageAlt: "Related product 1 image",
    price: "49.99",
    color: "Black",
  },
  {
    id: 2,
    name: "Related Product 2",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
    imageAlt: "Related product 2 image",
    price: "79.99",
    color: "White",
  },
  {
    id: 3,
    name: "Related Product 3",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
    imageAlt: "Related product 3 image",
    price: "69.99",
    color: "Gray",
  },
  {
    id: 4,
    name: "Related Product 4",
    href: "#",
    imageSrc:
      "https://andrus-e-commerce.s3.amazonaws.com/1715353514786.png",
    imageAlt: "Related product 4 image",
    price: "59.99",
    color: "Red",
  },
];

export default function RelatedProducts({product}) {
  return (
    <div className="mt-12 padding-x">
      <h2 className="text-3xl font-medium text-start mb-8 text-darker-gray">
        Products related{" "}
        <span className="text-darker-gray-medium">to this item</span>
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10  gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProductsData.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-56">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
