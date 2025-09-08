export const SeigaihaPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-5"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern
        id="seigaiha"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0,10 Q5,5 10,10 Q15,15 20,10"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M0,15 Q5,10 10,15 Q15,20 20,15"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#seigaiha)" />
  </svg>
);
