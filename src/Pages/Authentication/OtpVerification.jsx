import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange", // Validate on change to update errors in real-time
  });

  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmitting(true); // Set submitting state to true
    const finalOtp = Object.values(data).join("");
    console.log("Final OTP:", finalOtp);
    // Perform OTP verification API call

    // Redirect after short delay
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state
      navigate("/seller_overview"); // Redirect to admin overview
    }, 2000);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleResendOtp = () => {
    if (resendEnabled) {
      console.log("Resend OTP triggered");
      setTimer(60);
      setResendEnabled(false);
      // Call resend OTP API here
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Update form value for react-hook-form
    if (/^[0-9]?$/.test(value)) {
      setValue(`otp${index}`, value, { shouldValidate: true });

      // Move to next input if a digit is entered
      if (index < 5 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 min-h-screen bg-base-200">
      {/* Left Side - Hidden on mobile, visible on md and up */}
      <div className="hidden md:col-span-3 md:flex items-center justify-center bg-[#1E2839] p-8">
        <h2 className="text-white text-4xl font-bold leading-relaxed">
          Confirm Your Email to <br /> Access Educational <br /> Resources!
        </h2>
      </div>

      {/* Right Side */}
      <div className="col-span-4 md:col-span-4 flex items-center justify-center p-8">
        <div className="max-w-xl w-full bg-white border border-gray-200 rounded-3xl shadow-md p-6 md:p-20 relative">
          <h2 className="text-2xl font-bold text-center mb-2">
            Verify Your E-mail
          </h2>
          <p className="text-center text-sm mb-6">
            We have sent a 6-digit verification code to your email.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4 justify-center">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  {...register(`otp${index}`, {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]$/,
                      message: "Must be a single digit",
                    },
                  })}
                  className="w-12 h-12 text-center border border-base-300 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-700 text-lg"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center">
                Please fill all OTP fields with valid digits
              </p>
            )}

            {/* Resend OTP with Timer */}
            <p className="text-center text-sm mt-6">
              {resendEnabled ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-500 hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              )}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1E2839] hover:bg-slate-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          {/* Back Button */}
          <div className="flex items-center justify-center text-blue-500 mt-4 hover:underline">
            <button
              onClick={() => window.history.back()}
              className="flex items-center"
            >
              <FaLeftLong className="mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;