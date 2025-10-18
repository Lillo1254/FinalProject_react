import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useCallback, useEffect, useRef, useState } from "react";
import supabaseClient from "../../../QueryDb/queryDB";
import { useAuth } from "../../contexts/AuthContext";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const chatContainer = {
  marginTop: "5px",
  padding: "0px 3px",
  width: "100%",
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowY: "auto",
};

export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  const { isAdmin, userLog } = useAuth();
  const myUserId = userLog?.id;

  // Scroll automatico in basso
  const scrollSmoothBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  // Recupera i messaggi iniziali
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

  // Aggiornamento realtime con channel
  useEffect(() => {
    if (data?.id) getInitialMessages();

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

    return () => supabaseClient.removeChannel(channel);
  }, [data, getInitialMessages]);

  useEffect(() => {
    scrollSmoothBottom();
  }, [messages]);

  // 🔹 Funzione per cancellare messaggi
  const deleteMessage = async (messageId) => {
    const { error } = await supabaseClient
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error("Errore cancellando il messaggio:", error.message);
    } else {
      // Aggiorna lo stato locale per rimuovere il messaggio cancellato
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }
  };

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
              {dayjs
                .utc(message.updated_at ?? message.created_at)
                .tz("Europe/Rome")
                .fromNow()}
            </small>
          </article>
        );
      })}
    </div>
  );
}
