import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({ 
        name: "Naufal Assyafiq",
        city: "Bogor",
        education: "Universitas Muhammadiyah Prof Dr HAMKA"
     });
}