"use client"
import React, { useState, useEffect, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const GenerateContent = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [handle, sethandle] = useState(searchParams.get('handle') || "")
  const [pic, setpic] = useState("")
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [desc, setdesc] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status])

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) return {link, linktext}
        else return item
      })
    })
  }

  const addLink = () => {
    setLinks(links.concat([{link: "", linktext: ""}]))
  }

  const submitLinks = async () => {
    if (!handle) {
      toast.error("Please enter a handle first!")
      return
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ links, handle, pic, desc })
    }
    try {
      const r = await fetch("/api/add", requestOptions)
      if (!r.ok) {
        const text = await r.text()
        console.error("Server error:", text)
        toast.error("Server error: " + r.status)
        return
      }
      const result = await r.json()
      if (result.success) {
        toast.success(result.message)
        setLinks([{link: "", linktext: ""}])
        setpic("")
        sethandle("")
        setdesc("")
      } else {
        toast.error(result.message || "Error occurred")
      }
    } catch (err) {
      console.error(err)
      toast.error("Network error")
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  if (!session) return null

  return (
    <>
      <ToastContainer />
      <div className='bg-[#E9C0E9] min-h-screen flex flex-col md:grid md:grid-cols-2'>

        {/* Form Column */}
        <div className="flex justify-center flex-col text-gray-700 px-6 py-10 md:px-16 md:mt-[300px] md:py-12">
          <div className='flex flex-col gap-6'>
            <h1 className='font-bold text-2xl md:text-3xl text-gray-900'>Create your BitTree</h1>

            {/* Step 1 */}
            <div className="flex flex-col gap-2">
              <h2 className='font-semibold text-base md:text-lg text-gray-800'>Step 1: Claim your Handle</h2>
              <input
                value={handle}
                onChange={e => sethandle(e.target.value)}
                className='border border-gray-300 rounded-md text-gray-600 px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white'
                type="text"
                placeholder="Create a Handle"
              />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2">
              <h2 className='font-semibold text-base md:text-lg text-gray-800'>Step 2: Add Links</h2>
              {links && links.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    value={item.linktext || ""}
                    onChange={e => handleChange(index, item.link, e.target.value)}
                    className='border border-gray-300 rounded-md text-gray-600 px-4 py-2 w-full sm:w-44 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white'
                    type="text"
                    placeholder="Enter link text"
                  />
                  <input
                    value={item.link || ""}
                    onChange={e => handleChange(index, e.target.value, item.linktext)}
                    className='border border-gray-300 rounded-md text-gray-600 px-4 py-2 w-full sm:w-44 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white'
                    type="text"
                    placeholder="Enter link"
                  />
                </div>
              ))}
              <button
                className='mt-1 py-2 px-5 bg-gray-900 text-white text-sm font-semibold rounded-full w-36 cursor-pointer hover:bg-gray-700 transition'
                onClick={addLink}>
                + Add Link
              </button>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base md:text-lg text-gray-800">Step 3: Add Picture and Finalise</h2>
              <input
                value={pic}
                onChange={e => setpic(e.target.value)}
                className="border border-gray-300 rounded-md text-gray-600 px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                type="text"
                placeholder="Enter picture link"
              />
              <input
                value={desc}
                onChange={e => setdesc(e.target.value)}
                className="border border-gray-300 rounded-md text-gray-600 px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                type="text"
                placeholder="Enter a Description"
              />
              <button
                disabled={pic == "" || handle == "" || links[0].linktext == ""}
                onClick={submitLinks}
                className="disabled:bg-slate-500 disabled:cursor-not-allowed mt-1 py-2 px-6 bg-gray-900 text-white text-sm font-semibold rounded-full w-44 cursor-pointer hover:bg-gray-700 transition">
                Create your BitLink
              </button>
            </div>
          </div>
        </div>

        {/* Video Column - hidden on mobile */}
        <div className="hidden md:flex items-center justify-center my-[90px] w-full bg-[#E9C0E9]">
          <video autoPlay loop muted className="w-full max-w-2xl rounded-lg">
            <source src="/home.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </>
  )
}

export default function Generate() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  )
}