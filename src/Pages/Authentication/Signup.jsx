/** @format */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaMailBulk } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    console.log("Signup Data:", data);
    setLoading(true);
    try {
      await apiClient.post("http://10.10.12.15:8000/api/auth/register/", {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        role: data.role,
      });
      localStorage.setItem("pendingSignupData", JSON.stringify(data));
      navigate("/otp");
    } catch (error) {
      console.error("OTP Send Failed:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 min-h-screen bg-base-200">
      <div className="hidden md:col-span-3 md:flex items-center justify-center bg-[#1E2839] p-8">
        <h2 className="text-white text-4xl font-semibold leading-relaxed">
          Confirm Your Email to <br /> Access Incredible <br /> Learning Tools!
        </h2>
      </div>

      <div className="col-span-4 md:col-span-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 shadow-md p-6 md:p-16">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign Up Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    placeholder="First name"
                    className="w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                  <FaUser className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
                </div>
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    placeholder="Last name"
                    className="w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  />
                  <FaUser className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
                </div>
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("email", {
                    required: "Email or phone number is required",
                  })}
                  placeholder="Email or Phone Number"
                  className="w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
                <FaMailBulk className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="relative">
                <select
                  {...register("role", {
                    required: "Please select a role",
                  })}
                  className="w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  <option value="" disabled selected>
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your Password"
                  className="w-full border border-base-300 bg-base-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex items-center opacity-75">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="mr-2"
                  />
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-blue-500 ps-1 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E2839] hover:bg-slate-700 text-white font-semibold py-2 rounded-md"
            >
              {loading ? "Sending OTP..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
