"use client";

import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";

export default function SignOut() {
  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">
      <button
        onClick={async () => {
          const success = await signOut();
          if (success) {
            alert("You are sign out");
          }
        }}
      >
        Sign out
      </button>
    </div>
  );
}
