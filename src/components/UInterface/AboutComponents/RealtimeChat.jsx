import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useCallback, useEffect, useRef, useState } from "react";
import supabaseClient from "../../../QueryDb/queryDB";
import { useAuth } from "../../contexts/AuthContext";
import defaultImg from "../../../assets/reactdefault.jpg";



const chatContainer = {
    marginTop: '5px',
    padding: '0px 3px',
    width: '100%',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '',
    overflowY: 'auto'
}

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
const now = dayjs().tz("Europe/Rome"); 



export default function RealtimeChat({ data }) { 

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
  const messageRef = useRef(null);
  const { avatarUrl, isAdmin  } = useAuth();
  
  //  const publicAvatarUrl = avatarUrl
  //     ? `https://oogpgotiwrgtkrkocooi.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`
  //   : defaultImg;
  console.log(isAdmin);
  
  const session = useAuth();
  console.log(session);

  // const admin = session?.user?.user_metadata?.isAdmin; 

    const scrollSmoothBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessages = useCallback(async () => {
    if (!data?.id) return;
    setLoadingInitial(true);
    const { data: msgs, error } = await supabaseClient
      .from("messages")
      .select()
      .eq("game_id", data.id)
      .order("created_at", { ascending: true });
    
    if (error) {
      setError(error.message);
    } else {
      setMessages(msgs || []);
    }
    setLoadingInitial(false);
  }, [data?.id]);

  useEffect(() => {
    if (data?.id) {
      getInitialMessages();
    }

    const channel = supabaseClient
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload?.new?.game_id === data?.id) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollSmoothBottom();
  }, [messages]);


  // console.log(messages);
  // console.log(messages.map(message => message.profile_id));
  // console.log(session.userLog.id);
  // const MyMessages = messages.filter(message => message.profile_id === session.userLog.id);
  // console.log(MyMessages);
  // const userCurrent = messages.map(message => message.profile_id) === session.userLog.id;
  // console.log(userCurrent); 
  // const myMessages = messages.filter(message => message.profile_id === session.session.user.id);
  // console.log(myMessages);
  // console.log(session.session.user.id);
  const myUserId = session?.session?.user?.id; 

    return (
 <div style={chatContainer} ref={messageRef}>
      {loadingInitial && <progress />}
      {error && <article>{error}</article>}
           {messages.map((message) => {
             const isMyMessage = message.profile_id === myUserId;

              const deleteMessage = async (messageId) => {
    const { error } = await supabaseClient
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error("Errore cancellando il messaggio:", error.message);
    } else {
      setMessages((prev) => prev.filter(msg => msg.id !== messageId));
    }
  };

      return (
        <article
          key={message.id}
          className={`flex flex-col my-3 p-2 rounded-md ${
            isMyMessage
              ? "bg-pink-400 text-white self-end"
              : "bg-gray-600 text-gray-100 self-start"
          }`}
        >
          <div className="flex gap-2 items-center">
            <small>Inviato da:</small>
            <span className="font-bold">{message.profile_username}</span>

            {isAdmin && (
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="btn bg-purple-400 ml-auto hover:underline"
                >
                  Elimina
                </button>
              )}

          </div>
          <p>{message.content}</p>
          <small>
          {dayjs.utc(message.updated_at ?? message.created_at).tz("Europe/Rome").fromNow()}
          </small>
        </article>
      );
    })}
    </div>
    )
}