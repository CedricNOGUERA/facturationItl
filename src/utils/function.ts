import { supabase } from "./supabaseClient";

  
  export  const _getUserData = async (setUserdata: any) => {
    let { data: users, error } = await supabase.from("users").select('*, friendArea(*)');
    
    if (users) {
      setUserdata(users);
    }
    if (error){
        console.log(error)
    }
  };