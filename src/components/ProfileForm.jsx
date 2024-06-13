import React from "react";

export default function ProfileForm({
  currentUser,
  handleChange,
  onHandleUpdate,
  loading,
}) {
  
  return (
    <>
      <form
        onSubmit={onHandleUpdate}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* first and last name */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.firstName}
                type="text"
                name="firstName"
                onChange={handleChange}
                id="firstName"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.lastName}
                type="text"
                name="lastName"
                onChange={handleChange}
                id="lastName"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.email}
                type="email"
                name="email"
                disabled
                id="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Mobile numbers */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Mobile No
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.mobileNo || ""}
                type="tel"
                name="mobileNo"
                onChange={handleChange}
                id="mobileNo"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Alternative Mobile No
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.mobileNo2  || ""}
                type="tel"
                onChange={handleChange}
                id="mobileNo2"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* State and district */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              State
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.state  || ""}
                type="text"
                onChange={handleChange}
                id="state"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              District
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.district  || ""}
                type="text"
                onChange={handleChange}
                id="district"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Pincode */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Pincode
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.pincode  || ""}
                type="number"
                onChange={handleChange}
                id="pincode"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* House number */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              House No
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.houseNo  || ""}
                type="text"
                onChange={handleChange}
                id="houseNo"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Locality */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Locality
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.locality  || ""}
                type="text"
                onChange={handleChange}
                id="locality"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Nearby Landmark */}
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Nearby Landmark
            </label>
            <div className="mt-2.5">
              <input
                defaultValue={currentUser?.address[0]?.nearbyLandmark  || ""}
                type="text"
                onChange={handleChange}
                id="nearbyLandmark"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            disabled={loading}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Updating" : " Update"}
          </button>
        </div>
      </form>
    </>
  );
}
