"use client"; 

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';      // ye msg pop ke liye hai 
import { useRouter } from 'next/navigation';  // next route pr jaane ke liye 
import Link from 'next/link';

export default function LoginPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const respone = await axios.post("/api/users/login", user)
      console.log("Login success", respone.data);

      router.push("/profile")  // next route

    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message)
    }

  }

  // button diable/ enable using useEffect 
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className='flex flex-col items-center bg-gray-700 p-10'>
        <h1 className="text-3xl font-bold mb-4 text-center">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="w-full border-gray-300 mb-8" />

        {/* for email field */}
        <label htmlFor="email" className="mb-2">Email</label>
        <input
          id='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='Enter your email'
          type="text"
          className="w-full border text-gray-700 
          border-gray-300 px-4 py-3 
          rounded-md mb-4 focus:outline-none 
          focus:border-blue-500"
        />

        {/* for email password */}
        <label htmlFor="password" className=" mb-2">Password</label>
        <input
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Enter your password'
          type="password"
          className="w-full text-gray-700 border
          border-gray-300 px-4 py-3 
          rounded-md mb-4 focus:outline-none 
          focus:border-blue-500"
        />

        <button
          onClick={onLogin}
          className="border border-gray-600 
        text-white py-3 px-6 mb-3
        rounded-md hover:bg-blue-600 
        transition duration-300"
        >
          {buttonDisabled ? "No login" : "Login"}
        </button>

        <Link href="/signup">Visit Signup page</Link>




      </div>
    </div>


  )
}
