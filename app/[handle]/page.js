import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function Page({ params }) {
  const handle = (await params).handle
  
  // ✅ Get current session
  const session = await getServerSession()

  // ✅ If not logged in, send to login page
  if (!session) {
    redirect("/login")
  }

  const client = await clientPromise
  const db = client.db("storedata")
  const item = await db.collection("generate").findOne({ handle: handle })

  // ✅ Handle not found
  if (!item) {
    return notFound()
  }

  // ✅ If logged in user is NOT the owner, block access
  if (item.ownerEmail !== session.user.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E9C0E9] gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600">This BitTree belongs to someone else.</p>
        <Link href="/" className="bg-gray-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition">
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-purple-400 justify-center  items-start py-10">
      <div className="photo flex justify-center flex-col items-center mt-[85px] gap-4">
        <img src={item.pic} alt="profile" className="rounded-full w-24 h-24 object-cover" />
        <span className="font-bold text-xl">@{item.handle}</span>
        {item.desc && <span className="desc w-80 text-center">{item.desc}</span>}
        <div className="links w-full">
          {item.links.map((link, index) => (
            <Link key={index} href={link.link}>
              <div className="bg-purple-100 py-4 shadow-lg px-2 min-w-96 flex justify-center text-black rounded-md my-3 hover:bg-purple-200 transition">
                {link.linktext}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}