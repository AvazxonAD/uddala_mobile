// Customer: Post Job wizard (4 steps), My Jobs, Bids sheet

function PostJobWizard({ lang, onClose, onPublish, variant = "wizard" }) {
  const t = (k) => T[k][lang];
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    category: null,
    title: "",
    desc: "",
    address: "",
    when: "today",
    budgetType: "negotiable",
    budget: "",
  });

  const steps = variant === "wizard"
    ? [
        { id: "cat", title: t("chooseCategory") },
        { id: "desc", title: t("describeJob") },
        { id: "addr", title: t("whereAddress") },
        { id: "bud", title: t("budgetStep") },
      ]
    : [{ id: "all", title: t("describeJob") }];

  const canNext = () => {
    if (variant === "quick") return data.category && data.title && data.address;
    const s = steps[step];
    if (s.id === "cat") return !!data.category;
    if (s.id === "desc") return data.title.length > 2;
    if (s.id === "addr") return data.address.length > 2;
    if (s.id === "bud") return data.budgetType === "negotiable" || data.budget.length > 2;
    return true;
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onPublish(data);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
    else onClose();
  };

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
      <div style={{ padding: "16px 20px 8px", display: "flex", alignItems: "center", gap: 12 }}>
        <IconBtn icon="arrow-left" onClick={back} />
        <div style={{ flex: 1, display: "flex", gap: 6 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                background: i <= step ? "var(--uddala-primary)" : "var(--uddala-border)",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--uddala-text-muted)" }}>
          {t("step")} {step + 1}/{steps.length}
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "14px 20px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 16 }}>
          {steps[step].title}
        </div>

        {(variant === "quick" || steps[step].id === "cat") && (
          <StepCategory data={data} setData={setData} lang={lang} />
        )}
        {(variant === "quick" || steps[step].id === "desc") && (
          <StepDescribe data={data} setData={setData} lang={lang} />
        )}
        {(variant === "quick" || steps[step].id === "addr") && (
          <StepAddress data={data} setData={setData} lang={lang} />
        )}
        {(variant === "quick" || steps[step].id === "bud") && (
          <StepBudget data={data} setData={setData} lang={lang} />
        )}
      </div>

      <div style={{ padding: "12px 20px 30px", borderTop: "1px solid var(--uddala-border)" }}>
        <Button block size="lg" trailingIcon="arrow-right" onClick={next} disabled={!canNext()}>
          {step === steps.length - 1 ? t("publish") : t("next")}
        </Button>
      </div>
    </div>
  );
}

