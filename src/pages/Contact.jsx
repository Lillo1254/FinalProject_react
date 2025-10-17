import emailjs from "emailjs-com";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef();
  const [send, setSend] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    handleClick();

    emailjs
      .sendForm(
        "service_tf0if7c",      
        "template_am5decl",     
        formRef.current,
        "yJSEkdniZ9LHFF_Qt"    
      )
      .then(
        () => {
          alert("Messaggio inviato con successo!");
          formRef.current.reset();
        },
        (error) => {
          alert("Errore durante l’invio: " + error.text);
        }
      );
  };


  const handleClick = () => {
    setSend(true); 


    setTimeout(() => {
      setSend(false);
    }, 1500);
 
  };
  
      useEffect(() => {
      window.scrollTo(0, 0); 
    }, []);


  return (
<div translate="no">
    <section className="bg-primary text-primary min-h-screen flex flex-col items-center justify-center px-6 py-25">
      <div className="max-w-2xl w-full text-center card-surface shadow-form p-10 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-accent">Contattami</h1>
        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4 text-left">
          <div>
            <label htmlFor="name" className="block mb-1 text-support font-medium">Nome</label>
            <input id="name" name="name" type="text" required className="w-full p-2 rounded-md bg-secondary border border-purple-500 text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300 " />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-support font-medium">Email</label>
            <input id="email" name="email" type="email" required className="w-full p-2 rounded-md bg-secondary border border-purple-500 text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300" />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-support font-medium">Messaggio</label>
            <textarea id="message" name="message" rows="5" required className="w-full p-2 rounded-md bg-secondary border border-purple-500 text-primary focus:outline-none focus:shadow-[0_0_10px_5px_rgba(241,91,181,0.8)] transition-shadow duration-300 resize-none"></textarea>
          </div>

          <button id="btn1" type="submit" className="btn-primary rounded-md py-2 font-semibold shadow-form hover:shadow-detail transition-all duration-300 mt-2" disabled={send}>
           {send ? "Invio in corso..." : "Invia"}
          </button>
        </form>
      </div>
    <article className="text-center mt-4">
        <small className="text-xs text-gray-400 ">Il form è funzionante con l'utilizzo di EmailJs per l'invio di messaggi</small>
    </article>
    </section>
    </div>
  );
}