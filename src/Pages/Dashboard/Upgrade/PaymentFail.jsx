import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-6">
          Unfortunately, your payment could not be processed at this time. Please try again or contact support if the problem persists.
        </p>

        <svg
          className="mx-auto mb-6 h-20 w-20 text-yellow-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6M15 9l-6 6" />
        </svg>

        <Link
          to="/pricing"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Back to Pricing
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
