import { NextResponse } from 'next/server'
import { deals } from '@/lib/mock-database'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const redemptionLocationId = searchParams.get('redemptionLocationId')

  if (id) {
    const deal = deals.find(d => d.id === id)
    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }
    return NextResponse.json(deal)
  }

  if (redemptionLocationId) {
    const deal = deals.find(d => d.redemptionLocationId === redemptionLocationId)
    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }
    return NextResponse.json(deal)
  }

  return NextResponse.json(deals)
} 