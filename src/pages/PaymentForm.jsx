import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import firebase from "../firebase/firebaseConfig";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

const PaymentForm = () => {
  const [uuId] = useState(`${uuidv4()}`);
  const location = useLocation();
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    authScheme: "OnlineCheckout",
    firstName: "",
    surName: "",
    email: "",
    phone: "",
    narration: "",
    currency: "ZMW",
    amount: 0,
  });

  useEffect(() => {
    // Access the token from location state
    const tokenFromLocation = location.state?.authToken;
    if (tokenFromLocation) {
      setToken(tokenFromLocation);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (uid) => {
    try {
      // Show loading spinner
      Swal.showLoading();

      // Log the payload data before sending the request
      console.log("Request Payload:", {
        authToken: token,
        externalReference: `${uid}`, // Use uid as externalReference
        data: {
          authScheme: "OnlineCheckout",
          storeCard: "Y",
          cofAgreementID:  `${uid}`,
          resultURL: "https://frontierpaymentinit.netlify.app/success",
          firstName: formData.firstName,
          lastName: formData.surName,
          email: formData.email,
          phone: formData.phone,
          narration: "Card Registration",
          currency: "ZMW",
          amount:  parseFloat(formData.amount),
        },
      });

      const response = await axios.post(
        "http://localhost:5000/charge-card",
        {
          authToken: token,
          externalReference:`${uuId}`, // Use uid as externalReference
          data: {
            authScheme: "OnlineCheckout",
            storeCard: "Y",
            cofAgreementID:  `${uid}`,
            resultURL: "https://frontierpaymentinit.netlify.app/success",
            firstName: formData.firstName,
            lastName: formData.surName,
            email: formData.email,
            phone: formData.phone,
            narration: "Card Registration",
            currency: "ZMW",
            amount: parseFloat(formData.amount),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Card charged successfully:", response.data);

      // Hide loading spinner upon successful submission
      Swal.close();

      // Redirect to the authURL if available
      const authURL = response.data?.data?.authURL;
      if (authURL) {
        window.location.href = authURL;
      } else {
        console.error("AuthURL not available in the response.");
      }
    } catch (error) {
      // Hide loading spinner upon error
      Swal.hideLoading();

      // Display error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleFormSubmit(user.uid); // Pass the uid to handleFormSubmit
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xl mx-auto my-8 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="surName" className="block text-sm font-medium text-gray-600">
              Surname:
            </label>
            <input
              type="text"
              id="surName"
              name="surName"
              value={formData.surName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4 text-left">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Amount:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
