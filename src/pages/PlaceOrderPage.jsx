import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/shared/AddressFrom";
import { FallingLines } from "react-loader-spinner";
import AddressCard from "../components/shared/AddressCard";
import OrderSummary from "../components/shared/OrderSummary";

const PlaceOrderPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("cash on delivery");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (!currentUser || !currentUser._id) {
        setCartItems([]);
        return;
      }
      const response = await axios.get(`/cart/${currentUser._id}`);
      if (response.data.message === "No items found in cart") {
        setCartItems([]);
        return navigate("/");
      }
      setCartItems(response.data);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    try {
      setLoading(true);
      if (!currentUser || !currentUser._id) {
        setAddresses([]);
        return;
      }
      const { data } = await axios.get("/user-address", {
        params: {
          UserId: currentUser._id,
        },
      });
      const modifiedAddresses = data.addresses.map((address) => ({
        ...address,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      }));
      setAddresses(modifiedAddresses);
    } catch (err) {
      console.error("Error fetching user address:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUserAddress();
    if (showAddressForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddressForm]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setShowAddressForm(false);
  };

  const handleCloseForm = () => {
    setShowAddressForm(false);
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCost = 36;
    return itemsTotal + deliveryCost;
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FallingLines
            color="darker-blue"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
          <span className="text-lg text-darker-gray">please wait...</span>
        </div>
      ) : (
        <>
          {cartItems.length > 0 && (
            <div className="min-h-screen relative pt-24 bg-gray-100 p-8">
              <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
                  Checkout
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                      Shipping Address
                    </h2>
                    <AddressCard selectedAddress={selectedAddress} currentUser={currentUser}
                     addresses={addresses} handleAddressSelect={handleAddressSelect} 
                     fetchUserAddress={fetchUserAddress}/>
                     

                    {showAddressForm && (
                      <AddressForm
                        onSave={handleSaveAddress}
                        fetchUserAddress={fetchUserAddress}
                        onClose={handleCloseForm}
                      />
                    )}

                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                    >
                      + Add to Address
                    </button>
                  </div>

                  <OrderSummary selectedAddress={selectedAddress} currentUser={currentUser}
                  cartItems={cartItems} shippingMethod={shippingMethod}
                  calculateTotal={calculateTotal}/>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    Shipping Method
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg shadow-md bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        value="cash on delivery"
                        checked={shippingMethod === "cash on delivery"}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3 accent-blue-500"
                      />
                      <span className="text-gray-800">
                        Store Pick Up (Free)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlaceOrderPage;
