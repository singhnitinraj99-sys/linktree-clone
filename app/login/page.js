"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields")
      return
    }
    setLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Logged in!")
      router.push("/generate")  // redirect after login
    }
    setLoading(false)
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-purple-100 ">
        <div className="bg-white p-10 rounded-xl shadow-md flex flex-col gap-5 w-96 z-50">
          <h1 className="font-bold text-2xl text-gray-800">Log In</h1>
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
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="border border-gray-300 rounded-md px-4 py-2 text-slate-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gray-900 text-white py-2 rounded-full font-semibold cursor-pointer hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-600 font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  )
}