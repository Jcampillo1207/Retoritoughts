"use server";

import { error } from "console";
import { createClient } from "./server";

export async function getFrontEvents(eventNum: number) {
  const supabase = await createClient();

  let events = [];
  const minCeiled = Math.ceil(1);
  const max = await getNumberOfEvents();
  let ids = new Set();

  while (ids.size < eventNum) {
    ids.add(Math.floor(Math.random() * (max! - minCeiled) + minCeiled)!);
  }

  const idsArray = Array.from(ids);
  //console.log(idsArray)
  const queries = idsArray.map((id) =>
    supabase.from("Events").select("*").eq("id", id).single()
  );

  events = await Promise.all(queries);
  return events;
}

export async function makeEvent(
  title: string,
  description: string,
  year: number,
  month: number,
  day: number,
  BCE: boolean
) {
  const supabase = await createClient();
  const { error } = await supabase.from("Events").insert({
    title: title,
    description: description,
    year: year,
    month: month,
    day: day,
    BCE: BCE,
  });
  if (error) {
    console.log("error");
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

export async function updateScore(score: number, email: string) {
  const supabase = await createClient();
  console.log(email);

  let scores = await supabase
    .from("User")
    .select("*")
    .eq("email", email);

  console.log(scores);

  if (error) {
    return error;
  } else {
      // const realScore = data![0].max_score;
      // if (score > realScore) {
      //   const { data, error } = await supabase
      //     .from("User")
      //     .update({ max_score: score })
      //     .eq("email", email)
      //     .select();
      //   if (error) {
      //     return error;
      //   } else {
      //     return data;
      //   }
      // }
  }
}
