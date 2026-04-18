"use client"
import Image from "next/image";
import {useState} from "react";
import { useRouter} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify'


export default function Home() {
  const router = useRouter()
  const [text,setText] = useState("bittr.ee/")
  const [handle, setHandle] = useState("")
  const [loading, setLoading] = useState(false)
  
const checkHandle = async () => {
    // ✅ Validate input
    if (!handle.trim()) {
      toast.error("Please enter a handle!")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/checkhandle?handle=${handle.trim()}`)
      const result = await response.json()

      if (result.exists) {
        // ✅ Handle found — navigate to that page
        router.push(`/${handle.trim()}`)
      } else {
        // ❌ Handle not found — show error
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
   <section className="bg-[#254f1a] min-h-[113vh] grid grid-cols-2">
   <div className=" flex items-center justify-center mt-[15vh] flex-col ml-[10vw] gap-4" >
     <p className="text-yellow-300 font-bold text-4xl " >Everything you are.In one,simple link in bio.</p>
      <p className="text-yellow-300  text-xl" >Join 70M+ people using BitTree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
 
 
    <div className="flex items-center justify-center flex-col ml-[0.5vw] gap-4">
   <div className="input flex gap-5" >
     <input value={text} onChange = {(e)=> setText(e.target.value)} className=" bg-slate-500  px-2 py-2 focus:outline-green-800 rounded-md gr-[5px] cursor-pointer" type="text" placeholder="bittr.ee/your-url "/>
     <button onClick={()=> createTree()} className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer hover:bg-gray-700 transition hover:bg-gray-700 transition">Create</button>
   </div>
   <div className="input flex gap-5" >
          <input
            value={handle}
            onChange={e => setHandle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkHandle()} // ✅ press Enter too
            className="bg-slate-500  px-2 py-2 focus:outline-green-800 rounded-md gr-[5px] cursor-pointer"
            type="text"
            placeholder="Enter your handle e.g. nitin"
          />
          <button
            onClick={checkHandle}
            disabled={loading}
            className="bg-pink-300 rounded-full px-4 py-4 font-semibold cursor-pointer hover:bg-gray-700 transition"
          >
            {loading ? "Searching..." : "Open"}
          </button>
          </div>
          <ToastContainer/>
          </div>
        </div>
      
   <div className="flex items-center justify-center mr-[10vw]" >
   <video autoPlay loop muted  className="w-full max-w-2xl rounded-lg ">
    <source src="/home.mp4" type="video/mp4" />
    
  </video>

    </div>
   </section>
   </main>
 );
}
