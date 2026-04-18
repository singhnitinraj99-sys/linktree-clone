import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const handle = searchParams.get('handle')

    if (!handle) {
      return NextResponse.json({ exists: false })
    }

    const client = await clientPromise
    const db = client.db("storedata")
    const doc = await db.collection("generate").findOne({ handle: handle })

    return NextResponse.json({ exists: !!doc })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ exists: false }, { status: 500 })
  }
}