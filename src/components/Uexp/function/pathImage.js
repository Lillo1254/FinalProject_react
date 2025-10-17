import { useState, useEffect } from "react";
import supabaseClient from "../../../QueryDb/queryDB";


export default function useAvatarUrl(fileName) {
  const [publicUrl, setPublicUrl] = useState("/assets/reactdefault.jpg");

  useEffect(() => {
    if (!fileName) return;

    const { data, error } = supabaseClient.storage
      .from("avatars")
      .getPublicUrl(fileName);

    if (error) {
      console.error("Errore generando URL pubblico:", error);
      setPublicUrl("/assets/reactdefault.jpg");
    } else if (data?.publicUrl) {
      setPublicUrl(data.publicUrl);
    }
  }, [fileName]);

  return publicUrl;
}
