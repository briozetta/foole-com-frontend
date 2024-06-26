import axios from "axios";
import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logomain from "../assets/logomain.jpeg";

const SignupPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function onHandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("/sign-up", formData);
      setLoading(false);
      toast.success('Please Verify your Email',{position:"top-center"});
      navigate('/otp-verify',{ state: { fEmail: formData.email }})
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-36 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-16 w-auto"
            src={logomain}
            alt="Your Company"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-darker-gray">
            Sign in to your account
            
          </h2>
        </div>
        <SignupForm loading={loading} error={error}
         onHandleChange={onHandleChange} handleSubmit={handleSubmit}/>        
      </div>
    </>
  );
};

export default SignupPage;
