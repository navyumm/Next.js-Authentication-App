"use client";

import axios from 'axios'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {

  // const router = useRouter()    // token ke liyye next ka use karke

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifymail", { token });
      setVerified(true);
      setError(false);

    } catch (error) {
      setError(true);
      console.error("Error verifying email:", error);
    }
  };

  // token lene ke liye
  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]       // jaise hi page load hoga, url se token le lenge
    setToken(urlToken || "")

    // const { query } = router;
    // const urlTokenTwo = query.token

  }, [])

  // ye wala jab token ke andr kuch changes ho
  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);





  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-4'>Verify Email</h1>
        <h2 className='text-xl mb-4 text-black bg-orange-600'>{token ? `${token}` : "no token"}</h2>

        {verified && (
          <div className='mb-4'>
            <h2 className='text-2xl text-green-700'>Verified</h2>
            <Link href="/login" className='text-blue-500 hover:underline'>Login</Link>
          </div>
        )}

        {error && (
          <div className='mb-4'>
            <h2 className='text-2xl text-red-700'>Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}

