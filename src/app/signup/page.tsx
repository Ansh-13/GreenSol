"use client"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/firebaseConfig'
import { redirect } from 'next/navigation'

function page() {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
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
      if (user) {
        console.log(user)
        return (
            redirect('/')
        );
      }

  return (
    <div className="App">
      <button className=' bg-green-600 rounded-md' onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  )
}

export default page