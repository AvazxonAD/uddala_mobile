// Customer screens: Home, Category, Worker profile, Post job wizard, My jobs, Bids

function BottomNav({ current, onNav, role, lang }) {
  const t = (k) => T[k][lang];
  const items = role === "customer"
    ? [
        { id: "home", label: t("home"), icon: "home" },
        { id: "my-jobs", label: t("myJobs"), icon: "briefcase" },
        { id: "post", label: t("postJob"), icon: "plus", highlight: true },
        { id: "messages", label: t("messages"), icon: "message" },
        { id: "profile", label: t("profile"), icon: "user" },
      ]
    : [
        { id: "home", label: t("home"), icon: "home" },
        { id: "wallet", label: t("coins"), icon: "coin" },
        { id: "messages", label: t("messages"), icon: "message" },
        { id: "profile", label: t("profile"), icon: "user" },
      ];
  return (
    <div
      style={{
        borderTop: "1px solid var(--uddala-border)",
        background: "var(--uddala-surface)",
        paddingBottom: 8,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      {items.map((it) => {
        const active = current === it.id;
        if (it.highlight) {
          return (
            <button
              key={it.id}
              onClick={() => onNav(it.id)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 6px 4px",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "var(--uddala-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px -6px var(--uddala-primary)",
                  marginTop: -16,
                }}
              >
                <Icon name={it.icon} size={22} color="#fff" />
              </div>
              <div
                style={{
                  fontSize: 10,
                  marginTop: 4,
                  fontWeight: 700,
                  color: "var(--uddala-text-muted)",
                }}
              >
                {it.label}
              </div>
            </button>
          );
        }
        return (
          <button
            key={it.id}
            onClick={() => onNav(it.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 8px 4px",
              flex: 1,
            }}
          >
            <Icon
              name={it.icon}
              size={22}
              color={active ? "var(--uddala-primary)" : "var(--uddala-text-soft)"}
              stroke={active ? 2.2 : 1.8}
            />
            <div
              style={{
                fontSize: 10,
                marginTop: 4,
                fontWeight: active ? 800 : 600,
                color: active ? "var(--uddala-primary)" : "var(--uddala-text-soft)",
              }}
            >
              {it.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AppHeader({ title, subtitle, trailing, location }) {
  return (
    <div
      style={{
        padding: "16px 20px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {location && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 10px 3px 6px",
              borderRadius: 999,
              background: "var(--uddala-primary-soft)",
              color: "var(--uddala-primary-dark)",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            <Icon name="map-pin" size={12} /> {location}
          </div>
        )}
        {title && (
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: "var(--uddala-text)" }}>
            {title}
          </div>
        )}
        {subtitle && (
          <div style={{ fontSize: 13, color: "var(--uddala-text-muted)", marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
      {trailing}
    </div>
  );
}

function CustomerHome({ lang, onPost, onOpenWorker, onOpenCategory }) {
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
      <AppHeader
        location="Tashkent"
        title={t("cHomeGreet")}
        subtitle={t("cHomeSub")}
        trailing={
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "var(--uddala-surface-2)",
              border: "1px solid var(--uddala-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Icon name="bell" size={20} color="var(--uddala-text)" />
            <span
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                background: "#EF4444",
                borderRadius: 999,
                border: "1.5px solid var(--uddala-surface)",
              }}
            />
          </div>
        }
      />

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 16 }}>
        <div style={{ padding: "0 20px" }}>
          <Input
            placeholder={t("searchPlaceholder")}
            prefix={<Icon name="search" size={18} color="var(--uddala-text-soft)" />}
          />
        </div>

        {/* Big CTA */}
        <div style={{ padding: "18px 20px 0" }}>
          <button
            onClick={onPost}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 16,
              borderRadius: 18,
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(115deg, var(--uddala-primary) 0%, var(--uddala-primary-dark) 100%)",
              color: "#fff",
              textAlign: "left",
              fontFamily: "Manrope, system-ui, sans-serif",
              boxShadow: "0 10px 24px -10px var(--uddala-primary)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(255,255,255,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="plus" size={24} color="#fff" stroke={2.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>
                {t("postJob")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.88, marginTop: 2, fontWeight: 500 }}>
                Xodimlar taklif berishadi
              </div>
            </div>
            <Icon name="arrow-right" size={20} color="#fff" />
          </button>
        </div>

        {/* Categories */}
        <SectionHeader title={t("categories")} action={t("seeAll")} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            padding: "0 20px",
          }}
        >
          {CATEGORIES.slice(0, 8).map((c) => (
            <button
              key={c.id}
              onClick={() => onOpenCategory(c.id)}
              style={{
                border: "1px solid var(--uddala-border)",
                background: "var(--uddala-surface)",
                borderRadius: 14,
                padding: "14px 6px 10px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `color-mix(in oklch, ${c.color} 15%, white)`,
                  color: c.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {c.icon}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--uddala-text)",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {T[c.key][lang]}
              </div>
            </button>
          ))}
        </div>

        {/* Top masters */}
        <SectionHeader title={t("topMasters")} action={t("seeAll")} />
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {WORKERS.slice(0, 3).map((w) => (
            <WorkerCard key={w.id} worker={w} lang={lang} onClick={() => onOpenWorker(w.id)} />
          ))}
        </div>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "22px 20px 12px",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3, color: "var(--uddala-text)" }}>
        {title}
      </div>
      {action && (
        <button
          style={{
            border: "none",
            background: "transparent",
            color: "var(--uddala-primary)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {action} →
        </button>
      )}
    </div>
  );
}

function WorkerCard({ worker, lang, onClick }) {
  const t = (k) => T[k][lang];
  const cat = CATEGORIES.find((c) => c.id === worker.category);
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        border: "1px solid var(--uddala-border)",
        background: "var(--uddala-surface)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <div style={{ position: "relative" }}>
        <Avatar name={worker.name} size={52} color={worker.color} />
        {worker.online && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#16B378",
              border: "2px solid var(--uddala-surface)",
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "var(--uddala-text)" }}>
            {worker.name}
          </div>
          {worker.verified && (
            <Icon name="shield" size={14} color="var(--uddala-primary)" />
          )}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--uddala-text-muted)",
            marginTop: 2,
            fontWeight: 600,
          }}
        >
          {T[cat.key][lang]} · {worker.completed} {t("completedJobs").toLowerCase()}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          <Stars value={worker.rating} size={12} />
          <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
            ({worker.reviewCount})
          </span>
          <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
            · {worker.distanceKm} {t("km")}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--uddala-text)" }}>
          {(worker.priceFrom / 1000).toFixed(0)}k+
        </div>
        <div style={{ fontSize: 10, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
          {t("sum")}
        </div>
      </div>
    </button>
  );
}

