import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supaclient";
import { toast } from "sonner";

// SignUp
export async function signupUser(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    toast.error("Failed to create account 😫");
    return error;
  } else {
    const dataPublic = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
    };

    const { error } = await supabase
      .from("User")
      .insert({ email: dataPublic.email, username: dataPublic.username });

    if (error) {
      toast.error("Failed to create account 😫");
      const { error } = await supabase
        .from("User")
        .delete()
        .eq("email", data.email);
      if (error) {
      }
    } else {
      return error;
    }
  }
  toast.success("Account created, welcome 🥳");
}

// LogIn

export async function loginUser(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    toast.error("Failed to login");
    return error;
  } else {
    toast.success("Login succesfully, Welcome back 🥳");
  }
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

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

// Login using Github

export async function githubHandler() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://retoritoughts.vercel.app/",
    },
  });
  if (error) {
    toast.error("Unable to use github 😭");
  } else {
    toast.success("Login succesfully, Welcome back 🥳");
  }
}

// Login using Google

export async function googleHandler() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://retoritoughts.vercel.app/",
    },
  });
  if (error) {
    toast.error("Unable to use google 😭");
  } else {
    toast.success("Login succesfully, Welcome back 🥳");
  }
}