// Shared UI primitives for Uddala — logo, icons, buttons, inputs, placeholder

function Logo({ size = 56, dark = false }) {
  return (
    <img
      src="assets/logo-mark.png"
      alt="Uddala"
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size, objectFit: "contain" }}
    />
  );
}

function Wordmark({ size = 22, dark = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Logo size={size * 1.6} dark={dark} />
      <span
        style={{
          fontWeight: 800,
          fontSize: size,
          letterSpacing: -0.5,
          color: dark ? "var(--uddala-text)" : "var(--uddala-text)",
          fontFamily: "Manrope, system-ui, sans-serif",
        }}
      >
        Uddala
      </span>
    </div>
  );
}

// Inline icon set — simple line icons, 24px default
function Icon({ name, size = 22, color = "currentColor", stroke = 1.8 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 10a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "home":
      return (
        <svg {...p}>
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...p}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </svg>
      );
    case "message":
      return (
        <svg {...p}>
          <path d="M21 12a8 8 0 1 1-3.5-6.6L21 5l-1 3.5A8 8 0 0 1 21 12Z" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...p}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...p}>
          <path d="M19 12H5M11 5l-7 7 7 7" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...p}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "star":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M12 2l3 6.5 7 1-5 5 1.2 7-6.2-3.3L5.8 21.5 7 14.5l-5-5 7-1z" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...p}>
          <path d="M12 22s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <path d="M4 8h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "filter":
      return (
        <svg {...p}>
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      );
    case "coin":
      return (
        <svg {...p} fill={color} stroke="none">
          <circle cx="12" cy="12" r="9" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="#fff"
            fontFamily="Manrope, system-ui"
          >
            T
          </text>
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M21.5 4.5 2.5 11.8c-1 .4-1 1.8 0 2.1l4.7 1.5 1.8 5.7c.3.9 1.4 1.1 2 .4l2.6-2.8 4.9 3.6c.8.6 2 .2 2.3-.9l3.5-14.5c.3-1.3-1-2.4-2.8-1.4z" />
        </svg>
      );
    case "send":
      return (
        <svg {...p}>
          <path d="M22 2 11 13" />
          <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      );
    case "x":
      return (
        <svg {...p}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "menu":
      return (
        <svg {...p}>
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      );
    default:
      return null;
  }
}

function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  icon,
  trailingIcon,
  disabled,
  onClick,
}) {
  const sizes = {
    sm: { h: 38, px: 14, fs: 14 },
    md: { h: 48, px: 18, fs: 15 },
    lg: { h: 56, px: 22, fs: 16 },
  };
  const s = sizes[size];
  const styles = {
    primary: {
      background: disabled ? "var(--uddala-primary-soft)" : "var(--uddala-primary)",
      color: "#fff",
      border: "none",
      boxShadow: disabled
        ? "none"
        : "0 1px 0 rgba(255,255,255,0.3) inset, 0 8px 20px -8px var(--uddala-primary)",
    },
    secondary: {
      background: "var(--uddala-surface-2)",
      color: "var(--uddala-text)",
      border: "1px solid var(--uddala-border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--uddala-text)",
      border: "none",
    },
    danger: {
      background: "#EF4444",
      color: "#fff",
      border: "none",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: s.h,
        padding: `0 ${s.px}px`,
        fontSize: s.fs,
        fontWeight: 700,
        borderRadius: 14,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        width: block ? "100%" : "auto",
        letterSpacing: -0.2,
        fontFamily: "Manrope, system-ui, sans-serif",
        transition: "transform .08s ease, opacity .15s ease",
        ...styles[variant],
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={18} />}
    </button>
  );
}

function Input({ value, onChange, placeholder, prefix, suffix, type = "text", autoFocus }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 52,
        padding: "0 14px",
        background: "var(--uddala-surface-2)",
        border: "1px solid var(--uddala-border)",
        borderRadius: 14,
      }}
    >
      {prefix}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 15,
          color: "var(--uddala-text)",
          fontFamily: "Manrope, system-ui, sans-serif",
          fontWeight: 500,
        }}
      />
      {suffix}
    </div>
  );
}

