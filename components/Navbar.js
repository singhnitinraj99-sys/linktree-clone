"use client"
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="flex justify-between h-auto fixed bg-white w-[90vw] md:w-[80vw] absolute top-5 md:top-10 right-[5vw] md:right-[10vw] rounded-full p-4 px-5 md:px-7 items-center z-50 flex-wrap gap-2">
      
      <div className="logo flex items-center gap-4 md:gap-20 text-black">
        <span>
          <span className="font-bold text-3xl md:text-4xl text-[#254f1a]">Bit</span>
          <span className="font-bold text-2xl md:text-3xl">Tree</span>
        </span>

        {/* Hamburger button - mobile only */}
        <button 
          className="md:hidden text-gray-700 text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Nav links - hidden on mobile, shown on md+ */}
        <ul className="hidden md:flex gap-2 text-sm">
          <Link href="/"><li className="hover:text-green-700 cursor-pointer px-2 font-semibold ">Home</li></Link>
          <Link href="/generate"><li className="hover:text-green-700 cursor-pointer px-2 font-semibold ">Create</li></Link>
          <Link href="/help"><li className="hover:text-green-700 cursor-pointer px-2 font-semibold ">Help</li></Link>
             <Link href="/"><li className=" px-2 font-semibold ">Discover</li></Link>
          <Link href="/"><li className="px-2 font-semibold ">Pricing</li></Link>
       
        </ul>
      </div>

      {/* Auth buttons */}
      <div className="hidden md:flex gap-2">
        {session ? (
          <>
            <span className="self-center text-sm text-gray-600 font-medium">
              Hi, {session.user.name || session.user.email}
            </span>
            {/* ✅ Same style as login button */}
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="login bg-gray-400 p-4 rounded-lg text-sm cursor-pointer">
              Log out
            </button>
          </>
        ) : (
          <>
            {/* ✅ Same styles as before, just added Link */}
            <Link href="/login">
              <button className="login bg-gray-400 p-4 rounded-lg text-sm cursor-pointer">Log in</button>
            </Link>
            <Link href="/signup">
              <button className="signup login bg-gray-900 text-white p-4 rounded-full font-bold text-sm cursor-pointer">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="w-full flex flex-col gap-3 mt-2 md:hidden px-4 pb-3">
          <ul className="flex flex-col gap-2 text-sm text-gray-700">
            <Link href="/" onClick={() => setMenuOpen(false)}><li className="hover:text-green-700">Home</li></Link>
            <Link href="/generate" onClick={() => setMenuOpen(false)}><li className="hover:text-green-700">Create</li></Link>
            <Link href="/" onClick={() => setMenuOpen(false)}><li className="">Discover</li></Link>
            <Link href="/" onClick={() => setMenuOpen(false)}><li className="" >Pricing</li></Link>
            <Link href="/help" onClick={() => setMenuOpen(false)}><li className="hover:text-green-700">Help</li></Link>
          </ul>
          <div className="flex gap-2 mt-1">
            {session ? (
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="login bg-gray-400 p-3 rounded-lg text-sm w-full cursor-pointer">
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" className="w-1/2" onClick={() => setMenuOpen(false)}>
                  <button className="login bg-gray-400 p-3 rounded-lg text-sm w-full cursor-pointer">Log in</button>
                </Link>
                <Link href="/signup" className="w-1/2" onClick={() => setMenuOpen(false)}>
                  <button className="signup login bg-gray-900 text-white p-3 rounded-full font-bold text-sm w-full">Sign Up Free</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar