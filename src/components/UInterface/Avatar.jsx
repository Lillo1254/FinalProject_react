import { useEffect, useState } from "react";
import supabaseClient from "../../QueryDb/queryDB";
import { useAuth } from "../contexts/AuthContext";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { refreshProfile, session } = useAuth();

  // 🔹 Se arriva un URL (o un path), aggiorna l’immagine
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  // 🔧 Funzione per scaricare o impostare l’immagine
  const downloadImage = async (path) => {
    try {
      // ✅ Se è già un URL pubblico, non scaricare di nuovo
      if (path.startsWith("http")) {
        setAvatarUrl(path);
        return;
      }

      const { data, error } = await supabaseClient.storage
        .from("avatars")
        .download(path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image:", error.message);
    }
  };

  // 📤 Upload nuova immagine profilo
  const uploadAvatar = async (e) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw Error("You must select an image to upload");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${session.user.id}_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 🔹 Upload su Supabase Storage
      const { error: uploadError } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 🔹 Ottieni URL pubblico
      const { data: urlData } = supabaseClient.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // 🔹 Aggiorna preview locale
      setAvatarUrl(publicUrl);
      onUpload(e, filePath);

      // 🔹 Aggiorna record del profilo nel DB
      const { error: updateError } = await supabaseClient
        .from("profiles")
        .update({ avatar_url: filePath })
        .eq("id", session.user.id);

      if (updateError) {
        console.error("Errore aggiornamento profilo:", updateError.message);
      } else {
        await refreshProfile(); // 🔹 aggiorna dati nel contesto globale
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      {avatarUrl ? (
        <img
          className="avatar image"
          src={avatarUrl}
          alt="User avatar"
          style={{ height: size, width: size, borderRadius: "50%", objectFit: "contain" }}
        />
      ) : (
        <div
          className="avatar no-image bg-gray-300"
          style={{ height: size, width: size, borderRadius: "50%" , objectFit: "contain" }}
        />
      )}

      <div className="mt-4">
        <label htmlFor="single" className="btn btn-custom">
          {uploading ? "Uploading..." : "Update image"}
        </label>
        <input
          id="single"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
