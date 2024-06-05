import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleVerification = async () => {
      try {
       const {data} = await axios.post("/verify-email", { _id: id });
          if(data){
          toast.success("Email Verified please Login now!!", { position: "top-center" });
          navigate('/sign-in');
          }
      } catch (error) {
        console.log(error);
        toast.error("Already Signed Up and this link is expired",{ position: "top-center" });
        navigate('/');
      }
    };

    if (!currentUser) {
      handleVerification();
    } else {
      navigate("/");
    }
  }, [currentUser, id, navigate]);

  return null; 
};

export default Verification;
