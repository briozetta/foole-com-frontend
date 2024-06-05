import React from "react";
import { Link } from "react-router-dom";

const SignupForm = ({ loading, error, onHandleChange, handleSubmit }) => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-zinc-50 shadow-md p-9">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                onChange={onHandleChange}
                id="firstName"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                onChange={onHandleChange}
                id="lastName"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              onChange={onHandleChange}
              id="email"
              type="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </span>
            </div>
          </div>
          <div className="mt-2">
            <input
              onChange={onHandleChange}
              id="password"
              type="password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            disabled={loading}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>

      {/* Error handling */}
      {error && (
        <p className="mt-4 text-sm text-red-600">
          Error: {error.response?.data?.message || "Something went wrong"}
        </p>
      )}

      <p className="mt-10 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to={"/sign-in"}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
