import supabase from "./supaclient";

export async function getFrontEvents(eventNum: number) {
  let events = [];
  const minCeiled = Math.ceil(1);
  const max = await getNumberOfEvents();
  let ids = new Set();

  while (ids.size < eventNum) {
    ids.add(Math.floor(Math.random() * (max! - minCeiled) + minCeiled)!);
  }

  const idsArray = Array.from(ids);
  console.log(idsArray)
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
  let { data } = supabase.storage.from("eventos").getPublicUrl(name);
  return data;
}