function WorkerProfile({ lang, workerId, onBack, onChat }) {
  const worker = WORKERS.find((w) => w.id === workerId) || WORKERS[0];
  const t = (k) => T[k][lang];
  const cat = CATEGORIES.find((c) => c.id === worker.category);
  const [tab, setTab] = React.useState("portfolio");
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
      <div
        style={{
          padding: "16px 20px 8px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <IconBtn icon="arrow-left" onClick={onBack} />
        <div style={{ flex: 1 }} />
        <IconBtn icon="heart" />
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 110 }}>
        <div
          style={{
            padding: "8px 20px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid var(--uddala-border)",
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar name={worker.name} size={88} color={worker.color} />
            {worker.online && (
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: "#16B378",
                  border: "3px solid var(--uddala-surface)",
                }}
              />
            )}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>
            {worker.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge tone="primary">{T[cat.key][lang]}</Badge>
            {worker.verified && (
              <Badge tone="success">
                <Icon name="shield" size={10} /> {t("verified")}
              </Badge>
            )}
            {worker.online && (
              <Badge tone="success">● {t("online")}</Badge>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              width: "100%",
              marginTop: 8,
            }}
          >
            <StatCell label={t("rating")} value={worker.rating.toFixed(1)} suffix={`${worker.reviewCount} ${t("reviews").toLowerCase()}`} />
            <StatCell label={t("completedJobs")} value={worker.completed} />
            <StatCell label={t("distance")} value={`${worker.distanceKm}`} suffix={t("km")} />
          </div>

          <div
            style={{
              width: "100%",
              marginTop: 8,
              padding: 12,
              borderRadius: 12,
              background: "var(--uddala-surface-2)",
              fontSize: 13,
              color: "var(--uddala-text)",
              lineHeight: 1.5,
            }}
          >
            {worker.bio}
          </div>

          <div
            style={{
              width: "100%",
              marginTop: 4,
              padding: 12,
              borderRadius: 12,
              background: "var(--uddala-surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--uddala-text)",
            }}
          >
            <span>{t("priceRange")}</span>
            <span style={{ color: "var(--uddala-primary-dark)" }}>
              {formatSum(worker.priceFrom, lang)} – {formatSum(worker.priceTo, lang)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            padding: "12px 20px 0",
            gap: 8,
            borderBottom: "1px solid var(--uddala-border)",
          }}
        >
          {["portfolio", "reviews"].map((id) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: "10px 0 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 800,
                color: tab === id ? "var(--uddala-primary)" : "var(--uddala-text-muted)",
                borderBottom: tab === id ? "2px solid var(--uddala-primary)" : "2px solid transparent",
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              {tab === "portfolio" ? null : null}
              {id === "portfolio" ? t("portfolio") : t("reviews")}
            </button>
          ))}
        </div>

        {tab === "portfolio" ? (
          <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {worker.portfolio.map((p, i) => (
              <Placeholder key={i} label={p.label} tone={p.tone} height={120} radius={12} />
            ))}
          </div>
        ) : (
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid var(--uddala-border)",
                  background: "var(--uddala-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={r.by} size={32} color="#8B5CF6" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{r.by}</div>
                    <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>{r.time}</div>
                  </div>
                  <div style={{ display: "flex", gap: 1 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Icon
                        key={j}
                        name="star"
                        size={12}
                        color={j < r.rating ? "#F5B700" : "var(--uddala-border)"}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, marginTop: 10, lineHeight: 1.5, color: "var(--uddala-text)" }}>
                  {r.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky action */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 20px 30px",
          background: "var(--uddala-surface)",
          borderTop: "1px solid var(--uddala-border)",
          display: "flex",
          gap: 10,
        }}
      >
        <Button variant="secondary" icon="phone">
          Qo‘ng‘iroq
        </Button>
        <Button block trailingIcon="message" onClick={onChat}>
          Yozish
        </Button>
      </div>
    </div>
  );
}

function IconBtn({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: "var(--uddala-surface-2)",
        border: "1px solid var(--uddala-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Icon name={icon} size={18} color="var(--uddala-text)" />
    </button>
  );
}

function StatCell({ label, value, suffix }) {
  return (
    <div
      style={{
        padding: "10px 8px",
        borderRadius: 12,
        background: "var(--uddala-surface-2)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, color: "var(--uddala-text)", letterSpacing: -0.5 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: "var(--uddala-text-soft)", fontWeight: 600, marginTop: 2 }}>
        {label}
      </div>
      {suffix && (
        <div style={{ fontSize: 9, color: "var(--uddala-text-soft)", fontWeight: 500 }}>
          {suffix}
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  BottomNav,
  AppHeader,
  CustomerHome,
  SectionHeader,
  WorkerCard,
  WorkerProfile,
  IconBtn,
  StatCell,
});
