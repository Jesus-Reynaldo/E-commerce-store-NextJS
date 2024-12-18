'use server'
export const setTransactionId = async(orderId: string, transactionId: string)=>{
  try{
    const order = await prisma?.order.update({
      where:{
        id: orderId
      },
      data:{
        transactionId: transactionId
      }
    })
    if(!order){
      return {
        ok: false,
        message: `No se encontro la orden con el ${orderId}}`
      }
    }
    return {ok: true}
  }
  catch(error){
      console.log(error)
      return {
        ok: false,
        message: 'No se pudo actualizar el id de la transacción'
      }
  }
}