function StepCategory({ data, setData, lang }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {CATEGORIES.map((c) => {
        const active = data.category === c.id;
        return (
          <button
            key={c.id}
            onClick={() => setData({ ...data, category: c.id })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 12px",
              borderRadius: 14,
              border: active
                ? "1.5px solid var(--uddala-primary)"
                : "1px solid var(--uddala-border)",
              background: active ? "var(--uddala-primary-soft)" : "var(--uddala-surface)",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "Manrope, system-ui, sans-serif",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: `color-mix(in oklch, ${c.color} 18%, white)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {c.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--uddala-text)" }}>
              {T[c.key][lang]}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function StepDescribe({ data, setData, lang }) {
  const t = (k) => T[k][lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <FieldLabel>{t("jobTitle")}</FieldLabel>
      <Input
        value={data.title}
        onChange={(v) => setData({ ...data, title: v })}
        placeholder="Masalan: kranni almashtirish"
      />
      <FieldLabel>{t("jobDesc")}</FieldLabel>
      <textarea
        value={data.desc}
        onChange={(e) => setData({ ...data, desc: e.target.value })}
        placeholder="Batafsil yozib bering — xodim nima kutilayotganini bilsin."
        style={{
          minHeight: 110,
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
      <FieldLabel>{t("addPhotos")}</FieldLabel>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            border: "1.5px dashed var(--uddala-border)",
            background: "var(--uddala-surface-2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            color: "var(--uddala-text-muted)",
            cursor: "pointer",
            fontFamily: "Manrope, system-ui, sans-serif",
          }}
        >
          <Icon name="camera" size={22} />
          <span style={{ fontSize: 10, fontWeight: 700 }}>+ Rasm</span>
        </button>
        <Placeholder label="photo 1" height={72} radius={14} />
        <Placeholder label="photo 2" height={72} radius={14} />
      </div>
    </div>
  );
}

function StepAddress({ data, setData, lang }) {
  const t = (k) => T[k][lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <FieldLabel>{t("address")}</FieldLabel>
      <Input
        value={data.address}
        onChange={(v) => setData({ ...data, address: v })}
        placeholder="Shahar, mahalla, ko‘cha, uy"
        prefix={<Icon name="map-pin" size={18} color="var(--uddala-text-soft)" />}
      />
      <Placeholder label="MAP  ·  Tashkent" height={140} tone="primary" />
      <FieldLabel>{t("when")}</FieldLabel>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { id: "today", label: t("today") },
          { id: "tomorrow", label: t("tomorrow") },
          { id: "flexible", label: t("flexible") },
        ].map((o) => (
          <Chip
            key={o.id}
            active={data.when === o.id}
            onClick={() => setData({ ...data, when: o.id })}
          >
            {o.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function StepBudget({ data, setData, lang }) {
  const t = (k) => T[k][lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 13, color: "var(--uddala-text-muted)", lineHeight: 1.5 }}>
        {t("budgetSub")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <BudgetOption
          active={data.budgetType === "negotiable"}
          onClick={() => setData({ ...data, budgetType: "negotiable" })}
          title={t("negotiable")}
          desc="Xodimlar narx taklif qilishadi"
        />
        <BudgetOption
          active={data.budgetType === "fixed"}
          onClick={() => setData({ ...data, budgetType: "fixed" })}
          title={t("fixed")}
          desc="Siz narxni belgilaysiz"
        />
      </div>
      {data.budgetType === "fixed" && (
        <>
          <FieldLabel>{t("price")}</FieldLabel>
          <Input
            value={data.budget}
            onChange={(v) => setData({ ...data, budget: v })}
            placeholder="200 000"
            suffix={
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--uddala-text-muted)" }}>
                {t("sum")}
              </span>
            }
          />
        </>
      )}

      <div
        style={{
          padding: 14,
          borderRadius: 14,
          background: "var(--uddala-primary-soft)",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <Icon name="shield" size={20} color="var(--uddala-primary-dark)" />
        <div style={{ fontSize: 12, color: "var(--uddala-primary-dark)", lineHeight: 1.5, fontWeight: 600 }}>
          Ish yakunlanishidan oldin pul to‘lamang. Xavfsizlik uchun chat ilovasi ichida saqlang.
        </div>
      </div>
    </div>
  );
}

function BudgetOption({ active, onClick, title, desc }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 14px",
        borderRadius: 14,
        border: active ? "1.5px solid var(--uddala-primary)" : "1px solid var(--uddala-border)",
        background: active ? "var(--uddala-primary-soft)" : "var(--uddala-surface)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "Manrope, system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--uddala-text)" }}>{title}</div>
      <div style={{ fontSize: 11, color: "var(--uddala-text-muted)", fontWeight: 600, marginTop: 4, lineHeight: 1.4 }}>
        {desc}
      </div>
    </button>
  );
}

function FieldLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: "var(--uddala-text-muted)",
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      {children}
    </div>
  );
}

// My jobs list (customer)
function MyJobsScreen({ lang, onOpen }) {
  const t = (k) => T[k][lang];
  const [tab, setTab] = React.useState("active");
  const list = MY_JOBS.filter((j) => j.status === tab);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)" }}>
      <AppHeader title={t("myJobsTitle")} />
      <div style={{ display: "flex", gap: 8, padding: "0 20px 8px" }}>
        <Chip active={tab === "active"} onClick={() => setTab("active")}>
          {t("active")} · {MY_JOBS.filter((j) => j.status === "active").length}
        </Chip>
        <Chip active={tab === "done"} onClick={() => setTab("done")}>
          {t("done")}
        </Chip>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map((j) => (
          <MyJobCard key={j.id} job={j} lang={lang} onClick={() => onOpen(j.id)} />
        ))}
        {list.length === 0 && (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "var(--uddala-text-muted)",
              fontSize: 13,
            }}
          >
            Hozircha {tab === "active" ? "faol" : "bajarilgan"} ishlar yo‘q
          </div>
        )}
      </div>
    </div>
  );
}

function MyJobCard({ job, lang, onClick }) {
  const t = (k) => T[k][lang];
  const cat = CATEGORIES.find((c) => c.id === job.category);
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
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Badge tone="primary">
          {cat?.icon} {T[cat.key][lang]}
        </Badge>
        {job.status === "active" ? (
          <Badge tone="warn">● Faol</Badge>
        ) : (
          <Badge tone="success">
            <Icon name="check" size={10} /> Bajarilgan
          </Badge>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
          {job.postedAt}
        </span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--uddala-text)", lineHeight: 1.3 }}>
        {job.title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--uddala-primary-dark)" }}>
          {job.budgetType === "negotiable" ? "Kelishiladi" : formatSum(job.budget, lang)}
        </span>
        <span style={{ fontSize: 12, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
          · <Icon name="map-pin" size={11} /> {job.address}
        </span>
      </div>
      {job.status === "active" && (
        <div
          style={{
            marginTop: 4,
            padding: "10px 12px",
            borderRadius: 12,
            background: "var(--uddala-primary-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--uddala-primary-dark)" }}>
            {job.bidsCount} {t("offersReceived")}
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--uddala-primary)" }}>
            Ko‘rish →
          </span>
        </div>
      )}
    </button>
  );
}

// Bids list for a given job
function BidsScreen({ lang, jobId, onBack, onChat }) {
  const t = (k) => T[k][lang];
  const job = MY_JOBS.find((j) => j.id === jobId) || MY_JOBS[0];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)" }}>
      <div style={{ padding: "16px 20px 10px", display: "flex", alignItems: "center", gap: 12 }}>
        <IconBtn icon="arrow-left" onClick={onBack} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>
            {t("chooseMaster")}
          </div>
          <div style={{ fontSize: 12, color: "var(--uddala-text-muted)", fontWeight: 600 }}>
            {job.title}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {job.bids.map((b, i) => {
          const worker = WORKERS.find((w) => w.id === b.workerId) || WORKERS[0];
          return (
            <div
              key={i}
              style={{
                padding: 14,
                borderRadius: 16,
                border: "1px solid var(--uddala-border)",
                background: "var(--uddala-surface)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={worker.name} size={42} color={worker.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{worker.name}</div>
                    {worker.verified && <Icon name="shield" size={12} color="var(--uddala-primary)" />}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <Stars value={worker.rating} size={11} />
                    <span style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
                      · {worker.completed} ish
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "var(--uddala-primary-dark)" }}>
                    {formatSum(b.price, lang)}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--uddala-text)" }}>
                "{b.message}"
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <Icon name="clock" size={12} color="var(--uddala-text-soft)" />
                <span style={{ color: "var(--uddala-text-muted)", fontWeight: 700 }}>{b.etaText}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" icon="message" onClick={onChat}>
                  Chat
                </Button>
                <Button block>{t("accept")}</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Messages list + chat thread
function MessagesScreen({ lang, onOpen }) {
  const t = (k) => T[k][lang];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)" }}>
      <AppHeader title={t("messages")} />
      <div style={{ flex: 1, overflow: "auto" }}>
        {MESSAGES.map((m) => {
          const w = WORKERS.find((x) => x.id === m.workerId) || WORKERS[0];
          return (
            <button
              key={m.id}
              onClick={() => onOpen(m.workerId)}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: "12px 20px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                borderBottom: "1px solid var(--uddala-border)",
                fontFamily: "Manrope, system-ui, sans-serif",
              }}
            >
              <div style={{ position: "relative" }}>
                <Avatar name={w.name} size={46} color={w.color} />
                {w.online && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 11,
                      height: 11,
                      borderRadius: 999,
                      background: "#16B378",
                      border: "2px solid var(--uddala-surface)",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>{w.name}</div>
                  <div style={{ fontSize: 11, color: "var(--uddala-text-soft)", fontWeight: 600 }}>
                    {m.time}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: m.unread ? "var(--uddala-text)" : "var(--uddala-text-muted)",
                    fontWeight: m.unread ? 700 : 500,
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.lastMessage}
                </div>
              </div>
              {m.unread > 0 && (
                <div
                  style={{
                    minWidth: 20,
                    height: 20,
                    borderRadius: 999,
                    background: "var(--uddala-primary)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 6px",
                  }}
                >
                  {m.unread}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatScreen({ lang, workerId, onBack }) {
  const t = (k) => T[k][lang];
  const worker = WORKERS.find((w) => w.id === workerId) || WORKERS[0];
  const [draft, setDraft] = React.useState("");
  const [msgs, setMsgs] = React.useState(CHAT_THREAD);
  const send = () => {
    if (!draft.trim()) return;
    setMsgs([...msgs, { who: "me", text: draft, time: "hozir" }]);
    setDraft("");
  };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--uddala-surface)" }}>
      <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--uddala-border)" }}>
        <IconBtn icon="arrow-left" onClick={onBack} />
        <Avatar name={worker.name} size={36} color={worker.color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{worker.name}</div>
          <div style={{ fontSize: 11, color: "#16B378", fontWeight: 700 }}>● {t("online")}</div>
        </div>
        <IconBtn icon="phone" />
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.who === "me" ? "flex-end" : "flex-start",
              maxWidth: "75%",
              padding: "10px 13px",
              borderRadius: 16,
              borderBottomRightRadius: m.who === "me" ? 4 : 16,
              borderBottomLeftRadius: m.who === "me" ? 16 : 4,
              background: m.who === "me" ? "var(--uddala-primary)" : "var(--uddala-surface-2)",
              color: m.who === "me" ? "#fff" : "var(--uddala-text)",
              fontSize: 13.5,
              lineHeight: 1.4,
              fontFamily: "Manrope, system-ui, sans-serif",
            }}
          >
            {m.text}
            <div
              style={{
                fontSize: 10,
                opacity: 0.7,
                marginTop: 3,
                fontWeight: 600,
                textAlign: m.who === "me" ? "right" : "left",
              }}
            >
              {m.time}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "10px 14px 20px",
          borderTop: "1px solid var(--uddala-border)",
        }}
      >
        <div style={{ flex: 1 }}>
          <Input
            value={draft}
            onChange={setDraft}
            placeholder={t("typeMessage")}
          />
        </div>
        <button
          onClick={send}
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--uddala-primary)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="send" size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  PostJobWizard,
  MyJobsScreen,
  MyJobCard,
  BidsScreen,
  MessagesScreen,
  ChatScreen,
});
