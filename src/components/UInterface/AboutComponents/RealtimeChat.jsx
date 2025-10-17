import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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



export default function RealtimeChat({ data }) { 

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
  const messageRef = useRef(null);
  const { avatarUrl } = useAuth();


  //  const publicAvatarUrl = avatarUrl
  //     ? `https://oogpgotiwrgtkrkocooi.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`
  //   : defaultImg;
  
  const session = useAuth();
  // console.log(session);

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
          </div>
          <p>{message.content}</p>
          <small>
            {dayjs(message.updated_at ?? message.created_at).fromNow()}
          </small>
        </article>
      );
    })}
    </div>
    )
}