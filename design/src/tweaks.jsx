// Tweaks panel — floating control, posts to parent to persist.

function TweaksPanel({ open, onClose, settings, setSettings }) {
  if (!open) return null;
  const update = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
    } catch (e) {}
  };
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        width: 300,
        maxHeight: "80vh",
        overflow: "auto",
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25)",
        zIndex: 9999,
        fontFamily: "Manrope, system-ui, sans-serif",
        padding: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 800 }}>Tweaks</div>
        <button
          onClick={onClose}
          style={{ border: "none", background: "transparent", cursor: "pointer", color: "#6b7280" }}
        >
          ✕
        </button>
      </div>

      <TweakSection label="Rang palette">
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(PALETTES).map(([k, p]) => (
            <button
              key={k}
              onClick={() => update({ palette: k })}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: 10,
                border: settings.palette === k ? `2px solid ${p.primary}` : "1px solid #E2E8F0",
                background: settings.palette === k ? `color-mix(in oklch, ${p.primary} 8%, white)` : "#fff",
                cursor: "pointer",
                fontFamily: "Manrope, system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: p.primary,
                  margin: "0 auto 4px",
                }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </TweakSection>

      <TweakSection label="Til">
        <div style={{ display: "flex", gap: 6 }}>
          {Object.entries(LANGS).map(([k, n]) => (
            <button
              key={k}
              onClick={() => update({ lang: k })}
              style={{
                flex: 1,
                height: 32,
                borderRadius: 8,
                border: settings.lang === k ? "2px solid var(--uddala-primary)" : "1px solid #E2E8F0",
                background: settings.lang === k ? "#E8F6FE" : "#fff",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </TweakSection>

      <TweakSection label="Ish e'lon qilish oqimi">
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { id: "wizard", label: "Wizard (4 qadam)" },
            { id: "quick", label: "Tezkor (1 ekran)" },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => update({ postFlow: o.id })}
              style={{
                flex: 1,
                padding: "8px 6px",
                borderRadius: 8,
                border: settings.postFlow === o.id ? "2px solid var(--uddala-primary)" : "1px solid #E2E8F0",
                background: settings.postFlow === o.id ? "#E8F6FE" : "#fff",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                color: "#111827",
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </TweakSection>

      <TweakSection label="Dark mode">
        <button
          onClick={() => update({ dark: !settings.dark })}
          style={{
            width: "100%",
            height: 36,
            borderRadius: 999,
            background: settings.dark ? "#111827" : "#E2E8F0",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 3,
            justifyContent: settings.dark ? "flex-end" : "flex-start",
            fontFamily: "Manrope, system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            {settings.dark ? "🌙" : "☀️"}
          </div>
        </button>
      </TweakSection>
    </div>
  );
}

function TweakSection({ label, children }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { TweaksPanel });
