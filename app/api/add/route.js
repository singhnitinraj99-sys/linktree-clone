import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('✅ Body received:', body)
    const session = await getServerSession()
    // ✅ ADD THIS: Check if handle exists in the request
    if (!body.handle) {
      return NextResponse.json({ success: false, error: true, message: 'Handle is required' })
    }

    const client = await clientPromise
    const db = client.db("storedata")

    // Check if handle is already taken
    const doc = await db.collection("generate").findOne({ handle: body.handle })
    console.log('🔍 Found doc:', doc)  // ✅ ADD THIS to debug

    if (doc) {
      return NextResponse.json({ 
        success: false, 
        error: true, 
        message: 'This Bitree Already Exists', 
        result: null 
      })
    }

    const result = await db.collection("generate").insertOne({
      ...body,
      ownerEmail: session.user.email,
      createdAt: new Date(),
    })

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId, 
      message: 'Your Bitree has been generated. Enjoy!' 
    }, { status: 201 })

  } catch (error) {
    console.error('❌ FULL ERROR:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}