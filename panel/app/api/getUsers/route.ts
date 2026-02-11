import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



const prisma = new PrismaClient()


export async function GET() {

    try {      
        const getUsers = await prisma.users.findMany()

        if(!getUsers) {
            return NextResponse.json({success: false, message: "Usuários não encontrados"}, {status: 400})
        }



        return NextResponse.json({success: true, message: "usuários encontrados com sucesso", getUsers}, {status: 201})





    } catch(err){
        return NextResponse.json({success: false, message: "Usuários não encontrados", err}, {status: 400})

    }
    
}