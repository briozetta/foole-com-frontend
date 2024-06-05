import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrRadialSelected } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/shared/AddressFrom";

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
      if (!currentUser || !currentUser._id) {
        setAddresses([]);
        setLoading(false);
        return;
      }
      const response = await axios.get(`/cart/${currentUser._id}`);
      if (response.data.message === "No items found in cart") {
        setCartItems([]);
        setLoading(false);
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
      if (!currentUser || !currentUser._id) {
        setAddresses([]);
        setLoading(false);
        return;
      }
      const { data } = await axios.get("/user-address", {
        params: {
          UserId: currentUser._id,
        },
      });
      console.log(data)
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
    console.log(selectedAddress);
  };

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setShowAddressForm(false);
  };

  const handleCloseForm = () => {
    setShowAddressForm(false);
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCost = 36;
    return itemsTotal + deliveryCost;
  };

  return (
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
                <div className="grid grid-cols-1 md:grid-cols-2 drop-shadow-md shadow-darker-blue gap-6">
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      className={`relative border p-6 rounded-lg shadow-md cursor-pointer transition duration-300 transform ${
                        selectedAddress === address
                          ? "bg-blue-100 border-blue-400 scale-105"
                          : "bg-blue-50 hover:bg-blue-50 border-darker-violet hover:border-blue-200"
                      }`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      {selectedAddress === address && ( 
                        <GrRadialSelected
                          size={20}
                          className="absolute top-2 right-2 text-blue-500"
                        />
                      )}
                      <p className="font-semibold text-gray-800 flex gap-2">
                        {address?.newUserfirstName || address?.firstName} 
                        <span>{address?.newUserlastName || address?.lastName}</span>
                      </p>
                      <p className="text-gray-900">{address?.mobileNo}</p>
                      <p className="text-gray-900">{address?.email}</p>
                      <p className="text-gray-900">{address?.mobileNo2}</p>
                      <p className="text-gray-600">{address?.houseNo}</p>
                      <p className="text-gray-600">
                        {address?.pincode}, {address?.locality}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {address?.state}
                      </p>
                    </div>
                  ))}
                </div>

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

              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                  Order Summary
                </h2>
                <div className="border p-6 rounded-lg shadow-md bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition duration-300">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between mb-4 items-center">
                      <p className="text-gray-800 font-semibold">{item.productName}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-800">€{item.price}</p>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mb-4 py-2 border-t border-gray-200">
                    <p className="text-gray-600">Delivery charge</p>
                    <p className="text-gray-600">€36</p>
                  </div>
                  <div className="flex justify-between items-center mb-4 py-2  border-gray-200">
                    <p className="text-gray-600 ">Delivery Method</p>
                    <p className="text-gray-800 font-mono font-semibold">{shippingMethod}</p>
                  </div>
                  <div className="flex justify-between items-center font-bold text-xl text-gray-800 py-2 border-t border-gray-200">
                    <p>Total</p>
                    <p>€{calculateTotal().toFixed(2)}</p>
                  </div>
                  <button className="mt-6 w-full bg-gradient-to-r from-darker-gray to-darker-gray-medium text-white py-3 rounded-lg hover:from-darker-gray-medium hover:to-darker-gray-light transition duration-300 shadow-md transform hover:scale-105">
                    Place order
                  </button>
                </div>
              </div>
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
                  <span className="text-gray-800">Store Pick Up (Free)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderPage;
