import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Warning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-100 dark:border-gray-800">
                <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full text-3xl">
            <FaExclamationTriangle />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Subscription Expired
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Your access has ended. Please renew your subscription to continue using all features.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg"
        >
          Renew Now
        </button>
       
      </div>
    </div>
  );
};

export default Warning;