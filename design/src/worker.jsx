// Worker screens: Jobs feed, Job detail + bid, Tanga wallet + shop, Worker profile, Settings

function WorkerHome({ lang, tanga, onOpenJob, onOpenWallet }) {
  const t = (k) => T[k][lang];
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? JOBS : JOBS.filter((j) => j.category === filter);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)", fontFamily: "Manrope, system-ui, sans-serif" }}>
      <AppHeader
        location="Tashkent"
        title={t("wHomeGreet")}
        subtitle={t("wHomeSub")}
        trailing={
          <button
            onClick={onOpenWallet}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px 6px 6px",
              borderRadius: 999,
              background: "linear-gradient(180deg, #FFF6DE 0%, #FFE89E 100%)",
              border: "1px solid #F5D17B",
              cursor: "pointer",
              fontFamily: "Manrope, system-ui, sans-serif",
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background: "radial-gradient(circle at 30% 30%, #FFE68A 0%, #E6A900 100%)",
                color: "#6B3F00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 900,
                border: "1px solid #C98A00",
              }}
            >
              T
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#8A5A00" }}>{tanga}</span>
          </button>
        }
      />

      <div style={{ padding: "0 20px 12px" }}>
        <Input
          placeholder={t("searchPlaceholder")}
          prefix={<Icon name="search" size={18} color="var(--uddala-text-soft)" />}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "0 20px 10px",
          overflowX: "auto",
        }}
      >
        <Chip active={filter === "all"} onClick={() => setFilter("all")} icon="filter">
          Barchasi
        </Chip>
        {CATEGORIES.slice(0, 6).map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.icon} {T[c.key][lang]}
          </Chip>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "4px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((j) => (
          <JobCard key={j.id} job={j} lang={lang} onClick={() => onOpenJob(j.id)} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job, lang, onClick }) {
  const t = (k) => T[k][lang];
  const cat = CATEGORIES.find((c) => c.id === job.category);
  const urgencyMap = {
    today: { label: "Bugun", tone: "danger" },
    tomorrow: { label: "Ertaga", tone: "warn" },
    flexible: { label: "Tezkor emas", tone: "neutral" },
  };
  const u = urgencyMap[job.urgency];
  return (
    <button
      onClick={onClick}
      style={{
        padding: 14,
        borderRadius: 16,
        border: "1px solid var(--uddala-border)",
        background: "var(--uddala-surface)",
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "Manrope, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Badge tone="primary">
          {cat.icon} {T[cat.key][lang]}
        </Badge>
        <Badge tone={u.tone}>● {u.label}</Badge>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
          {job.postedAt}
        </span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--uddala-text)", lineHeight: 1.3 }}>
        {job.title}
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: "var(--uddala-text-muted)",
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.desc}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingTop: 6,
          borderTop: "1px dashed var(--uddala-border)",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 800, color: "var(--uddala-primary-dark)" }}>
          {job.budgetType === "negotiable" ? "Kelishiladi" : formatSum(job.budget, lang)}
        </span>
        <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}>
          <Icon name="map-pin" size={11} /> {job.distanceKm} {t("km")}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--uddala-text-muted)", fontWeight: 700 }}>
          {job.bidsCount} taklif
        </span>
      </div>
    </button>
  );
}

function JobDetail({ lang, jobId, onBack, onBid }) {
  const t = (k) => T[k][lang];
  const job = JOBS.find((j) => j.id === jobId) || JOBS[0];
  const cat = CATEGORIES.find((c) => c.id === job.category);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)", fontFamily: "Manrope, system-ui, sans-serif" }}>
      <div style={{ padding: "16px 20px 8px", display: "flex", alignItems: "center", gap: 12 }}>
        <IconBtn icon="arrow-left" onClick={onBack} />
        <div style={{ flex: 1 }} />
        <IconBtn icon="heart" />
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 110 }}>
        <div style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Badge tone="primary">
              {cat.icon} {T[cat.key][lang]}
            </Badge>
            <Badge tone="warn">● {job.urgency === "today" ? "Bugun kerak" : job.urgency === "tomorrow" ? "Ertaga" : "Tezkor emas"}</Badge>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginTop: 10, lineHeight: 1.25 }}>
            {job.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: "var(--uddala-text-muted)", fontSize: 12, fontWeight: 600 }}>
            <Icon name="clock" size={12} /> {job.postedAt} oldin · <Icon name="map-pin" size={12} /> {job.address}
          </div>
        </div>

        <div style={{ padding: "14px 20px 0" }}>
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              border: "1px solid var(--uddala-border)",
              background: "var(--uddala-surface-2)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--uddala-text-muted)", textTransform: "uppercase", letterSpacing: 0.4 }}>
              Budjet
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--uddala-primary-dark)", marginTop: 4 }}>
              {job.budgetType === "negotiable" ? "Kelishiladi" : formatSum(job.budget, lang)}
            </div>
            <div style={{ fontSize: 12, color: "var(--uddala-text-muted)", fontWeight: 600, marginTop: 2 }}>
              {job.bidsCount} ta xodim taklif qildi
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--uddala-text-muted)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>
            Tavsif
          </div>
          <div style={{ fontSize: 14, color: "var(--uddala-text)", lineHeight: 1.5 }}>
            {job.desc}
          </div>
        </div>

        {job.photos > 0 && (
          <div style={{ padding: "14px 20px 0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--uddala-text-muted)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>
              Rasmlar
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {Array.from({ length: Math.min(job.photos, 3) }).map((_, i) => (
                <Placeholder key={i} label={`photo ${i + 1}`} height={92} radius={12} />
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--uddala-text-muted)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>
            Mijoz
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 14, background: "var(--uddala-surface-2)" }}>
            <Avatar name={job.authorName} size={40} color="#8B5CF6" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{job.authorName}</div>
              <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600, marginTop: 2 }}>
                3 ish e’lon qilgan · <Stars value={4.8} size={10} />
              </div>
            </div>
          </div>
        </div>
      </div>

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
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--uddala-text-muted)", fontWeight: 700 }}>
            {t("bidCost")}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
            <TangaPill count={3} size="sm" />
            <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
              · sizda 12
            </span>
          </div>
        </div>
        <Button size="lg" trailingIcon="arrow-right" onClick={onBid}>
          {t("bid")}
        </Button>
      </div>
    </div>
  );
}

