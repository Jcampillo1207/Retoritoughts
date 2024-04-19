import { toast } from "sonner";
import { createClient } from "./supaclient";

//Updates classic max_score
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

//Updates realistic max_score
//Input: score, user's email
//Output: score
//Note: only updates rmax_score if score > rmax_score
export async function updateRealScore(score: number, email: string) {
  const supabase = await createClient();
  const currentMax = await getRealisticHighScore(email);

  if (score > currentMax) {
    const { error } = await supabase
      .from("User")
      .update({ rmax_score: score })
      .eq("email", email);
    if (error) {
      toast.error("There was an error updating your High Score.");
    } else {
      toast.success("You have a new High Score of: " + score);
    }
  }
  return score;
}

//Updates Frenzy max_score
//Input: score, user's email
//Output: score
//Note: only updates rmax_score if score > rmax_score
export async function updateFrenzyScore(score: number, email: string) {
  const supabase = await createClient();
  const currentMax = await getRealisticHighScore(email);

  if (score > currentMax) {
    const { error } = await supabase
      .from("User")
      .update({ fmax_score: score })
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
export async function getLeaderboard(
  num: number,
  range: number,
  value: string
) {
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
    .select("username, max_score, rmax_score, fmax_score")
    .order(value, { ascending: false })
    .range(min, max);
  if (error) {
    toast.error("Failed to retrieve Leaderboard 😭");
  }
  return data;
}

//Retrieves the Users Classics High Score
//Input: user's email
//output: Actual High Score if the highscore is retrived successfully & returns the MAX_SAFE_INTEGER otherwise
export async function getHighScore(email: string) {
  const supabase = await createClient();
  let highScore = Number.MAX_SAFE_INTEGER;

  let { data, error } = await supabase
    .from("User")
    .select("max_score")
    .eq("email", email);

  if (error) {
    toast.error("Failed to retrieve high score");
  } else {
    highScore = data![0].max_score as number;
  }
  return highScore;
}

//Retrieves the Users Realistic High Score
//Input: user's email
//output: Actual High Score if the highscore is retrived successfully & returns the MAX_SAFE_INTEGER otherwise
export async function getRealisticHighScore(email: string) {
  const supabase = await createClient();
  let highScore = Number.MAX_SAFE_INTEGER;

  let { data, error } = await supabase
    .from("User")
    .select("rmax_score")
    .eq("email", email);

  if (error) {
    toast.error("Failed to retrieve high score");
  } else {
    highScore = data![0].rmax_score as number;
  }
  return highScore;
}

//Retrieves the Users Frenzy High Score
//Input: user's email
//output: Actual High Score if the highscore is retrived successfully & returns the MAX_SAFE_INTEGER otherwise
export async function getFrenzyHighScore(email: string) {
  const supabase = await createClient();
  let highScore = Number.MAX_SAFE_INTEGER;

  let { data, error } = await supabase
    .from("User")
    .select("fmax_score")
    .eq("email", email);

  if (error) {
    toast.error("Failed to retrieve high score");
  } else {
    highScore = data![0].fmax_score as number;
  }
  return highScore;
}

//Get User count
//Input: None
//Output: The current number of users in DB
export async function getUserCount() {
  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("User")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching number of users");
    return 0;
  }
  console.log(count);
  return count;
}
