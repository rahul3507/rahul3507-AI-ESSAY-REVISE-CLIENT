import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or contact support if you need help.
        </p>

        <svg
          className="mx-auto mb-6 h-20 w-20 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <Link
          to="/pricing"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Back to Pricing
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
