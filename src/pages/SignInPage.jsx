import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFail, signInStart, signInSuccess } from "../redux/userSlice";
import SigninForm from "../components/SigninForm";
import { toast } from 'react-toastify';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  function onHandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const { data } = await axios.post("/sign-in", formData,{ withCredentials: true });
      dispatch(signInSuccess(data));
      toast.success('SignIn successful!',{position:"top-center"});
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-36 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darker-gray">
            Sign in to your account
          </h2>
        </div>

        <SigninForm
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
          onHandleChange={onHandleChange}
        />
      </div>
    </>
  );
};

export default SignInPage;
