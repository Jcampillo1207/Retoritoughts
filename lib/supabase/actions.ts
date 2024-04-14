'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from './server'


export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const dataPublic = {
    email: formData.get('email') as string,
    username: formData.get('username') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return(error)
  } else{
    const { error } = await supabase.from("User").insert({email: dataPublic.email, username: dataPublic.username})
    if (error){
      return error
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout(){
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
}