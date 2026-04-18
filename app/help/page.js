"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'

export default function Home() {
  const [handle, setHandle] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const openBitree = async () => {
    if (!handle.trim()) {
      toast.error("Please enter your handle!")
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/checkhandle?handle=${handle.trim()}`)
      const result = await response.json()
      if (result.exists) {
        router.push(`/${handle.trim()}`)
      } else {
        toast.error("No Bitree found with this handle!")
      }
    } catch {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-[#E9C0E9] flex flex-col items-center justify-center px-6 py-20 text-gray-800">

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-3">
          Welcome to <span className="text-[#254f1a]">BitTree</span>
        </h1>
        <p className="text-gray-600 text-center text-lg mb-12 max-w-md">
          One link for all your socials, websites and content. Simple and free.
        </p>

        {/* How to use */}
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">How to use BitTree</h2>
          <ol className="flex flex-col gap-5">
            <li className="flex items-start gap-4">
              <span className="bg-[#254f1a] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <p className="font-semibold">Sign up for free</p>
                <p className="text-gray-500 text-sm">Create your account using your email and password.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-[#254f1a] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <p className="font-semibold">Claim your handle</p>
                <p className="text-gray-500 text-sm">Pick a unique handle like <span className="font-mono bg-gray-100 px-1 rounded">yourname</span> — this becomes your personal link.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-[#254f1a] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <p className="font-semibold">Add your links and picture</p>
                <p className="text-gray-500 text-sm">Add all your social media, websites, and a profile photo.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-[#254f1a] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <p className="font-semibold">Share your BitTree</p>
                <p className="text-gray-500 text-sm">Share your link everywhere and let people find all your content in one place.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Create button */}
        <Link href="/generate">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-700 transition mb-6 cursor-pointer">
             Create Your BitTree
          </button>
        </Link>

        {/* Open your bitree */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg flex flex-col gap-3">
          <p className="font-semibold text-gray-800">Already have a BitTree? Open it 👇</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={handle}
              onChange={e => setHandle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && openBitree()}
              placeholder="Enter your handle e.g. nitin"
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
            <button
              onClick={openBitree}
              disabled={loading}
              className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "..." : "Open →"}
            </button>
          </div>
        </div>

      </div>
    </>
  )
}