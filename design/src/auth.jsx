// Shared screens: onboarding role pick, phone entry, OTP verify

function OnboardingScreen({ lang, onPick, step = 1, totalSteps = 3 }) {
  const t = (k) => T[k][lang];
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--uddala-surface)",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      {/* progress */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 20px 24px",
        }}
      >
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                background:
                  i <= step
                    ? "var(--uddala-primary)"
                    : "var(--uddala-border)",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--uddala-text-muted)",
          }}
        >
          {step} / {totalSteps}
        </span>
      </div>

      <div style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Logo size={76} />
          <div
            style={{
              marginTop: 14,
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -0.8,
              color: "var(--uddala-text)",
            }}
          >
            Uddala
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              color: "var(--uddala-text-muted)",
              textAlign: "center",
              maxWidth: 260,
              lineHeight: 1.4,
            }}
          >
            {t("tagline")}
          </div>
        </div>

        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
          <RolePickCard
            role="customer"
            title={t("needService")}
            subtitle={t("needServiceSub")}
            onClick={() => onPick("customer")}
          />
          <RolePickCard
            role="worker"
            title={t("needJob")}
            subtitle={t("needJobSub")}
            onClick={() => onPick("worker")}
          />
        </div>
      </div>

      <div
        style={{
          padding: "16px 24px 30px",
          textAlign: "center",
          fontSize: 12,
          color: "var(--uddala-text-soft)",
          lineHeight: 1.5,
        }}
      >
        Davom etish bilan{" "}
        <span style={{ color: "var(--uddala-primary)", fontWeight: 600 }}>
          Foydalanish shartlari
        </span>
        ga rozilik bildirasiz
      </div>
    </div>
  );
}

function CustomerRoleIcon() {
  // Glossy blue magnifier — matches reference illustration
  const id = React.useId().replace(/[:]/g, "");
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ display: "block" }}>
      <defs>
        <radialGradient id={`mg-lens-${id}`} cx="0.35" cy="0.32" r="0.75">
          <stop offset="0%" stopColor="#BEE6FF" />
          <stop offset="55%" stopColor="#3FA9E0" />
          <stop offset="100%" stopColor="#1E6FA8" />
        </radialGradient>
        <linearGradient id={`mg-rim-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CC8F0" />
          <stop offset="100%" stopColor="#1B5E8C" />
        </linearGradient>
        <linearGradient id={`mg-handle-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8975A" />
          <stop offset="100%" stopColor="#7B4E22" />
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="36" cy="63" rx="18" ry="2.2" fill="black" opacity="0.12" />
      {/* handle */}
      <rect
        x="43"
        y="39"
        width="7"
        height="22"
        rx="3"
        fill={`url(#mg-handle-${id})`}
        transform="rotate(-42 46.5 50)"
      />
      {/* rim */}
      <circle cx="28" cy="28" r="20" fill={`url(#mg-rim-${id})`} />
      {/* lens */}
      <circle cx="28" cy="28" r="15.5" fill={`url(#mg-lens-${id})`} />
      {/* highlight */}
      <path
        d="M17 22 Q22 15 30 15"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <circle cx="21.5" cy="21.5" r="1.6" fill="white" opacity="0.85" />
    </svg>
  );
}

function WorkerRoleIcon() {
  // Leather briefcase — matches reference illustration
  const id = React.useId().replace(/[:]/g, "");
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`bc-body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C28757" />
          <stop offset="55%" stopColor="#9B5E2C" />
          <stop offset="100%" stopColor="#6C3C14" />
        </linearGradient>
        <linearGradient id={`bc-top-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8A371" />
          <stop offset="100%" stopColor="#A86D38" />
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="36" cy="62" rx="22" ry="2.4" fill="black" opacity="0.13" />
      {/* handle */}
      <path
        d="M26 22 Q26 13 36 13 Q46 13 46 22"
        stroke="#7B4E22"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26 22 Q26 13 36 13 Q46 13 46 22"
        stroke="#C28757"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* body */}
      <rect x="10" y="22" width="52" height="34" rx="4" fill={`url(#bc-body-${id})`} />
      {/* top flap (darker strip) */}
      <rect x="10" y="22" width="52" height="7" rx="3" fill={`url(#bc-top-${id})`} />
      {/* horizontal seam */}
      <line x1="10" y1="36" x2="62" y2="36" stroke="#5C3212" strokeWidth="1" opacity="0.6" />
      {/* clasp */}
      <rect x="32.5" y="32.5" width="7" height="7" rx="1.2" fill="#E4B87A" stroke="#5C3212" strokeWidth="0.8" />
      <rect x="34.3" y="35" width="3.4" height="1.2" rx="0.4" fill="#5C3212" />
      {/* top stitching */}
      <line x1="14" y1="25" x2="58" y2="25" stroke="#4A2A0A" strokeWidth="0.5" strokeDasharray="1.2 1.2" opacity="0.5" />
      {/* highlight on body */}
      <rect x="10" y="29" width="52" height="1.2" fill="white" opacity="0.18" />
    </svg>
  );
}

