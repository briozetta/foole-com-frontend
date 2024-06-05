import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm";
import handleFileChange from "../../utils/fileUtils";

export default function AddProducts() {
  const [productFields, setProductFields] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    images: [],
    inventory: "",
    availability: "",
  });

  const handleFieldChange = (fieldName, value) => {
    setProductFields({
      ...productFields,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
     const {data} = await axios.post('/add-product',productFields);
     if(data){
       setProductFields({
         productName: "",
         description: "",
         category: "",
         price: "",
         images: [],
         inventory: "",
         availability: "",
       });
      toast.success("Product added successfully");
     }
   } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An error occurred while adding the product");
    }
   }
  };

  const handleImageChange = (e) => {
    handleFileChange(e.target.files, handleFieldChange);
  };

  return (
    <>
     <h2 className="text-center text-darker-gray  my-3 text-4xl font-medium "> Add Products</h2>
      <ProductForm
        productName={productFields.productName}
        description={productFields.description}
        category={productFields.category}
        price={productFields.price}
        inventory={productFields.inventory}
        availability={productFields.availability}
        images={productFields.images}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        handleFileChange={handleImageChange}
      />
    </>
  );
}
