"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify'

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("bittr.ee/")
  const [handle, setHandle] = useState("")
  const [loading, setLoading] = useState(false)

  const checkHandle = async () => {
    if (!handle.trim()) {
      toast.error("Please enter a handle!")
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/checkhandle?handle=${handle.trim()}`)
      const result = await response.json()
      if (result.exists) {
        router.push(`/${handle.trim()}`)
      } else {
        toast.error("This handle does not exist!")
      }
    } catch (err) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] min-h-screen flex flex-col md:grid md:grid-cols-2">

        {/* Left - Text & Inputs */}
        <div className="flex items-center justify-center flex-col px-6 py-12 md:ml-[10vw] gap-6 text-center md:text-left">

          <p className="text-yellow-300 font-bold text-2xl sm:text-3xl md:text-4xl leading-snug">
            Everything you are. In one, simple link in bio.
          </p>

          <p className="text-yellow-300 text-sm sm:text-base md:text-xl">
            Join 70M+ people using BitTree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-sm">

            {/* Create Input */}
            <div className="flex gap-3 w-full">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-slate-500 px-3 py-2 focus:outline-green-800 rounded-md flex-1 min-w-0 text-white placeholder-gray-300"
                type="text"
                placeholder="bittr.ee/your-url"
              />
              <button
                onClick={createTree}
                className="bg-pink-300 rounded-full px-4 py-2 font-semibold cursor-pointer hover:bg-gray-700 hover:text-white transition whitespace-nowrap">
                Create
              </button>
            </div>

            {/* Open Handle Input */}
            <div className="flex gap-3 w-full">
              <input
                value={handle}
                onChange={e => setHandle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkHandle()}
                className="bg-slate-500 px-3 py-2 focus:outline-green-800 rounded-md flex-1 min-w-0 text-white placeholder-gray-300"
                type="text"
                placeholder="Enter your handle e.g. nitin"
              />
              <button
                onClick={checkHandle}
                disabled={loading}
                className="bg-pink-300 rounded-full px-4 py-2 font-semibold cursor-pointer hover:bg-gray-700 hover:text-white transition whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "..." : "Open"}
              </button>
            </div>

          </div>
          <ToastContainer />
        </div>

        {/* Right - Video (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center mr-[10vw]">
          <video autoPlay loop muted className="w-full max-w-2xl rounded-lg">
            <source src="/home.mp4" type="video/mp4" />
          </video>
        </div>

      </section>
    </main>
  );
}