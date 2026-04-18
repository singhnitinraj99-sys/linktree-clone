import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("storedata")

    // Check if user already exists
    const existing = await db.collection("users").findOne({ email })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({ success: true, message: "Account created!" }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}