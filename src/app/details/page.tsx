"use client";

import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function Details() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [Data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      // No user is signed in
      setLoadingData(false);
      return;
    }

    const fetchData = async () => {
      try {
        const uid = user.uid;
        const docRef = doc(db, "ROI", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setErrorData(err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user]);

  if (loadingAuth || loadingData) {
    return <h1>Loading...</h1>;
  }

  if (errorAuth || errorData) {
    return <h1>Error: {errorAuth?.message || errorData?.message}</h1>;
  }

  return (
    <div>
      {Data ? (
        <div className="">
          <h1 className="text-xl ml-20  mt-10">
            Your Return on investment on Solar Panel
          </h1>
          <div className="grid grid-cols-3 auto-rows-[300px] gap-4 m-10">
            <div className="border-2 rounded-xl px-5 flex flex-col items-center justify-center">
              <h1>Annual Electricity Cost</h1>
              <h2>{Data.Annual_Electricity_Cost}</h2>
            </div>
            <div className="border-2 rounded-xl p-2 flex flex-col items-center justify-center">
              <h1>Shadow Free Space</h1>
              <h2>{Data.Shadow_Free_Space}</h2>
            </div>
            <div className="border-2 rounded-xl p-2 flex flex-col items-center justify-center">
              <h1>Time After Free Electricity</h1>
              <h2>{Data.Time_After_Free_Electricity}</h2>
            </div>
            <div className="border-2 rounded-xl p-2 flex flex-col items-center justify-center">
              <h1>Free Electricity For</h1>
              <h2>{Data.Free_Electricity_For}</h2>
            </div>
            <div className="border-2 rounded-xl p-2 flex flex-col items-center justify-center">
              <h1>Requirement</h1>
              <h2>{Data.Requirement}</h2>
            </div>
            <button
              className="border-2 rounded-xl"
              onClick={() => router.push("/")}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
