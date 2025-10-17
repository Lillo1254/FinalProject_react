// pages/AccountPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../components/contexts/AuthContext";
import supabaseClient from "../QueryDb/queryDB";
import Avatar from "../components/UInterface/Avatar";
import { useNavigate } from "react-router";
import ListFavorites from "../components/UInterface/AboutComponents/ListFavorites";

export default function AccountPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Redirect se non loggato
  useEffect(() => {
    if (!session || !session.user) {
      navigate("/");
    }
  }, [session, navigate]);

  // Recupero profilo
  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabaseClient
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username || "");
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");

          if (data.avatar_url) {
            const { data: publicData } = supabaseClient
              .storage
              .from("avatars")
              .getPublicUrl(data.avatar_url);
            setAvatarUrl(publicData.publicUrl);
          }
        }
      }

      setLoading(false);
    };

    getProfile();
    return () => { ignore = true; };
  }, [session]);

  // Update profilo
  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      updated_at: new Date(),
    };

    const { error } = await supabaseClient.from("profiles").upsert(updates);

    if (error) alert(error.message);

    setLoading(false);
  };

  // Upload avatar
  const handleAvatarUpload = async (filePath) => {
    const { user } = session;

    const updates = {
      id: user.id,
      avatar_url: filePath,
      updated_at: new Date(),
    };

    const { error } = await supabaseClient.from("profiles").upsert(updates);
    if (error) alert(error.message);
    else {
      const { data: publicData } = supabaseClient
        .storage
        .from("avatars")
        .getPublicUrl(filePath);
      setAvatarUrl(publicData.publicUrl);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary p-6 md:p-12 flex flex-col items-center my-15">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <form 
        onSubmit={updateProfile} 
        className="w-full max-w-lg bg-secondary rounded-xl p-6 shadow-form flex flex-col gap-4"
      >
        <div className="flex justify-center mb-4">
          <Avatar
            url={avatarUrl}
            size={250}
            onUpload={(e, filePath) => handleAvatarUpload(filePath)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            id="email"
            type="text"
            value={session?.user.email}
            disabled
            className="input input-bordered w-full bg-primary text-primary border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">Username</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full bg-primary text-primary border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="font-semibold">First Name</label>
          <input
            id="first_name"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full bg-primary text-primary border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="font-semibold">Last Name</label>
          <input
            id="last_name"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full bg-primary text-primary border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-4 self-center w-full md:w-1/2"
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </form>

      <div className="w-full max-w-lg mt-8 flex justify-center">
        <ListFavorites />
      </div>
    </div>
  );
}
