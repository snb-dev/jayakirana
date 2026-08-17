interface LogoProps {
  dark?: boolean;
  className?: string;
}

/**
 * Jayakirana wordmark with an industrial wrench + gear icon.
 * `dark` flips the wordmark to white for use on dark backgrounds.
 */
export default function Logo({ dark = false, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-orange shadow-sm">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
          {/* gear */}
          <path
            d="M16 4.2l1.5 2.1 2.5-.7.4 2.6 2.6.4-.7 2.5 2.1 1.5-2.1 1.5.7 2.5-2.6.4-.4 2.6-2.5-.7L16 27.8l-1.5-2.1-2.5.7-.4-2.6-2.6-.4.7-2.5L7.6 19l2.1-1.5-.7-2.5 2.6-.4.4-2.6 2.5.7L16 4.2z"
            fill="white"
            opacity="0.92"
          />
          <circle cx="16" cy="16" r="4.2" fill="#F97316" stroke="white" strokeWidth="1.4" />
          {/* wrench */}
          <path
            d="M19.4 11.2a2.4 2.4 0 0 0-2.9 3.1l-3.2 3.2a.9.9 0 1 0 1.3 1.3l3.2-3.2a2.4 2.4 0 0 0 3.1-2.9l-1.4 1.4-1.1-.3-.3-1.1 1.3-1.5z"
            fill="white"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brand-dark'}`}
        >
          JAYAKIRANA
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
          Pvt. Ltd.
        </span>
      </span>
    </div>
  );
}
