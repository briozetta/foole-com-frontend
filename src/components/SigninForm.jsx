import React from 'react'
import { Link } from 'react-router-dom'
import OAuthGoogle from './OAuthGoogle'


export default function SigninForm({error ,loading,onHandleChange,handleSubmit}) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-zinc-50 shadow-md p-9">
    <form className="space-y-6" onSubmit={handleSubmit}>
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
            <Link to={"/forgot-password"} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
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
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
    <OAuthGoogle/>
    {/* Error message */}
    {error && (
      <p className="mt-4 text-sm text-red-600">
        {error.response
          && error.response.data.message }
      </p>
    )}

    <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <Link
        to={"/sign-up"}
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Sign up
      </Link>
    </p>
  </div>
  )
}
