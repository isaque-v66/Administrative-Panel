import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";




const prisma = new PrismaClient()



export async function PUT(req: Request) {
  try {
      
      const {searchParams} = new URL(req.url)
      const id = searchParams.get("id")

      if(!id) {
        return NextResponse.json({success: false, message: "Usuário não encontrado"}, {status: 401}) 

      }
  
      const body = await req.json()
  
      const updateUser = await prisma.users.update({
          where: {id},
          data: {
              name: body.name,
              email: body.email,
              role: body.role,
              status: body.status,
              departments: body.departments
          }
      })
  
  
  
      return NextResponse.json({success: true, message: "Usuário editado com sucesso", updateUser}, {status: 200})


  } catch(err) {
      return NextResponse.json({success: false, message: "Erro ao editar usuário"})
  }



}