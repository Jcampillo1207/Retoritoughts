import { toast } from "sonner";
import { createClient } from "./supaclient";

//Get all events
//Input: None
//Ouput: All events in DB
export async function getAllEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Events").select();
  return data;
}

//Get all event images
//Input: None
//Ouput: All events in DB with its image
export async function getAllEventsImages() {
  const response = await getAllEvents();

  console.log(response);
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

//Get Random Events
//Input: number of events as (eventNum)
//Output: eventNum random events
export async function getFrontEvents(eventNum: number) {
  const supabase = await createClient();
  const data = await supabase
    .from("random_events")
    .select("*")
    .eq("is_verified", true)
    .limit(eventNum);
  return data;
}

//Get Random Real Events
//Input: number of events as (eventNum)
//Output: eventNum random events
export async function getRealEvents(eventNum: number) {
  const supabase = await createClient();
  const data = await supabase
    .from("random_events")
    .select("*")
    .eq("is_verified", true).eq("fantasy", false)
    .limit(eventNum);
  return data;
}

//Sumbit event function
//Input: Form data, image, bce (before common era) boolean, user email
//Output: returns error
export async function makeEvent(
  data: FormData,
  imageSrc: any,
  bce: boolean,
  fantasy: boolean,
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
    fantasy: fantasy,
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

//Upload image function
//Input: Image file
//Output: Void
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

//Get number of events
//Input: None
//Ouput: Count of events in DB
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

//Get event images
//Input: Event's name
//Output: Event's image
export async function getEventImages(name: string) {
  const supabase = await createClient();
  let { data } = supabase.storage.from("eventos").getPublicUrl(name);
  return data;
}

//Fetch data
//Input: number of events as (numOfEvents)
//Output: numOfEvents random events with their respective images
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

//Fetch data
//Input: number of events as (numOfEvents)
//Output: numOfEvents random real events with their respective images 
export async function fetchRealData(numOfEvents: number) {
  try {
    const response = await getRealEvents(numOfEvents);

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
//Input: year
//Output: All event that occurred in (year)
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
//Input: year
//Output: All the images of events that occurred in (year)
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
//Input: User's email
//Output: All events submitted by the user
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

//Matcher Submissions Images
//Input: User email
//Output: All events the user submitted with its corresponding images
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

//Get Event
//Input: event id
//Output: event with matching id
export async function getEventsById(id: string) {
  const supabase = await createClient();
  const data = await supabase.from("Events").select("*").eq("id", id).limit(1);
  return data;
}

//Update Events
//Input: new data to update, current image name, new image file (or null), the event id, the BCE (befroe common era) bool
//Output: void
export async function updateEvent(
  data: FormData,
  id: number,
  bce: boolean,
  imageName: string,
  imageFile: File | null,
  fantasy: boolean,
  verified: boolean
) {
  const dataForm = {
    title: data.get("title"),
    decription: data.get("description"),
    year: data.get("year"),
    month: data.get("month"),
    day: data.get("day"),
  };
  const supabase = await createClient();

  if (imageFile != null) {
    deleteImage(imageName);
    imageName = imageFile.name;
    const error = await uploadImage(imageFile);
    if (error) {
      toast.error("There was an error uploading the image");
    }
  }

  const { error } = await supabase
    .from("Events")
    .update({
      title: dataForm.title,
      decription: dataForm.decription,
      year: dataForm.year,
      month: dataForm.month,
      day: dataForm.day,
      BCE: bce,
      image: imageName,
      is_verified: verified,
      fantasy: fantasy,
    })
    .eq("id", id);

  toast.success("Successfully updated event");
}

//Delete the image from the DB
//Input: Image name
//Output: void
async function deleteImage(imageName: string) {
  const supabase = await createClient();
  console.log(imageName);
  const { data, error } = await supabase.storage
    .from("eventos")
    .remove([imageName]);
  if (error) {
    toast.warning("There was an error deleting the old image ||" + error);
  }
}
