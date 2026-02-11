import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()



export async function POST(req: Request) {
    try {

        const {name, email, role, status, departments} = await req.json()

        if(!name || !email || !role || !status || !departments) {
            return NextResponse.json({success: false, message: "Informações insuficientes"}, {status: 400})
        }


        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                role: role,
                status: status,
                departments: departments
            }
        })


        return NextResponse.json({success: true, message: "Usuário criado com sucesso", user}, {status: 201})



    } catch(err) {
        return NextResponse.json({success: false, message: "Erro ao criar Usuário"}, {status: 500})
    }
}