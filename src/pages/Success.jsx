import React, { useEffect } from "react";
import success from "../assets/success.svg";
import firebase from "../firebase/firebaseConfig";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
function Success() {
  // /const navigate = useNavigate();
  // const location = useLocation();

  // const [tokenId, setTokenId] = useState('');
  // const [correlationReference, setCorrelationReference] = useState('');
  // const [paybossRef, setPaybossRef] = useState('');

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const tokenIdParam = urlParams.get('tokenID');
  //   const correlationReferenceParam = urlParams.get('correlationReference');
  //   const paybossRefParam = urlParams.get('paybossRef');

  //   if (tokenIdParam && correlationReferenceParam && paybossRefParam) {
  //     setTokenId(tokenIdParam);
  //     setCorrelationReference(correlationReferenceParam);
  //     setPaybossRef(paybossRefParam);
  //   }
  // }, []);

  // const handleUpdate = async () => {
  //   const db = firebase.firestore();

  //   try {
  //     const querySnapshot = await db.collection('clients')
  //                                    .where('correlationReference', '==', correlationReference)
  //                                    .get();

  //     querySnapshot.forEach(async (doc) => {
  //       await db.collection('clients').doc(doc.id).update({
  //         tokenId: tokenId,
  //         paybossRef: paybossRef,
  //       });
  //     });

  //     console.log('Documents updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating documents: ', error);
  //   }
  // };
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const tokenId = searchParams.get("tokenId");
  const correlationReference = searchParams.get("correlationReference");
  const paybossRef = searchParams.get("paybossRef");
  
  useEffect(() => {
    if (tokenId && correlationReference && paybossRef) {
      console.log("URL Parameters:", tokenId, correlationReference, paybossRef);

      const clientsRef = firebase.firestore().collection("clients");
      clientsRef
        .where("externalReference", "==", correlationReference)
        .get()
        .then((querySnapshot) => {
          console.log("Query Snapshot:", querySnapshot);
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                tokenId: tokenId,
                paybossRef: paybossRef,
              })
              .then(() => {
                console.log("Document updated successfully");
              })
              .catch((error) => {
                console.error("Error updating document:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching document:", error);
        });
      // navigate(`?tokenID=abc1233&correlationReference=${correlationReference}&paybossRef=ghi789`);
    } else {
      console.error("Missing URL parameters");
    }
  }, [tokenId, correlationReference, paybossRef]);

  return (
    <div className="m-0 p-0">
      <div className="w-full min-h-[100vh] flex-col justify-center items-center pt-20 backdrop-blur-sm">
        <div className="text-green-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <img
            src={success}
            alt=""
            width={220}
            height={220}
            className="drop-shadow-md shadow-black"
          />
          <h3 className="font-sans text-8xl pt-20 lg:pt-0 font-bold text-center text-slate-700">
            Great!
          </h3>
          <p className="font-sans text-black/80 font-semibold px-2 py-2">
            Your Information was successfully Entered
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex justify-center w-52 uppercase bg-[#088F8F] transition delay-100 ease-linear hover:bg-[#369898] text-white text-1xl font-semibold shadow-md drop-shadow-black drop-shadow-xl my-16 px-2 py-4 rounded hover:drop-shadow-none"
          >
            Proceed
          </button>

          {/* <button onClick={handleUpdate}>Update Documents</button> */}
        </div>
      </div>
    </div>
  );
}

export default Success;