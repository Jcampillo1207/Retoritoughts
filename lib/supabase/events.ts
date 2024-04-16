import { toast } from "sonner";
import { createClient } from "./supaclient";


// get Random Events
export async function getFrontEvents(eventNum: number) {
  const supabase = await createClient();
  const data = await supabase
    .from("random_events")
    .select("*")
    .limit(eventNum);
  return data
}

// Sumbit event function
export async function makeEvent(data: FormData, imageSrc: any, bce: boolean) {
  const supabase = await createClient();

  const imageName = imageSrc.name as string;

  const { error } = await supabase.from("Events").insert({
    title: data.get("title"),
    decription: data.get("description"),
    year: data.get("year"),
    month: data.get("month"),
    day: data.get("day"),
    BCE: bce,
    image: imageName,
  });
  if (error) {
    toast.error("There was an error submitting the event");
    return error;
  } else {
    const error = await uploadImage(imageSrc);
    if (error) {
      console.log(error);
      toast.error("Error uploading media");
      return error;
    }
    toast.success(
      "Succesfully uploaded event, Thank you for your support 🤩😘"
    );
  }
}

// Upload image function
export async function uploadImage(image: File) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("eventos")
    .upload(image.name, image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    return error;
  } else {
    console.log(data);
  }
}

export async function getNumberOfEvents() {
  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("Events")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching number of events:", error);
    return 0;
  }
  return count;
}

export async function getEventImages(name: string) {
  const supabase = await createClient();
  let { data } = supabase.storage.from("eventos").getPublicUrl(name);
  return data;
}

export async function getUserInfo(email: string) {
  const supabase = await createClient();

  let { data: User, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .limit(1);

  if (error) {
    return error;
  } else {
    return User;
  }
}
