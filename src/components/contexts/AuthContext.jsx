import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../../QueryDb/queryDB";
import { is } from "zod/locales";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userName, setUserName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
  const getProfile = async () => {
    if (session?.user) {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("username, avatar_url, is_admin")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setUserName(data.username);
        setIsAdmin(data.is_admin ?? false);

        if (data.avatar_url) {
          // Se già URL completo
          if (data.avatar_url.startsWith("http")) {
            setAvatarUrl(data.avatar_url);
          } else {
            // Costruisci subito il public URL
            const { data: urlData } = supabaseClient
              .storage
              .from("avatars")
              .getPublicUrl(data.avatar_url);
            setAvatarUrl(urlData.publicUrl);
          }
        } else {
          setAvatarUrl(null);
        }
      }
    } else {
      setUserName(null);
      setAvatarUrl(null);
    }
  };

  getProfile();
}, [session]);

  //
  const userLog = session?.user ?? null;

const refreshProfile = async () => {
  if (session?.user) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", session.user.id)
      .single();

    if (!error && data) {
      setUserName(data.username);
      setIsAdmin(data.is_admin ?? false);

      if (data.avatar_url) {
        if (data.avatar_url.startsWith("http")) {
          setAvatarUrl(data.avatar_url);
        } else {
          const { data: urlData } = supabaseClient
            .storage
            .from("avatars")
            .getPublicUrl(data.avatar_url);
          setAvatarUrl(urlData.publicUrl);
        }
      } else {
        setAvatarUrl(null);
      }
    }
  }
};

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      alert("Sign out successfully!");
      setSession(null);
      setUserName(null);
      setAvatarUrl(null);
    }
  };
  // console.log(isAdmin);

  return (
    <AuthContext.Provider
      value={{ userName, session, signOut, avatarUrl, userLog, refreshProfile, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
