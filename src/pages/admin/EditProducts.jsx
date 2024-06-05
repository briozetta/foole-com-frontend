import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import handleFileChange from "../../utils/fileUtils";
import { toast } from "react-toastify";

const EditProducts = () => {
    const { id } = useParams();
    const [productFields, setProductFields] = useState({
        productName: "",
        description: "",
        category: "",
        price: "",
        images: [],
        inventory: "",
        availability: "",
      });
  
      useEffect(() => {
        axios.get(`/products/${id}`)
          .then(response => {
            const fetchedProduct = response.data;
            setProductFields({
              productName: fetchedProduct.productName,
              description: fetchedProduct.description,
              category: fetchedProduct.category,
              price: fetchedProduct.price,
              images: fetchedProduct.images,
              inventory: fetchedProduct.inventory,
              availability: fetchedProduct.availability,
            });
            console.log(response.data);
          })
          .catch(error => {
            console.error("Error fetching product data:", error);
          });
      }, [id]);


    const handleFieldChange = (fieldName, value) => {
       
        setProductFields({
          ...productFields,
          [fieldName]: value,
        });
      };
      const handleImageChange = (e) => {
        handleFileChange(e.target.files, handleFieldChange);
      };
  

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.put(`/update-product/${id}`, productFields);
          if(data){

            toast.success("Product updated successfully") &&
            <Navigate to="/admin-all-products" replace={true} />
          }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while updaitng the product");
        }
      }
       
      };
    return (
      <div>
        <h2 className="text-center text-darker-gray  my-3 text-4xl font-medium ">
          Edit Product
        </h2>
        <ProductForm 
        productId={id}
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
      </div>
    );
};

export default EditProducts;
