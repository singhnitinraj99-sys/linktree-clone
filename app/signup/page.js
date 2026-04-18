"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const result = await res.json()

      if (result.success) {
        toast.success("Account created! Please log in.")
        router.push("/login")
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("Something went wrong!")
    }
    setLoading(false)
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center  min-h-screen bg-purple-100">
        <div className="bg-white p-10 rounded-xl mt-[13vh] shadow-md flex flex-col gap-5 w-96 z-50">
          <h1 className="font-bold text-2xl text-gray-800">Sign Up Free</h1>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-slate-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-slate-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSignup()}
            className="border border-gray-300 rounded-md px-4 py-2 text-slate-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-gray-900 text-white py-2 rounded-full font-semibold cursor-pointer hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up for Free"}
          </button>
          <p className="text-sm text-gray-500 cursor-pointer text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 font-semibold">Log in</Link>
          </p>
        </div>
      </div>
    </>
  )
}