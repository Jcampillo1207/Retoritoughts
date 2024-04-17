import { toast } from "sonner";
import { createClient } from "./supaclient";

// get Random Events
export async function getFrontEvents(eventNum: number) {
  const supabase = await createClient();
  const data = await supabase
    .from("random_events")
    .select("*")
    .eq("is_verified", true)
    .limit(eventNum);
  return data;
}

// Sumbit event function
export async function makeEvent(
  data: FormData,
  imageSrc: any,
  bce: boolean,
  email: any
) {
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
    is_verified: false,
    submitter: email.email,
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

// classic function
export async function fetchData(numOfEvents: number) {
  try {
    const response = await getFrontEvents(numOfEvents);

    if (response.data && Array.isArray(response.data)) {
      const eventsWithImages = await Promise.all(
        response.data.map(async (event: any) => {
          if (event.image) {
            const data = await getEventImages(event.image);

            return { ...event, imageUrl: data.publicUrl };
          } else {
            return { ...event, imageUrl: null };
          }
        })
      );
      return eventsWithImages;
    } else {
    }
  } catch (error) {}
}

//Matcher Function
export async function getMatchedEvents(year: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .eq("year", year)
    .eq("is_verified", true);
  if (error) {
    toast.error("Couldnt retrieve data");
  } else {
    return data;
  }
}

//Matcher Images
export async function getMatchedImages(year: number) {
  const response = await getMatchedEvents(year);

  if (response && Array.isArray(response)) {
    const eventsWithImages = await Promise.all(
      response.map(async (event: any) => {
        if (event.image) {
          const data = await getEventImages(event.image);
          return { ...event, imageUrl: data.publicUrl };
        } else {
          return { ...event, imageUrl: null };
        }
      })
    );
    return eventsWithImages;
  } else {
    toast.error("Invalid response or data format");
  }
}

//Matcher Submissions
export async function getUserSubmissions(email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .eq("submitter", email);
  if (error) {
    toast.error("Couldnt retrieve data");
  } else {
    return data;
  }
}

// Matcher Submissions Images
export async function getUserSubmissionsImages(email: string) {
  const response = await getUserSubmissions(email);

  if (response && Array.isArray(response)) {
    const eventsWithImages = await Promise.all(
      response.map(async (event: any) => {
        if (event.image) {
          const data = await getEventImages(event.image);
          return { ...event, imageUrl: data.publicUrl };
        } else {
          return { ...event, imageUrl: null };
        }
      })
    );
    return eventsWithImages;
  } else {
    toast.error("Invalid response or data format");
  }
}

//get Events by id
export async function getEventsById(id: string) {
  const supabase = await createClient();
  const data = await supabase
    .from("Events")
    .select("*")
    .eq("id", id)
    .limit(1)
  return data;
}
