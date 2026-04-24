// Category icons — bold, illustrative, 3D-ish duotone style
// Large 48px default, 32px viewBox — detailed and unmistakable

function CatIcon({ name, size = 48, color = "#1BA9F5" }) {
  const c = color;
  const light = `color-mix(in oklch, ${color} 40%, white)`;
  const soft = `color-mix(in oklch, ${color} 25%, white)`;
  const softer = `color-mix(in oklch, ${color} 12%, white)`;
  const deep = `color-mix(in oklch, ${color} 70%, black 20%)`;
  const deeper = `color-mix(in oklch, ${color} 50%, black 40%)`;
  const wrap = (children) => (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: "block" }}>
      {children}
    </svg>
  );

  switch (name) {
    case "plumber": // Santexnika — chrome faucet with water stream
      return wrap(
        <>
          {/* Wall pipe */}
          <rect x="4" y="8" width="3" height="16" rx="0.5" fill={deep} />
          <rect x="4" y="8" width="3" height="16" rx="0.5" fill={light} opacity="0.3" />
          {/* Horizontal spout */}
          <path d="M6 11 H20 Q23 11 23 14 V17 Q23 19 21 19 H18 V16 H20 Q21 16 21 15 V14 Q21 13 20 13 H6 Z" fill={c} />
          <path d="M6 11 H20 Q23 11 23 14 V17 Q23 19 21 19 H18 V16 H20 Q21 16 21 15 V14 Q21 13 20 13 H6 Z" fill="white" opacity="0.25" />
          {/* Handle / valve */}
          <rect x="10" y="5" width="6" height="4" rx="1" fill={deep} />
          <rect x="12" y="3" width="2" height="3" fill={deep} />
          <circle cx="13" cy="3" r="1.3" fill={c} />
          {/* Water stream */}
          <rect x="18.5" y="20" width="2" height="5" rx="1" fill="#7DD3FC" opacity="0.85" />
          {/* Droplets below */}
          <ellipse cx="19.5" cy="27" rx="2" ry="2.3" fill="#7DD3FC" />
          <circle cx="15" cy="28" r="1.2" fill="#7DD3FC" opacity="0.8" />
          <circle cx="24" cy="27" r="1" fill="#7DD3FC" opacity="0.7" />
          {/* Highlight on faucet */}
          <rect x="7" y="11.5" width="13" height="0.8" fill="white" opacity="0.6" />
        </>
      );

    case "electric": // Elektr — bold lightning with glow
      return wrap(
        <>
          {/* Glow circle */}
          <circle cx="16" cy="16" r="14" fill={soft} />
          <circle cx="16" cy="16" r="10" fill={light} opacity="0.5" />
          {/* Bolt shadow */}
          <path d="M19 3 L7 17 H13 L11 29 L25 12 H17 L20 3 Z" fill={deeper} opacity="0.25" transform="translate(0.8, 0.8)" />
          {/* Bolt */}
          <path d="M19 3 L7 17 H13 L11 29 L25 12 H17 L20 3 Z" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
          {/* Highlight */}
          <path d="M18 4 L10 15 H13 L18 4 Z" fill="white" opacity="0.4" />
        </>
      );

    case "cleaner": // Tozalash — spray bottle with mist
      return wrap(
        <>
          {/* Spray mist */}
          <circle cx="27" cy="6" r="2" fill={light} opacity="0.7" />
          <circle cx="29" cy="10" r="1.3" fill={light} opacity="0.6" />
          <circle cx="25" cy="3" r="1" fill={light} opacity="0.5" />
          {/* Trigger body */}
          <path d="M13 3 L21 3 L22 8 L13 8 Z" fill={deep} />
          {/* Nozzle */}
          <path d="M21 4 L27 4 Q28 4 28 5 L28 7 Q28 8 27 8 L22 8 Z" fill={deep} />
          <rect x="25" y="4.5" width="3" height="3" fill={deeper} />
          {/* Bottle */}
          <path d="M10 9 H22 C24 9 25.5 10.5 25.5 12.5 V26 C25.5 28 24 29.5 22 29.5 H10 C8 29.5 6.5 28 6.5 26 V12.5 C6.5 10.5 8 9 10 9 Z" fill={c} />
          <path d="M10 9 H22 C24 9 25.5 10.5 25.5 12.5 V26 C25.5 28 24 29.5 22 29.5 H10 C8 29.5 6.5 28 6.5 26 V12.5 C6.5 10.5 8 9 10 9 Z" fill={deep} opacity="0.2" />
          {/* Label */}
          <rect x="9" y="14" width="14" height="9" rx="1" fill="white" />
          {/* Label bubbles icon */}
          <circle cx="13" cy="18.5" r="1.8" fill="none" stroke={c} strokeWidth="1" />
          <circle cx="17" cy="19.5" r="1.2" fill="none" stroke={c} strokeWidth="1" />
          <circle cx="19.5" cy="17.5" r="0.9" fill="none" stroke={c} strokeWidth="1" />
          {/* Highlight */}
          <rect x="8" y="10" width="2" height="18" rx="1" fill="white" opacity="0.3" />
        </>
      );

    case "repair": // Ta'mir — crossed wrench + screwdriver, chunky
      return wrap(
        <>
          {/* Wrench */}
          <g transform="rotate(-40 16 16)">
            {/* shadow */}
            <path d="M11 4 A5.5 5.5 0 0 0 11 12 V15 L21 15 V12 A5.5 5.5 0 0 0 21 4 L19 6.5 V8.5 H13 V6.5 Z" fill={deep} opacity="0.2" transform="translate(0.5,0.5)" />
            <path d="M11 4 A5.5 5.5 0 0 0 11 12 V15 L21 15 V12 A5.5 5.5 0 0 0 21 4 L19 6.5 V8.5 H13 V6.5 Z" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
            <rect x="14" y="14" width="4" height="15" rx="0.5" fill={c} stroke={deep} strokeWidth="1.3" />
            <rect x="14.5" y="15" width="1.3" height="13" fill="white" opacity="0.4" />
          </g>
          {/* Screwdriver */}
          <g transform="rotate(45 16 16)">
            <rect x="13" y="3" width="6" height="10" rx="1" fill="#F5B700" stroke={deep} strokeWidth="1.3" />
            <rect x="13.5" y="4" width="1.5" height="8" fill="white" opacity="0.5" />
            <rect x="12.5" y="13" width="7" height="3.5" rx="0.5" fill={deep} />
            <rect x="14.5" y="16.5" width="3" height="12" fill={soft} stroke={deep} strokeWidth="1.3" />
            <polygon points="14.5,28.5 17.5,28.5 16,30" fill={deep} />
          </g>
        </>
      );

    case "moving": // Ko'chish — 3D cardboard box with tape
      return wrap(
        <>
          {/* Top lid (lighter) */}
          <path d="M3 9.5 L16 3.5 L29 9.5 L16 15.5 Z" fill={light} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Left face */}
          <path d="M3 9.5 V24 L16 30 V15.5 Z" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Right face (darker) */}
          <path d="M29 9.5 V24 L16 30 V15.5 Z" fill={deep} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Tape across top */}
          <path d="M9.5 6.5 L22.5 12.5 L22.5 9.5 L9.5 3.5 Z" fill="#E8B06B" stroke={deep} strokeWidth="1" opacity="0.9" />
          {/* Tape vertical on front */}
          <path d="M15 15.8 V30 L17 30 V15.8 Z" fill="#E8B06B" opacity="0.8" />
          {/* Label */}
          <rect x="6.5" y="19" width="6" height="4" rx="0.5" fill="white" opacity="0.85" />
          <line x1="7.5" y1="20.5" x2="11" y2="20.5" stroke={deep} strokeWidth="0.7" />
          <line x1="7.5" y1="21.8" x2="10" y2="21.8" stroke={deep} strokeWidth="0.7" />
        </>
      );

    case "ac": // Konditsioner — split unit with cold air
      return wrap(
        <>
          {/* Body with shadow */}
          <rect x="3" y="7" width="26" height="11" rx="2.5" fill={light} stroke={deep} strokeWidth="1.4" />
          {/* Top gradient strip */}
          <rect x="3" y="7" width="26" height="3.5" rx="1.5" fill={c} />
          {/* Vents */}
          <rect x="5" y="12" width="22" height="0.9" rx="0.4" fill={deep} opacity="0.4" />
          <rect x="5" y="14" width="22" height="0.9" rx="0.4" fill={deep} opacity="0.4" />
          <rect x="5" y="16" width="22" height="0.9" rx="0.4" fill={deep} opacity="0.4" />
          {/* Display dot */}
          <circle cx="25" cy="8.5" r="0.7" fill="#22C55E" />
          {/* Snowflakes */}
          <g stroke={c} strokeWidth="1.5" strokeLinecap="round">
            <line x1="10" y1="21" x2="10" y2="27" />
            <line x1="7.5" y1="22.5" x2="12.5" y2="25.5" />
            <line x1="12.5" y1="22.5" x2="7.5" y2="25.5" />
          </g>
          <g stroke={c} strokeWidth="1.5" strokeLinecap="round">
            <line x1="22" y1="21" x2="22" y2="27" />
            <line x1="19.5" y1="22.5" x2="24.5" y2="25.5" />
            <line x1="24.5" y1="22.5" x2="19.5" y2="25.5" />
          </g>
          {/* Airflow arrow middle */}
          <path d="M14 21 Q16 26 18 21" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
        </>
      );

    case "furniture": // Mebel — plush armchair, 3D
      return wrap(
        <>
          {/* Back cushion */}
          <path d="M7 13 V8.5 C7 6.5 8.5 5 10.5 5 H21.5 C23.5 5 25 6.5 25 8.5 V13 Z" fill={c} stroke={deep} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M9 12 V9 C9 8 9.5 7.5 10.5 7.5 H21.5 C22.5 7.5 23 8 23 9 V12" fill={light} opacity="0.6" />
          {/* Arms */}
          <path d="M3 14 C3 12.5 4 11.5 5.5 11.5 C7 11.5 8 12.5 8 14 V22 L3 22 Z" fill={deep} stroke={deep} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M29 14 C29 12.5 28 11.5 26.5 11.5 C25 11.5 24 12.5 24 14 V22 L29 22 Z" fill={deep} stroke={deep} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Seat */}
          <path d="M7 14 V22 H25 V14 Z" fill={c} stroke={deep} strokeWidth="1.2" />
          {/* Cushion */}
          <path d="M9 15 H23 Q24 15 24 16 V20 Q24 21 23 21 H9 Q8 21 8 20 V16 Q8 15 9 15 Z" fill={light} stroke={deep} strokeWidth="1" />
          <line x1="16" y1="16" x2="16" y2="20" stroke={deep} strokeWidth="0.7" opacity="0.5" />
          {/* Base + legs */}
          <rect x="3" y="22" width="26" height="2" fill={deep} />
          <rect x="4" y="24" width="3" height="4" rx="0.5" fill={deeper} />
          <rect x="25" y="24" width="3" height="4" rx="0.5" fill={deeper} />
        </>
      );

    case "beauty": // Go'zallik — scissors, bold
      return wrap(
        <>
          {/* Shadow */}
          <circle cx="9" cy="9" r="4.5" fill={deep} opacity="0.2" transform="translate(0.5, 0.5)" />
          <circle cx="9" cy="23" r="4.5" fill={deep} opacity="0.2" transform="translate(0.5, 0.5)" />
          {/* Blades */}
          <path d="M12 11 L29 27" stroke={deep} strokeWidth="3" strokeLinecap="round" />
          <path d="M12 11 L29 27" stroke={light} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 21 L29 5" stroke={deep} strokeWidth="3" strokeLinecap="round" />
          <path d="M12 21 L29 5" stroke={light} strokeWidth="1.2" strokeLinecap="round" />
          {/* Handles (rings) */}
          <circle cx="9" cy="9" r="4.5" fill="white" stroke={c} strokeWidth="2.8" />
          <circle cx="9" cy="23" r="4.5" fill="white" stroke={c} strokeWidth="2.8" />
          {/* Center screw */}
          <circle cx="16" cy="16" r="1.8" fill={deep} />
          <circle cx="16" cy="16" r="0.6" fill="white" />
        </>
      );

    // --- Extras for Materiallar page ---

    case "home": // Uy — house with chimney and windows
      return wrap(
        <>
          {/* Chimney */}
          <rect x="21" y="6" width="3" height="6" fill={deep} />
          <rect x="20.5" y="5.5" width="4" height="1.5" fill={deeper} />
          {/* Roof */}
          <path d="M3 15 L16 4 L29 15 L27 17 L16 8 L5 17 Z" fill={deep} stroke={deep} strokeWidth="1" strokeLinejoin="round" />
          {/* Body */}
          <path d="M5 16 H27 V28 H5 Z" fill={light} stroke={deep} strokeWidth="1.2" />
          {/* Door */}
          <path d="M13 19 H19 V28 H13 Z" fill={c} stroke={deep} strokeWidth="1" />
          <circle cx="17.5" cy="24" r="0.7" fill="#F5B700" />
          {/* Windows */}
          <rect x="7" y="18" width="4.5" height="4.5" rx="0.5" fill="white" stroke={deep} strokeWidth="1" />
          <line x1="9.25" y1="18" x2="9.25" y2="22.5" stroke={deep} strokeWidth="0.7" />
          <line x1="7" y1="20.25" x2="11.5" y2="20.25" stroke={deep} strokeWidth="0.7" />
          <rect x="20.5" y="18" width="4.5" height="4.5" rx="0.5" fill="white" stroke={deep} strokeWidth="1" />
          <line x1="22.75" y1="18" x2="22.75" y2="22.5" stroke={deep} strokeWidth="0.7" />
          <line x1="20.5" y1="20.25" x2="25" y2="20.25" stroke={deep} strokeWidth="0.7" />
        </>
      );

    case "appliance": // Maishiy texnika — washing machine, bold
      return wrap(
        <>
          <rect x="4" y="3" width="24" height="26" rx="2.5" fill={softer} stroke={deep} strokeWidth="1.5" />
          {/* Top panel */}
          <rect x="4" y="3" width="24" height="6" rx="1" fill={c} />
          <circle cx="8.5" cy="6" r="1" fill="white" />
          <rect x="13" y="5" width="11" height="2" rx="1" fill="white" opacity="0.8" />
          {/* Drum bezel */}
          <circle cx="16" cy="19" r="8" fill={light} stroke={deep} strokeWidth="1.5" />
          <circle cx="16" cy="19" r="7" fill="white" stroke={deep} strokeWidth="1" />
          {/* Glass + water */}
          <circle cx="16" cy="19" r="5.5" fill={c} opacity="0.3" />
          <path d="M10.5 19 Q13 18 16 19 T21.5 19" stroke={c} strokeWidth="1.3" fill="none" />
          <path d="M10.5 21 Q13 20 16 21 T21.5 21" stroke={c} strokeWidth="1.3" fill="none" opacity="0.7" />
          {/* Center */}
          <circle cx="16" cy="19" r="1.4" fill={deep} />
          {/* Glass highlight */}
          <path d="M11 16 Q13 13 16 13" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </>
      );

    case "gadget": // Elektron texnika — smartphone with screen
      return wrap(
        <>
          {/* Shadow */}
          <rect x="8.5" y="3" width="15" height="27" rx="3" fill={deeper} opacity="0.3" transform="translate(0.5,0.5)" />
          {/* Body */}
          <rect x="8" y="2" width="16" height="28" rx="3" fill={deep} />
          {/* Screen */}
          <rect x="9.5" y="5.5" width="13" height="21" rx="1" fill={c} />
          {/* Status bar */}
          <rect x="9.5" y="5.5" width="13" height="2" rx="1" fill="white" opacity="0.2" />
          {/* Speaker */}
          <rect x="13.5" y="3.5" width="5" height="1.2" rx="0.6" fill={softer} />
          {/* Home button */}
          <circle cx="16" cy="28" r="1.2" fill={softer} />
          {/* Screen icons grid */}
          <rect x="11" y="9" width="3" height="3" rx="0.7" fill="white" opacity="0.9" />
          <rect x="15" y="9" width="3" height="3" rx="0.7" fill="white" opacity="0.7" />
          <rect x="19" y="9" width="2.5" height="3" rx="0.7" fill="white" opacity="0.9" />
          <rect x="11" y="13" width="3" height="3" rx="0.7" fill="white" opacity="0.7" />
          <rect x="15" y="13" width="3" height="3" rx="0.7" fill="white" opacity="0.9" />
          <rect x="19" y="13" width="2.5" height="3" rx="0.7" fill="white" opacity="0.7" />
          <rect x="11" y="20" width="10.5" height="4.5" rx="1" fill="white" opacity="0.85" />
        </>
      );

    case "transport": // Transport — car, bold 3/4 view
      return wrap(
        <>
          {/* Shadow */}
          <ellipse cx="16" cy="27" rx="13" ry="1.5" fill="black" opacity="0.15" />
          {/* Cabin */}
          <path d="M9 14 L11 8 Q11.5 6.5 13 6.5 H19 Q20.5 6.5 21 8 L23 14 Z" fill={light} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Window split */}
          <line x1="16" y1="7" x2="16" y2="14" stroke={deep} strokeWidth="0.8" />
          {/* Body */}
          <path d="M3 20 L5 14 Q6 13 7.5 13 H24.5 Q26 13 27 14 L29 20 V24 Q29 25 28 25 H4 Q3 25 3 24 Z" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Highlight */}
          <path d="M5 17 L7 15 H25 L27 17" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
          {/* Wheels */}
          <circle cx="9" cy="25" r="3.2" fill={deeper} stroke={deep} strokeWidth="1" />
          <circle cx="9" cy="25" r="1.3" fill={softer} />
          <circle cx="23" cy="25" r="3.2" fill={deeper} stroke={deep} strokeWidth="1" />
          <circle cx="23" cy="25" r="1.3" fill={softer} />
          {/* Headlight + tail */}
          <rect x="3" y="18" width="2.5" height="2" rx="0.5" fill="#FFE066" />
          <rect x="26.5" y="18" width="2.5" height="2" rx="0.5" fill="#EF4444" />
          {/* Door handle hint */}
          <rect x="12" y="18" width="4" height="0.8" rx="0.4" fill={deep} opacity="0.4" />
        </>
      );

    case "garden": // Bog' — potted plant with leaves
      return wrap(
        <>
          {/* Leaves */}
          <path d="M16 17 C10 17 7 13 7 7 C13 7 16 11 16 17 Z" fill={c} stroke={deep} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M16 17 C16 11 18 7 24 6 C25 11 22 16 16 17 Z" fill={light} stroke={deep} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M16 17 C14 13 14 9 16 5 C18 9 18 13 16 17 Z" fill={deep} />
          {/* Veins */}
          <path d="M16 17 C15 13 12 11 9 9" stroke={deep} strokeWidth="0.7" fill="none" />
          <path d="M16 17 C17 13 20 11 22 9" stroke={deep} strokeWidth="0.7" fill="none" />
          {/* Pot */}
          <path d="M7 20 H25 L23 29 H9 Z" fill="#B86B3E" stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          <rect x="6" y="19" width="20" height="2.5" rx="0.5" fill="#D4854B" stroke={deep} strokeWidth="1.2" />
          {/* Soil hint */}
          <ellipse cx="16" cy="20" rx="7" ry="0.6" fill={deeper} opacity="0.5" />
        </>
      );

    case "education": // Ta'lim — graduation cap with tassel
      return wrap(
        <>
          {/* Shadow */}
          <ellipse cx="16" cy="25.5" rx="9" ry="1" fill="black" opacity="0.12" />
          {/* Crown cap */}
          <path d="M2 13 L16 6 L30 13 L16 20 Z" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M2 13 L16 6 L30 13" fill={light} opacity="0.6" />
          {/* Band */}
          <path d="M8 17 V23 Q8 25 16 25 Q24 25 24 23 V17" fill={c} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 17 V19 Q8 20 16 20 Q24 20 24 19 V17" fill={deep} opacity="0.3" />
          {/* Tassel cord */}
          <path d="M30 13 V21" stroke={deep} strokeWidth="1.3" strokeLinecap="round" />
          {/* Tassel bead */}
          <circle cx="30" cy="22" r="1.5" fill="#F5B700" stroke={deep} strokeWidth="1" />
          {/* Tassel fringe */}
          <path d="M28.5 23 L28 26 M30 23.5 L30 26 M31.5 23 L32 26" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
          {/* Button on top */}
          <circle cx="16" cy="13" r="0.8" fill={deep} />
        </>
      );

    case "it": // IT — laptop with code on screen
      return wrap(
        <>
          {/* Screen bezel */}
          <rect x="4" y="5" width="24" height="16" rx="2" fill={deep} />
          {/* Screen */}
          <rect x="5.5" y="6.5" width="21" height="13" fill={c} />
          <rect x="5.5" y="6.5" width="21" height="1.5" fill="white" opacity="0.2" />
          {/* Code brackets */}
          <path d="M11 11 L8.5 13.5 L11 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 11 L23.5 13.5 L21 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 17 L18 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          {/* Base */}
          <path d="M1 22 H31 L29 27 H3 Z" fill={light} stroke={deep} strokeWidth="1.3" strokeLinejoin="round" />
          {/* Trackpad slot */}
          <rect x="12" y="23.5" width="8" height="1.3" rx="0.6" fill={deep} />
          {/* Dock reflection */}
          <rect x="4" y="22" width="24" height="0.8" fill={deep} opacity="0.5" />
        </>
      );

    case "security": // Xavfsizlik — shield with check and shine
      return wrap(
        <>
          {/* Shadow */}
          <path d="M16 4 L27 7 V16 C27 22 22 27 16 30 C10 27 5 22 5 16 V7 Z" fill={deeper} opacity="0.3" transform="translate(0.5,0.7)" />
          {/* Shield */}
          <path d="M16 3 L27 6 V15 C27 21 22 26 16 29 C10 26 5 21 5 15 V6 Z" fill={c} stroke={deep} strokeWidth="1.4" strokeLinejoin="round" />
          {/* Highlight left */}
          <path d="M16 3 L5 6 V15 C5 21 10 26 16 29 V3 Z" fill={light} opacity="0.3" />
          {/* Inner border */}
          <path d="M16 6 L24 8 V15 C24 19.5 20 23.5 16 26 C12 23.5 8 19.5 8 15 V8 Z" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
          {/* Check */}
          <path d="M10 16 L14.5 20.5 L22 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );

    default:
      return wrap(<circle cx="16" cy="16" r="10" fill={c} />);
  }
}

Object.assign(window, { CatIcon });
