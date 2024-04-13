'use server'

import supabase from "./supaclient"

export async function userSignup(email: string, password: string, username: string){
//Adds User to PUBLIC table Users
let error = await createUser(email, username);
    if (error) { 
        console.log(error)
    } else {
        let error = await createUserAuth(email, password)
        if (error) { 
            console.log(error)
            //Deletes user from PUBLIC table Users if an error occurred
            deleteUser(email);
        }
    }
}

export async function createUserAuth(email: string, password: string) {
    //Inserts users into AUTH table Users in DB
    let { error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    return error;
}

export async function createUser(email: string, username: string) {
    //Inserts users into PUBLIC table Users in DB
    let { error } = await supabase.from('Users').insert({email: email, username: username})
    return error;
}

export async function deleteUser(email: string) {
    const { error } = await supabase.from("Users").delete().eq('email', email)
}

export async function deleteAuthUser(id: string) {
    const { data, error } = await supabase.auth.admin.deleteUser(id)
}

export async function userSignin(email: string, password: string){

    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        console.error("This user does NOT exist", error)
    }
}

export async function resetPassword(email: string){

    await supabase.auth.resetPasswordForEmail(
        email, {
            redirectTo: "" //add url for password reset
    })
}

export async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
        password: password
    })
    if (error) {
        console.error("There has been an issue reseting your password", error)
    }
}