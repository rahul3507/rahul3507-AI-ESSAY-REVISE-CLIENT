/** @format */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaMailBulk } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ForgetPasswordEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Forget Password Data:", data);
    setLoading(true);
    try {
      await apiClient.post("/auth/password-reset/request/", {
        email: data.email,
      });
      localStorage.setItem("pendingForgotPasswordData", JSON.stringify(data));
      navigate("/reset_otp");
    } catch (error) {
      console.error("Reset Password Email Send Failed:", error);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 min-h-screen bg-base-200">
      <div className="hidden md:col-span-3 md:flex items-center justify-center bg-[#1E2839] p-8">
        <h2 className="text-white text-4xl font-semibold leading-relaxed">
          Reset Your Password <br /> to Regain Access to <br /> Your Account!
        </h2>
      </div>

      <div className="col-span-4 md:col-span-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 shadow-md p-6 md:p-16">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email address"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-[#1E2839] hover:bg-slate-700 text-white font-semibold py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Sending Reset OTP..." : "Send Reset OTP"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Remember your password?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default ForgetPasswordEmail;