function BidSheet({ lang, jobId, onClose, onSent }) {
  const t = (k) => T[k][lang];
  const job = JOBS.find((j) => j.id === jobId) || JOBS[0];
  const [price, setPrice] = React.useState("");
  const [eta, setEta] = React.useState("today");
  const [msg, setMsg] = React.useState("");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 40,
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "var(--uddala-surface)",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: "10px 20px 30px",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <div style={{ width: 44, height: 4, background: "var(--uddala-border)", borderRadius: 2, margin: "4px auto 16px" }} />
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>{t("yourOffer")}</div>
        <div style={{ fontSize: 12, color: "var(--uddala-text-muted)", fontWeight: 600, marginTop: 2 }}>
          {job.title}
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <FieldLabel>{t("price")}</FieldLabel>
          <Input
            value={price}
            onChange={setPrice}
            placeholder={job.budgetType === "fixed" ? (job.budget + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") : "200 000"}
            suffix={<span style={{ fontSize: 13, fontWeight: 700, color: "var(--uddala-text-muted)" }}>{t("sum")}</span>}
          />

          <FieldLabel>{t("leadtime")}</FieldLabel>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { id: "today", label: "Bugun" },
              { id: "tomorrow", label: "Ertaga" },
              { id: "2-3", label: "2-3 kun" },
            ].map((o) => (
              <Chip key={o.id} active={eta === o.id} onClick={() => setEta(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>

          <FieldLabel>{t("message")}</FieldLabel>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Mijozga nima deb ayta olasiz?"
            style={{
              minHeight: 90,
              padding: 14,
              border: "1px solid var(--uddala-border)",
              background: "var(--uddala-surface-2)",
              borderRadius: 14,
              outline: "none",
              fontSize: 14,
              fontFamily: "Manrope, system-ui, sans-serif",
              resize: "none",
              lineHeight: 1.5,
              color: "var(--uddala-text)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 12,
            background: "linear-gradient(180deg, #FFF6DE 0%, #FFE89E 100%)",
            border: "1px solid #F5D17B",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TangaPill count={3} size="sm" />
          <div style={{ fontSize: 12, color: "#8A5A00", fontWeight: 700, lineHeight: 1.4 }}>
            {t("willCost")}. Qabul qilsa — pul qaytariladi.
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <Button block size="lg" onClick={onSent} disabled={!price}>
            {t("sendBid")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function WalletScreen({ lang, tanga, onTopUp }) {
  const t = (k) => T[k][lang];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)", fontFamily: "Manrope, system-ui, sans-serif" }}>
      <AppHeader title={t("coins")} />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 20px" }}>
        {/* Balance card */}
        <div
          style={{
            padding: 20,
            borderRadius: 20,
            background:
              "linear-gradient(135deg, #FFE089 0%, #FFB52E 60%, #F08900 100%)",
            color: "#5C3600",
            boxShadow: "0 16px 32px -12px rgba(240,137,0,0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: -40,
              width: 180,
              height: 180,
              borderRadius: 999,
              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.8 }}>
            {t("balance")}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1 }}>
              {tanga}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{t("coins")}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, opacity: 0.75 }}>
            ≈ {formatSum(tanga * 1500, lang)}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
          <div style={{ padding: 14, borderRadius: 14, background: "var(--uddala-surface-2)" }}>
            <div style={{ fontSize: 11, color: "var(--uddala-text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>
              Bu oy sarflangan
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>32</div>
            <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
              12 ta taklif
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 14, background: "var(--uddala-surface-2)" }}>
            <div style={{ fontSize: 11, color: "var(--uddala-text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>
              Qabul qilindi
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>7</div>
            <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
              58% konversiya
            </div>
          </div>
        </div>

        {/* Tanga shop */}
        <div style={{ marginTop: 22, fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>
          {t("tangaShop")}
        </div>
        <div style={{ fontSize: 12, color: "var(--uddala-text-muted)", fontWeight: 600, marginTop: 2 }}>
          Paket qanchalik katta bo‘lsa, shunchalik arzon
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          {TANGA_PACKS.map((p, i) => (
            <button
              key={i}
              onClick={() => onTopUp(p.coins)}
              style={{
                padding: "16px 14px",
                borderRadius: 16,
                border: p.badge === "Ommabop" ? "1.5px solid var(--uddala-primary)" : "1px solid var(--uddala-border)",
                background: p.badge === "Ommabop" ? "var(--uddala-primary-soft)" : "var(--uddala-surface)",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              {p.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: 12,
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: p.badge === "Ommabop" ? "var(--uddala-primary)" : "#F5B700",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.3,
                  }}
                >
                  {p.badge}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TangaPill count={p.coins} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 10, color: "var(--uddala-text)" }}>
                {formatSum(p.price, lang)}
              </div>
              <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600, marginTop: 2 }}>
                {Math.round(p.price / p.coins).toLocaleString("ru-RU").replace(/,/g, " ")} {t("sum")} / T
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkerProfileSelf({ lang, onSettings }) {
  const t = (k) => T[k][lang];
  const w = WORKERS[0]; // "me"
  const cat = CATEGORIES.find((c) => c.id === w.category);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)", fontFamily: "Manrope, system-ui, sans-serif" }}>
      <AppHeader
        title={t("profile")}
        trailing={<IconBtn icon="menu" onClick={onSettings} />}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "0 20px 20px" }}>
        <div
          style={{
            padding: 18,
            borderRadius: 20,
            border: "1px solid var(--uddala-border)",
            background: "var(--uddala-surface)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Avatar name={w.name} size={64} color={w.color} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{w.name}</div>
              {w.verified && <Icon name="shield" size={14} color="var(--uddala-primary)" />}
            </div>
            <Badge tone="primary">{T[cat.key][lang]}</Badge>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <Stars value={w.rating} size={12} />
              <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
                · {w.completed} {t("completedJobs").toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Settings rows */}
        <div style={{ marginTop: 16, borderRadius: 16, border: "1px solid var(--uddala-border)", overflow: "hidden", background: "var(--uddala-surface)" }}>
          <SettingsRow icon="briefcase" label="Mening xizmatlarim" value="Santexnika +2" />
          <SettingsRow icon="map-pin" label="Ish hududi" value="Tashkent" />
          <SettingsRow icon="clock" label="Ish vaqti" value="9:00 — 21:00" />
          <SettingsRow icon="telegram" label={t("tgNotif")} value={<Badge tone="success">● {t("tgConnected")}</Badge>} last />
        </div>

        {/* Portfolio */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{t("portfolio")}</div>
          <button style={{ border: "none", background: "transparent", color: "var(--uddala-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            + Qo‘shish
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
          {w.portfolio.map((p, i) => (
            <Placeholder key={i} label={p.label} tone={p.tone} height={90} radius={12} />
          ))}
        </div>

        {/* Reviews preview */}
        <div style={{ marginTop: 16, fontSize: 14, fontWeight: 800 }}>
          {t("reviews")} · {w.reviewCount}
        </div>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
          {REVIEWS.slice(0, 2).map((r, i) => (
            <div key={i} style={{ padding: 12, borderRadius: 12, border: "1px solid var(--uddala-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={r.by} size={28} color="#8B5CF6" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{r.by}</div>
                </div>
                <div style={{ display: "flex", gap: 1 }}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="star" size={11} color="#F5B700" />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12, marginTop: 6, color: "var(--uddala-text)", lineHeight: 1.5 }}>
                {r.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ icon, label, value, last }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderBottom: last ? "none" : "1px solid var(--uddala-border)",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: "var(--uddala-primary-soft)",
          color: "var(--uddala-primary-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "var(--uddala-text)" }}>
        {label}
      </div>
      <div style={{ fontSize: 12, color: "var(--uddala-text-muted)", fontWeight: 700 }}>{value}</div>
      <Icon name="chevron-right" size={14} color="var(--uddala-text-soft)" />
    </div>
  );
}

Object.assign(window, {
  WorkerHome,
  JobCard,
  JobDetail,
  BidSheet,
  WalletScreen,
  WorkerProfileSelf,
  SettingsRow,
});
