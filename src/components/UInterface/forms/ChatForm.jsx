import supabaseClient from "../../../QueryDb/queryDB";
import { useAuth } from "../../contexts/AuthContext";
import RealtimeChat from "../AboutComponents/RealtimeChat";

export default function ChatForm({ data }) {
  const { session } = useAuth();

    if (!data?.id) {
    return <p>Chat non disponibile (manca il gioco).</p>;
  }
  // console.log(session)


 const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      try {
        const payload = {
          profile_id: session?.user?.id ?? null,
          profile_username: session?.user?.user_metadata?.userName ?? "unknown",
          game_id: data.id,
          content: message.trim(),
        };
        

       const { data: inserted, error } = await supabaseClient
  .from("messages")
  .insert([payload])
  .select();

if (error) {
  console.error("Errore insert message:", error);
} else {
  form.reset();
}
      } catch (err) {
        console.error("Errore imprevisto in handleMessageSubmit:", err);
      }
    }
  };


    return (
        <div translate="no">
            
      <form onSubmit={handleMessageSubmit} className="">
        <fieldset role="group" className="flex gap-2 justify-between">
          <input type="text" name="message" placeholder="Chat.." id="iinn" className="input input-bordered w-full " />
          <button type="submit" className="btn btn-primary" >Invia</button>
        </fieldset>
      </form>
        </div>
    );
}
