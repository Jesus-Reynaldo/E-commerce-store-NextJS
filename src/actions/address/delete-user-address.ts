'use server';

export const deleteUserAddress = async(userId:string)=>{
    try{
        const deleted = await prisma?.userAddress.deleteMany({
            where:{userId}
        })
        return {
            ok: true,
            message: 'La direccion ha sido eliminada'
        }
    }
    catch(error){
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo eliminar la direccion'
        }
    }
}