type UkWindFlagProps = {
  className?: string;
  label?: string;
};

export function UkFlagJumpingTitle({ text = "United Kingdom" }: { text?: string }) {
  return (
    <span className="a2030-title-letters inline-flex flex-wrap items-end" aria-label={text}>
      <span className="a2030-title-word inline-flex items-end">
        {text.split("").map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="a2030-title a2030-title-breathe a2030-title-letter uk-flag-title-letter inline-block"
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}

export function UkWindFlag({ className = "", label = "United Kingdom flag" }: UkWindFlagProps) {
  return (
    <span className={`uk-wind-flag ${className}`} role="img" aria-label={label}>
      <span className="uk-wind-flag-pole" aria-hidden="true">
        <span className="uk-wind-flag-finial" />
        <span className="uk-wind-flag-shaft" />
      </span>
      <span className="uk-wind-flag-fabric-wrap" aria-hidden="true">
        <svg className="uk-wind-flag-fabric" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="7" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3.5" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="11" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6.5" />
        </svg>
      </span>
    </span>
  );
}
