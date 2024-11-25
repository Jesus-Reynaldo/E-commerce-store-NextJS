'use server'

import { auth } from "@/auth.config";

export const getOrdersByUser = async()=>{
  const session = await auth();
  if(!session?.user.id){
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }
  try{
    const orders = await prisma?.order.findMany({
      where:{
        userId: session.user.id
      },
      include:{
        OrderAddress: {
          select:{
            firstName: true,
            lastName: true,
          }
        }
      }
    })
    return {
      ok: true,
      orders: orders
    }
  }
  catch(error){
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo obtener las ordenes'
    }
  }

}