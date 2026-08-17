import { useState } from 'react';

export default function WhatsAppFloat() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="https://wa.me/94771095633"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span
        className={`pointer-events-none whitespace-nowrap rounded-lg bg-brand-dark px-3 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 ${
          hover ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
        }`}
      >
        Chat with us on WhatsApp
      </span>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110">
        <svg viewBox="0 0 32 32" className="h-8 w-8" fill="white" aria-hidden="true">
          <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 1.95.51 3.86 1.48 5.54L4.9 27l6.57-1.72a11.02 11.02 0 0 0 4.57.99h.01c6.11 0 11.06-4.95 11.06-11.06C27.1 8.95 22.15 4 16.04 4zm0 20.2h-.01c-1.45 0-2.87-.39-4.11-1.12l-.29-.17-3.9 1.02 1.04-3.8-.19-.3a9.16 9.16 0 0 1-1.4-4.87c0-5.07 4.13-9.2 9.21-9.2 2.46 0 4.77.96 6.51 2.7a9.14 9.14 0 0 1 2.69 6.51c0 5.08-4.13 9.2-9.25 9.2zm5.05-6.89c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.17.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48-.16-.01-.35-.01-.53-.01-.18 0-.49.07-.74.35-.25.28-.97.95-.97 2.31s1 2.68 1.14 2.86c.14.18 1.96 3 4.75 4.21.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
        </svg>
      </span>
    </a>
  );
}
