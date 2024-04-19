import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supaclient";
import { toast } from "sonner";

//Fetch User
//Input: Data that contains the user's email
//Output: User's email
export async function fetchUser(data: any) {
  const supabase = createClient();

  let { data: User, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", data.email);

  const info = {
    user: User,
    error: error,
  };

  console.log(info);

  return info;
}

//Inserts User into PUBLIC User table in DB
//Input: User's data
//Ouput: returns error
export async function insertUser(data: any) {
  const supabase = createClient();
  const { error } = await supabase
    .from("User")
    .insert({ email: data.email, username: data.username });
  return error;
}

//SignUp
//Input: Form Data
//Output: void
export async function signupUser(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const dataPublic = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
  };

  // fetch user email
  const { user, error } = await fetchUser(dataPublic);

  // verify if user exists
  if (error) {
  } else {
    // if user not exists
    if (user![0] === null || user![0] === undefined) {
      // signup user
      const { error } = await supabase.auth.signUp(data);
      if (error) {
        toast.error("Failed to signup user 😫");
      } else {
        // insert user into public User table
        const error = await insertUser(dataPublic);
        if (error) {
          toast.error("Failed to create account 😫");
        } else {
          toast.success("Signed up succesfully, please confirm your email 🥳");
        }
      }
    } else {
      // if user exists
      toast.error("This user already exists");
    }
  }
}

//LogIn
//Input: Form Data
//Output: void
export async function loginUser(formData: FormData | any) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    toast.error("Email or password are incorrect");
    return error;
  } else {
    toast.success("Login succesfully, Welcome back 🥳");
  }
}

//Reset Password
//Input: Form Data
//Output: void
export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    toast.error("Failed to reset password");
  } else {
    redirect("/auth");
  }
}

//Login using Github
//Input: None
//Output: void
export async function githubHandler() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "/",
    },
  });
  if (error) {
    toast.error("Unable to use github 😭");
  } else {
    toast.success("Continue with Github");
  }
}

//Login using Google
//Input: None
//Output: void
export async function googleHandler() {
  const supabase = createClient();
  toast.info("Redirecting");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/",
    },
  });
  if (error) {
    toast.error("Unable to use google 😭");
  } else {
    toast.success("Continue with google");
  }
}

export async function getUserAuth(){
  const supabase = createClient();
  const {data} = await supabase.auth.getUser();
  return data
}
