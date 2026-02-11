import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"



const prisma = new PrismaClient()



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("searchQuery") ?? ""
    const role = searchParams.get("role")
    const status = searchParams.get("status")

    const where: any = {}

    // 🔍 Search
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ]
    }

    // 🎭 Role
    if (role && role !== "all" && role !== "Cargos") {
      where.role = role
    }

    // 📊 Status
    if (status && status !== "all" && status !== "Status") {
      where.status = status
    }

    const usersFiltered = await prisma.users.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      usersFiltered,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { success: false, message: "Erro na API ao filtrar usuários" },
      { status: 500 }
    )
  }
}