function Chip({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 34,
        padding: "0 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        border: active
          ? "1px solid var(--uddala-primary)"
          : "1px solid var(--uddala-border)",
        background: active ? "var(--uddala-primary-soft)" : "var(--uddala-surface)",
        color: active ? "var(--uddala-primary-dark)" : "var(--uddala-text-muted)",
        cursor: "pointer",
        fontFamily: "Manrope, system-ui, sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </button>
  );
}

// Striped placeholder block — our stand-in for real imagery
function Placeholder({ label, height = 160, radius = 14, tone = "neutral" }) {
  const toneBg =
    tone === "primary"
      ? "var(--uddala-primary-soft)"
      : tone === "warm"
      ? "#FFF4E0"
      : "var(--uddala-surface-2)";
  const toneFg =
    tone === "primary"
      ? "var(--uddala-primary-dark)"
      : tone === "warm"
      ? "#A66A00"
      : "var(--uddala-text-muted)";
  return (
    <div
      style={{
        height,
        borderRadius: radius,
        background: `repeating-linear-gradient(135deg, ${toneBg} 0 10px, color-mix(in oklch, ${toneBg} 80%, white) 10px 20px)`,
        border: "1px dashed var(--uddala-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: toneFg,
        fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 11,
        letterSpacing: 0.3,
        textAlign: "center",
        padding: "0 12px",
      }}
    >
      {label}
    </div>
  );
}

function Badge({ children, tone = "neutral" }) {
  const map = {
    neutral: { bg: "var(--uddala-surface-2)", fg: "var(--uddala-text-muted)" },
    primary: { bg: "var(--uddala-primary-soft)", fg: "var(--uddala-primary-dark)" },
    success: { bg: "#E7F7F0", fg: "#0E8E5C" },
    warn: { bg: "#FFF4E0", fg: "#A66A00" },
    danger: { bg: "#FFE6E6", fg: "#C11515" },
  };
  const m = map[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 700,
        padding: "4px 8px",
        borderRadius: 999,
        background: m.bg,
        color: m.fg,
        fontFamily: "Manrope, system-ui, sans-serif",
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}

// Small avatar with initials; monogram-style
function Avatar({ name = "UA", size = 42, color = "#1BA9F5" }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background: `color-mix(in oklch, ${color} 15%, white)`,
        color: color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.36,
        fontFamily: "Manrope, system-ui, sans-serif",
        letterSpacing: -0.2,
        border: `1px solid color-mix(in oklch, ${color} 25%, white)`,
      }}
    >
      {initials}
    </div>
  );
}

// Star rating (compact)
function Stars({ value = 4.8, size = 13, showValue = true }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <Icon name="star" size={size} color="#F5B700" />
      {showValue && (
        <span
          style={{
            fontWeight: 700,
            fontSize: size,
            color: "var(--uddala-text)",
          }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}

// Tanga pill — shows coin count
function TangaPill({ count = 12, size = "md" }) {
  const h = size === "sm" ? 26 : 32;
  const fs = size === "sm" ? 12 : 14;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: h,
        padding: "0 10px 0 4px",
        borderRadius: 999,
        background:
          "linear-gradient(180deg, #FFF6DE 0%, #FFE89E 100%)",
        color: "#8A5A00",
        fontWeight: 800,
        fontSize: fs,
        fontFamily: "Manrope, system-ui, sans-serif",
        border: "1px solid #F5D17B",
      }}
    >
      <span
        style={{
          width: h - 8,
          height: h - 8,
          borderRadius: 999,
          background:
            "radial-gradient(circle at 30% 30%, #FFE68A 0%, #E6A900 100%)",
          color: "#6B3F00",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fs - 2,
          fontWeight: 900,
          border: "1px solid #C98A00",
        }}
      >
        T
      </span>
      {count}
    </span>
  );
}

Object.assign(window, {
  Logo,
  Wordmark,
  Icon,
  Button,
  Input,
  Chip,
  Placeholder,
  Badge,
  Avatar,
  Stars,
  TangaPill,
});
