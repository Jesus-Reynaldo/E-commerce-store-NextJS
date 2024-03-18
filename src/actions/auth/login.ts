'use server'
import { signIn } from '@/auth.config'
import { sleep } from '@/utils'
import { AuthError } from 'next-auth'
import email from 'next-auth/providers/email';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })
    return 'Success'
  } catch (error) {
    if((error as any).type === 'CredentialsSignin'){
      return 'CredentialsSignin'
    }
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.'
    //     default:
    //       return 'Something went wrong.'
    //   }
    // }
    // throw error;
    return 'UnkownError'
  }
}

export const login = async(email: string, password: string) =>{
  try{
    await signIn('credentials',{email,password});
    return{
      ok: true
    }
  }catch(error){
    console.log("Login Error", error);
    return{
      ok:false,
      message: 'No se pudo iniciar sesion'
    }
  }
}