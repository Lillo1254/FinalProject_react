import RealtimeChat from "./AboutComponents/RealtimeChat";
import ChatForm from "./forms/ChatForm";

export default function Modal({ data }) {
  return (
    <div translate="no">
      <button
        className="btn w-20 bg-accent text-primary hover:bg-support transition-all duration-300"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>

      <dialog id="my_modal_3" className="modal">
        <div
          className="
            modal-box
            fixed bottom-0 md:top-0 right-0 
            w-full h-[90vh] md:w-[50vw] md:h-[90vh] 
            rounded-xl md:rounded-l-3xl shadow-form
            flex flex-col bg-secondary text-primary
          "
        >
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-accent hover:text-support hover:scale-150 transition-all duration-200">
              ✕
            </button>
          </form>

          <h4 className="px-6 py-3 border-b border-primary text-xl font-semibold text-accent">
            Gamers Chat
          </h4>

          <div className="flex-1 px-4 py-3 overflow-y-auto">
            <RealtimeChat data={data} />
          </div>

          <div className="px-4 py-3 border-t border-primary">
            <ChatForm data={data} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
