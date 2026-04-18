import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db("storedata")
        
        // Find user by email
        const user = await db.collection("users").findOne({ 
          email: credentials.email 
        })
        
        if (!user) throw new Error("No user found with this email")
        
        // Check password
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error("Invalid password")
        
        return { id: user._id.toString(), email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",   // your custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }