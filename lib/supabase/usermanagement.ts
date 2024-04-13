"use server";

import supabase from "./supaclient";

export async function userSignup(
  email: string,
  password: string,
  username: string
) {
  let error = await createUser(email, username);
  if (error) {
    return error;
  } else {
    let error = await createUserAuth(email, password);
    console.log(error);
    if (error) {
      await deleteUser(email);
      return error;
    }
  }
}

export async function createUserAuth(email: string, password: string) {
  //Inserts users into AUTH table Users in DB
  let { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return error;
}

export async function createUser(email: string, username: string) {
  //Inserts users into PUBLIC table Users in DB
  let { error } = await supabase
    .from("User")
    .insert({ email: email, username: username });
  return error;
}

export async function deleteUser(email: string) {
  console.log(`Attempting to delete user with email: ${email}`);
  const { error } = await supabase.from("User").delete().eq("email", email);

  if (error) {
    console.error("Error deleting user:", error);
    return error;
  } else {
    console.log("User deleted successfully");
    return null;
  }
}

export async function deleteAuthUser(id: string) {
  const { data, error } = await supabase.auth.admin.deleteUser(id);
}

export async function userSignin(email: string, password: string) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("This user does NOT exist", error);
    return error
  }
}

export async function resetPassword(email: string) {
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "", //add url for password reset
  });
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    console.error("There has been an issue reseting your password", error);
  }
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    return user;
}