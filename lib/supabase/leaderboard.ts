import supabase from "./supaclient";

export async function getLeaderboard(){
    const { data, error } = await supabase.from('Users').select('username, maxScore').order('maxScore', { ascending: false }).limit(100)
}