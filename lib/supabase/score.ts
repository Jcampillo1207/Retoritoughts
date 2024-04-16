import { toast } from "sonner";
import { createClient } from "./supaclient";

export async function updateScore(score: number, email: string) {
  const supabase = await createClient();

  let {data, error}= await supabase.from("User").select("*").eq("email", email);

  if (error) {
    return score;
  } else {
    const currentMax = data![0].max_score;
    if (score > currentMax) {
      const { error } = await supabase
      .from("User")
      .update({ max_score: score })
      .eq("email", email)

      console.log(error)

      if (error) {
        toast.error("There was an error updating your High Score.");
      } else {
        toast.success("You have a new High Score of: " + score);
      }
    }else{
      toast.warning("Bloody hell you look like bloody hell 🔥")
    }
  }
  return score;
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