function RolePickCard({ role, title, subtitle, onClick }) {
  const isCustomer = role === "customer";
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "26px 18px 22px",
        borderRadius: 22,
        background: "var(--uddala-surface-2)",
        border: "1.5px solid transparent",
        cursor: "pointer",
        textAlign: "center",
        fontFamily: "Manrope, system-ui, sans-serif",
        transition: "transform .1s ease, border-color .15s ease, background .15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--uddala-primary)";
        e.currentTarget.style.background = "var(--uddala-surface)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.background = "var(--uddala-surface-2)";
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isCustomer ? <CustomerRoleIcon /> : <WorkerRoleIcon />}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--uddala-text)",
          letterSpacing: -0.2,
        }}
      >
        {title}
      </div>
    </button>
  );
}

function PhoneScreen({ lang, phone, onChange, onNext, onBack }) {
  const t = (k) => T[k][lang];
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--uddala-surface)",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 24px" }}>
        <button
          onClick={onBack}
          style={{
            width: 36,
            height: 36,
            border: "none",
            borderRadius: 10,
            background: "var(--uddala-surface-2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="arrow-left" size={18} color="var(--uddala-text)" />
        </button>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                background:
                  i <= 2 ? "var(--uddala-primary)" : "var(--uddala-border)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--uddala-text-muted)" }}>
          2 / 3
        </span>
      </div>

      <div style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Logo size={64} />
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: -0.5,
            color: "var(--uddala-text)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {t("phoneTitle")}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "var(--uddala-text-muted)",
            textAlign: "center",
            maxWidth: 280,
            lineHeight: 1.5,
          }}
        >
          {t("phoneSub")}
        </div>

        <div style={{ width: "100%", marginTop: 36 }}>
          <Input
            value={phone}
            onChange={onChange}
            placeholder="99 299 39 39"
            prefix={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* UZ flag */}
                <div
                  style={{
                    width: 26,
                    height: 18,
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1, background: "#1BA9F5" }} />
                  <div style={{ flex: 1, background: "#fff", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }} />
                  <div style={{ flex: 1, background: "#16B378" }} />
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--uddala-text-muted)",
                    fontSize: 15,
                  }}
                >
                  +998
                </span>
                <div
                  style={{
                    width: 1,
                    height: 20,
                    background: "var(--uddala-border)",
                  }}
                />
              </div>
            }
          />
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ width: "100%", paddingBottom: 30 }}>
          <Button
            block
            size="lg"
            trailingIcon="arrow-right"
            onClick={onNext}
            disabled={phone.length < 9}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function OtpScreen({ lang, phone, code, onChange, onVerify, onBack }) {
  const t = (k) => T[k][lang];
  const digits = (code + "    ").slice(0, 4).split("");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--uddala-surface)",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 24px" }}>
        <button
          onClick={onBack}
          style={{
            width: 36,
            height: 36,
            border: "none",
            borderRadius: 10,
            background: "var(--uddala-surface-2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="arrow-left" size={18} color="var(--uddala-text)" />
        </button>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                background: "var(--uddala-primary)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--uddala-text-muted)" }}>
          3 / 3
        </span>
      </div>

      <div
        style={{
          flex: 1,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo size={64} />
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: -0.5,
          }}
        >
          {t("otpTitle")}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "var(--uddala-text-muted)",
            textAlign: "center",
            maxWidth: 280,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "var(--uddala-text)", fontWeight: 700 }}>
            +998 {phone || "99 299 39 39"}
          </span>{" "}
          {t("otpSub")}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {digits.map((d, i) => (
            <div
              key={i}
              style={{
                width: 58,
                height: 66,
                borderRadius: 14,
                border:
                  d.trim()
                    ? "1.5px solid var(--uddala-primary)"
                    : "1.5px solid var(--uddala-border)",
                background:
                  d.trim() ? "var(--uddala-primary-soft)" : "var(--uddala-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--uddala-text)",
              }}
            >
              {d.trim()}
            </div>
          ))}
        </div>

        <button
          onClick={() => onChange("1337")}
          style={{
            marginTop: 24,
            background: "transparent",
            border: "none",
            color: "var(--uddala-primary)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "Manrope, system-ui, sans-serif",
          }}
        >
          {t("resend")} · 0:42
        </button>

        <div style={{ flex: 1 }} />
        <div style={{ width: "100%", paddingBottom: 30 }}>
          <Button
            block
            size="lg"
            trailingIcon="arrow-right"
            onClick={onVerify}
            disabled={code.length < 4}
          >
            {t("confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen, PhoneScreen, OtpScreen });
