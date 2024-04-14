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
    console.log(error);
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
        console.log(error);
      }
    } else {
      return error;
    }
  }
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
    console.log(error);
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
