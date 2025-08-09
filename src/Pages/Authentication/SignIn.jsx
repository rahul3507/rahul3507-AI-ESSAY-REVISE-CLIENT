/** @format */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client";
import toast from "react-hot-toast";
import { Bounce, ToastContainer } from "react-toastify";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError(""); // Clear any previous server errors
      clearErrors(); // Clear form errors

      const response = await apiClient.post("/auth/login/", data);
      console.log(response);

      const { access_token, refresh_token } = response.data;

      // store tokens in cookies
      document.cookie = `access_token=${access_token}; path=/`;
      document.cookie = `refresh_token=${refresh_token}; path=/`;

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Login failed: Email or password is incorrect";

      // Check if it's a specific field error (like wrong password)
      if (
        error?.response?.status === 401 ||
        errorMessage.toLowerCase().includes("password")
      ) {
        setError("password", {
          type: "server",
          message: "Invalid email or password",
        });
      } else if (errorMessage.toLowerCase().includes("email")) {
        setError("email", {
          type: "server",
          message: "Invalid email address",
        });
      } else {
        // General server error
        setServerError(errorMessage);
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 min-h-screen bg-base-200">
      <div className="hidden md:col-span-3 md:flex items-center justify-center bg-[#1E2839] p-8">
        <h2 className="text-white text-4xl font-semibold leading-relaxed">
          Welcome Back! Verify Your <br /> Email to Access Your <br /> Learning
          Portal!
        </h2>
      </div>

      <div className="col-span-4 md:col-span-4 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 shadow-md p-6 md:p-16">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign in Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-slate-700 ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-base-300 bg-base-200"
                  }`}
                />
                <FaUser className="absolute inset-y-3 right-3 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your Password"
                  className={`w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-slate-700 ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-base-300 bg-base-200"
                  }`}
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

              {/* Remember me and Forgot password */}
              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex items-center opacity-75">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="mr-2"
                  />
                  Remember for 30 Days
                </div>
                <Link
                  to="/forget_password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* General Server Error Display */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {serverError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E2839] hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up Free
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

export default SignIn;
