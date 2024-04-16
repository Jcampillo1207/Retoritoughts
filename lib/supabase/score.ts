import { toast } from "sonner";
import { createClient } from "./supaclient";

export async function updateScore(score: number, email: string) {
  const supabase = await createClient();

  let scores = await supabase.from("User").select("*").eq("email", email);

  console.log(scores);

  // if (error) {
  //   return error;
  // } else {
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
  // }
}

export async function getLeaderboard(num: number, range: number) {
  const supabase = await createClient();
  let min = 0;
  let max = 0
  
  if(num == 0){
    min = 0;
    max = range - 1;
  } else {
    min = (range) * num;
    max = (min + range) - 1;
  }
  

  const { data, error } = await supabase
    .from("User")
    .select("username, max_score")
    .order("max_score", { ascending: false })
    .range(min, max);
  if (error) {
    toast.error("Failed to retrieve Leaderboard 😭");
  }
  return data;
}
