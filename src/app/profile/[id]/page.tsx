


export default function page({ params }: any) {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center'>
                <h1 
                className='text-3xl font-bold mb-4 text-center'>
                    Profile Page
                </h1>
                <hr className='w-full border-gray-300 mb-8' />

                <h2 
                className='text-xl mb-4 bg-green-500 rounded text-black'>
                    {params.id}
                </h2>

            </div>
        </div>

    )
}

