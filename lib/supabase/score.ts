import { toast } from "sonner";
import { createClient } from "./supaclient";

//Updates max_score
//Input: score, user's email
//Output: score
//Note: only updates max_score if score > max_score
export async function updateScore(score: number, email: string) {
    const supabase = await createClient();
    const currentMax = await getHighScore(email);

    if (score > currentMax) {
      const { error } = await supabase
        .from("User")
        .update({ max_score: score })
        .eq("email", email);
      if (error) {
        toast.error("There was an error updating your High Score.");
      } else {
        toast.success("You have a new High Score of: " + score);
      }
    }
  return score;
}

//Retrives the leaderboard
//Input: page number & the range of each page
//Output: The top "range" numbers starting from (range * num)

export async function getLeaderboard(num: number, range: number) {
  const supabase = await createClient();
  let min = 0;
  let max = 0;

  if (num == 0) {
    min = 0;
    max = range - 1;
  } else {
    min = range * num;
    max = min + range - 1;
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

//Retrieves the Users High Score
//Input: user's email
//output: Actual High Score if the highscore is retrived successfully & returns the MAX_SAFE_INTEGER otherwise
export async function getHighScore(email: string) {
  const supabase = await createClient();
  let highScore  = Number.MAX_SAFE_INTEGER;

  console.log("High Score")

  let { data, error } = await supabase
    .from("User")
    .select("max_score")
    .eq("email", email);

  if (error) {
    toast.error("Failed to retrieve high score");
  } else {
      highScore = data![0].max_score as number;
  }
  console.log(highScore)
  return highScore;
}