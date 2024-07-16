import React from 'react'

const FirstPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-8">Community App</h1>
                <div className="space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        New User
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Old User
                    </button>
                </div>
            </div>
        </>
    )
}

export default FirstPage;