import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTotalDistinctItems } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/shared/CartItems";
import EmptyCartMessage from "../components/shared/EmptyCartMessage";
import CartSkeleton from "../components/Skeletons/CartSkeleton";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const fetchCart = async () => {
    try {
      const response = await axios.get(`/cart/${currentUser._id}`);
 
      if (response.data.message === "No items found in cart") {
        setCartItems([]);
        setLoading(false);
        return; 
      }

      const cartItemsWithPrices = await Promise.all(
        response.data.map(async (item) => {
          const productResponse = await axios.get(
            `/products/${item.productId}`
          );
          return {
            ...item,
            availability: productResponse.data.availability,
            stock: productResponse.data.inventory,
          };
        })
      );
      setCartItems(cartItemsWithPrices);
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setError("Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const totalDistinctItems = cartItems.length;
    dispatch(setTotalDistinctItems(totalDistinctItems));
    if (!currentUser) {
      navigate("/");
    } else {
      fetchCart();
    }
  }, [currentUser, navigate,cartItems, dispatch]);


  const updateQuantityOnServer = async (userId, productId, quantity) => {
    try {
      await axios.put(`/cart/update-quantity`, {
        userId,
        productId,
        quantity,
      });
    } catch (error) {
      console.error("Error updating product quantity:", error);
      throw error;
    }
  };

  const handleQuantityChange = async (id, delta) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.min(item.quantity + delta, item.stock) }
        : item
    );

    const updatedItem = updatedCartItems.find((item) => item._id === id);

    try {
      
      await updateQuantityOnServer(
        currentUser._id,
        updatedItem.productId,
        updatedItem.quantity
      );

      setCartItems(updatedCartItems);
    } catch (error) {
     console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/cart/remove-product`, {
        data: { userId: currentUser._id, productId },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const inStockItems = cartItems.filter(
    (item) => item.availability !== "Out of stock"
  );
  const subtotal = inStockItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDistinctItems = cartItems.length;
 

  if (loading) {
    return <CartSkeleton />;
  }

  return (
    <>
    {cartItems.length === 0 ? (
      <EmptyCartMessage/>
    ) : (
      <CartItems
        cartItems={cartItems}
        handleQuantityChange={handleQuantityChange}
        handleRemove={handleRemove}
        totalDistinctItems={totalDistinctItems}
        subtotal={subtotal}
      />
    )}
  </>
  );
};

export default ShoppingCart;
