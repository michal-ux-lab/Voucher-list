import { NextResponse } from 'next/server'
import { deals } from '@/lib/mock-database'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { options } = body
    const id = params.id

    // Find the deal
    const dealIndex = deals.findIndex(d => d.id === id)
    if (dealIndex === -1) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 })
    }

    // Update the deal's options
    const updatedDeal = {
      ...deals[dealIndex],
      options: options.map((option: any) => ({
        ...option,
        category: option.category
      }))
    }
    deals[dealIndex] = updatedDeal

    return NextResponse.json(updatedDeal)
  } catch (error) {
    console.error('Error updating deal:', error)
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 })
  }
} 