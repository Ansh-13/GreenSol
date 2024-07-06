"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase/firebaseConfig';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Input } from './components/ui/input';
import { Label } from '@radix-ui/react-label';

export default function Home() {
  const [Annual_Electricity_Consumption, Set_Annual_Electricity_Consumption] = useState('');
  const [Cost_of_Solar_Panel, Set_Cost_of_Solar_Panel] = useState('');
  const [Shadow_Free_Space, Set_Shadow_Free_Space] = useState('');
  const [Annual_Electricity_Cost, Set_Annual_Electricity_Cost] = useState('');


  const [user, loading, error] = useAuthState(auth);

  //console.log(user?.uid)

  const uid = user?.uid;
  uid?.toString()
  console.log(typeof(uid))
  const handleSumit = async (e : any ) => {
    

    Set_Annual_Electricity_Consumption((parseInt(Annual_Electricity_Cost)/12).toString());
    

    e.preventDefault();
    try {
      await setDoc(doc(db, "ROI" , uid), {
        Annual_Electricity_Consumption,
        Cost_of_Solar_Panel,
        Shadow_Free_Space,
        Annual_Electricity_Cost
      });
      Set_Annual_Electricity_Consumption('');
      Set_Cost_of_Solar_Panel('');
      Set_Annual_Electricity_Cost('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  if (error) {
    return (
      <div>
        <p className='text-white'>{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex justify-center align-middle'>
        <h1 className='text-white text-5xl'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='w-auto h-auto flex justify-center items-center relative'>
      {user ? (
        <div className='w-[30rem] h-[30rem] rounded-lg flex justify-center absolute top-20 bg-[#228b22]'>
         <form onSubmit={handleSumit} className='my-5'>
         <div className="sm:col-span-2">
              <label  className="block text-sm font-medium leading-6 text-white">
                Annual Electricity unit Consumption
              </label>
              <div className="mt-2">
                <input
                  id="Annual Electricity unit Consumption"
                  name="Annual Electricity unit Consumption"
                  type="text"
                  className="block w-full focus:outline-0 px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => Set_Annual_Electricity_Consumption(e.target.value)}
                />
              </div>
        </div>

        <div className="sm:col-span-2 my-3">
              <label  className="block text-sm font-medium leading-6 text-white">
                Annual Electricity Bill / cost 
              </label>
              <div className="mt-2">
                <input
                  id="Annual_Electricity_Costn"
                  name="Annual_Electricity_Cost"
                  type="text"
                  className="block w-full focus:outline-0 px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => Set_Annual_Electricity_Cost(e.target.value)}
                />
              </div>
          </div>

          <div className="sm:col-span-2">
              <label  className="block text-sm font-medium leading-6 text-white">
                Shadow Free Space
              </label>
              <div className="mt-2">
                <input
                  id="Shadow_Free_Space"
                  name="Shadow_Free_Space"
                  type="text"
                  className="block w-full focus:outline-0 px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => Set_Shadow_Free_Space(e.target.value)}
                />
              </div>
          </div>

          
          <div className="mt-4 space-y-10">
            <fieldset>
              <legend className="text-md font-semibold leading-6 text-white">Requirement Type</legend>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white">
                    Save Money
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white">
                    Want to Store Electricity
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white">
                    24/7 Electricity
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="mt-6 flex items-center  gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-[#62fcaf] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
        
    </form>

    

        </div>
      ) : (
        <p>user is not found</p>
      )}
    </div>
  );
}
