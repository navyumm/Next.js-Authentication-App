"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        try {
            const user = await axios.post("/api/users/me")
            console.log(user.data.data._id);

            setData(user.data.data._id)

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }

    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successfully")

            router.push("/login")

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)

        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl font-bold mb-4 text-center'>Profile Page</h1>
                <hr className='w-full border-gray-300 mb-8' />

                <h2 className='text-xl mb-4'>{data === "nothing" ? "Nothing" : <Link href=
                    {`/profile/${data}`}> {data} </Link>}</h2>
                {/* yaha pr "data" error shoe karega kyoki aisa koi file exist nhi karta, isko handle karne ke liye issi ke andr ke file bnani padegi jiski starting [] se karni padegi 
                    also known as dynamic routes*/}
                <hr />

                <button
                    onClick={logout}
                    className="border border-gray-600 
                    text-white py-3 px-6 mb-3
                    rounded-md bg-blue-600 hover:bg-blue-700 
                    transition duration-300"
                >Logout</button>

                <button
                    onClick={getUserDetails}
                    className="border border-gray-600 
                    text-white py-3 px-6 mb-3
                    rounded-md bg-green-600 hover:bg-green-700 
                    transition duration-300"
                >Get user details</button>
            </div>
        </div>
    )
}

