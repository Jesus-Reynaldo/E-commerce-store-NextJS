'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma" 
import { revalidatePath } from "next/cache"

export const getCategories = async () => {
  const session = await auth()
  if(session?.user.role !== 'admin'){
    return{
      ok: false,
      message: 'No tienes permisos para realizar esta acción'
    }
  }
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      },
  })
  return categories
}
  catch (error) {
    console.log(error)
    return []
  }
}