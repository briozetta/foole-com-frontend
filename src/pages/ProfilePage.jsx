import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import {
  updateUserFail,
  updateUserStart,
  updateUsersuccess,
} from "../redux/userSlice";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const dispatch =useDispatch()
  const { currentUser,loading } = useSelector((state) => state.user);
  const [formData, setFormdata] = useState({});

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value }); 
    console.log(formData);
  };

  const onHandleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { data } = await axios.put(`/update-profile/${currentUser._id}`, formData);
      dispatch(updateUsersuccess(data));
      toast.success("Profile Updated!",{autoClose: 1000})
    } catch (error) {
      dispatch(updateUserFail(error));
      toast.error("error in updating data");
    }
  };

  if (!currentUser) {
    return (<Navigate to="/" />)
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-36 lg:px-8 ">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-darker-gray sm:text-4xl">
           Update your Profile
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Please update your profile with the correct delivery address.
          </p>
        </div>
       <ProfileForm  currentUser={currentUser} loading={loading}
        onHandleUpdate={onHandleUpdate} handleChange={handleChange}/>
      </div>
  );
}
