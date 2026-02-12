import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";




const prisma = new PrismaClient()


export async function DELETE(req: Request) {
    try {

        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")

        if(!id) {
            return NextResponse.json({success: false, message: "Usuário não encontrado"}, {status: 401})
        }

        const deleteUser = await prisma.users.delete({
            where: {id: id}
        })


        return NextResponse.json({success: true, message: "Usuário deletado com sucesso", deleteUser}, {status: 200})



    } catch(err) {
        return NextResponse.json({success: false, message: "Erro na API delete"}, {status: 500})

    }
}