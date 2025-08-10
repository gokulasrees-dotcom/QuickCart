import Product from "@/models/product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";




export async function POST(request) {
  try {
    
    const {userId} = getAuth(request)
    const { address, items } = await request.json();

    if(!address || items.length === 0) {
        return NextResponse.json ({ success: false, message: 'Invalid data'})
    }

    // cal amount using items
    const amount = await items.reduce(async (acc, items) => {
        const product = await Product.findById(items.product);
        return acc + product.offerPrice * items.quantity;
    },0)

    

  } catch (error) {
    
  }  
}