import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [uuId] = useState(`${uuidv4()}`);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
  }, []);

  const getToken = async () => {
    try {
      Swal.showLoading(); // Show loading spinner

      const response = await axios.post(
        "https://frontier-server-api-1.onrender.com/get-token",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
        console.log("Received token:", response.data.token);
        // Sign in the user anonymously
        await firebase.auth().signInAnonymously();

        // Attach a listener to the authentication state
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const uid = user.uid;
            console.log("User UID after signing in anonymously:", uid);
            console.log("AuthToken:", response.data.token.data.authToken);
            // Now you can use the UID as needed
            navigate("/paymentForm", {
              state: {
                authToken: response.data.token.data.authToken,
                uid: uid,
              },
            });
            Swal.close(); // Close loading spinner after navigation
          } else {
            console.log("No user is signed in anonymously.");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You have successfully  signed out.",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    // Execute side effect after token state changes
    if (token) {
      console.log(`Authentication token: ${token.data.authToken} ${userId}`);
      console.log(`Authentication uid:  ${userId}`);
      navigate("/paymentForm", {
        state: { authToken: token.data.authToken, uid: userId },
      });
    }
  }, [token, userId, navigate]);

  return (
    <>
      <div className="px-2 flex flex-col items-center w-11/12 mx-auto min-h-screen overflow-x-hidden backdrop-blur-sm">
        <div className="flex justify-between items-center w-full px-6 h-20 bg-[#09284483] rounded-b-2xl backdrop-blur-md drop-shadow-xl shadow-black">
          <div className="text-4xl font-bold text-white">Agreement Page</div>
          {/* <button onClick={handleLogout} className=" text-white ">Logout</button> */}
        </div>
        <div className="flex flex-col items-center py-4 w-9/12 mx-auto mt-20 rounded-3xl bg-[#09284455]">
          <p className="text-white text-xl py-4">
            We do not store any credit card information on the server, payments
            are processed by world-leading payment gateways
          </p>
          <button
            onClick={() => getToken()}
            className="bg-[#3d5fc4] text-white rounded-md text-base uppercase py-2 px-4 font-bold"
          >
            Click here to Proceed
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
