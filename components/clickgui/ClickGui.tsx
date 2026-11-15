"use client";

// Web replica of the mod's ModernClickgui (994 x 631 design units).
// Sizes below are the same design units as ModernClickgui / ModuleGrid; 1u = var(--u).

import { useMemo, useState, type CSSProperties } from "react";
import { ACCENTS, CONFIGS, FRIENDS, MODULES, TABS, type ModuleDef, type Setting, type TabId } from "./data";
import { ChevronDown, ChevronRight, GearIcon, MoonIcon, SearchIcon, SunIcon, TabIcon } from "./icons";
import "./clickgui.css";

type Values = Record<string, number | boolean | string>;

const key = (tab: string, mod: string) => `${tab}/${mod}`;

function initialEnabled(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const [tab, mods] of Object.entries(MODULES)) for (const m of mods ?? []) out[key(tab, m.name)] = !!m.on;
  return out;
}

function initialValues(): Values {
  const out: Values = {};
  for (const [tab, mods] of Object.entries(MODULES))
    for (const m of mods ?? []) for (const s of m.settings ?? []) out[`${key(tab, m.name)}/${s.name}`] = s.value;
  return out;
}

/** Two columns planned from collapsed heights, like ModuleGrid (cards never jump columns). */
function splitColumns<T extends { mod: ModuleDef }>(items: T[]): [T[], T[]] {
  const cols: [T[], T[]] = [[], []];
  const h = [0, 0];
  for (const it of items) {
    const c = h[0] <= h[1] ? 0 : 1;
    cols[c].push(it);
    h[c] += 2 + Math.ceil(it.mod.desc.length / 34);
  }
  return cols;
}

export default function ClickGui({ username = "Player" }: { username?: string }) {
  const [tab, setTab] = useState<TabId>("combat");
  const [light, setLight] = useState(false);
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState<Record<string, boolean>>({ "combat/Aura": true });
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState<string | null>(null);

  const current = TABS.find((t) => t.id === tab)!;
  const groups = ["Player", "Visuals", "Other"] as const;

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (searching && q) {
      return Object.entries(MODULES).flatMap(([t, mods]) =>
        (mods ?? []).filter((m) => m.name.toLowerCase().includes(q)).map((mod) => ({ tab: t, mod })),
      );
    }
    return (MODULES[tab] ?? []).map((mod) => ({ tab: tab as string, mod }));
  }, [tab, searching, query]);

  const style = { "--cg-accent": accent } as CSSProperties;

  return (
    <div className="cg" aria-label="Unreal menu preview">
      <div className={`cg-frame${light ? " light" : ""}`} style={style}>
        {/* top-left: wordmark */}
        <div className="cg-logo">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 3.5v9a7 7 0 0 0 14 0v-9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="12" cy="12.5" r="2.2" fill="currentColor" />
          </svg>
          <span>unreal</span>
        </div>

        {/* top-right: "Group / Tab" header + profile */}
        <div className="cg-header">
          {searching ? (
            <div className="cg-search">
              <SearchIcon />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules"
                aria-label="Search modules"
              />
            </div>
          ) : (
            <div className="cg-title" key={tab}>
              <span className="cg-title-icon"><TabIcon id={tab} /></span>
              <span className="dim">{current.group} / </span>
              <span>{current.name}</span>
            </div>
          )}
          <div className="cg-profile">
            <span>{username}</span>
            <span className="cg-avatar">{username.slice(0, 1).toUpperCase()}</span>
          </div>
        </div>

        {/* sidebar */}
        <aside className="cg-side">
          <div className="cg-groups">
            {groups.map((g) => (
              <div key={g} className="cg-group">
                <div className="cg-group-head">
                  {g}
                  <ChevronDown />
                </div>
                {TABS.filter((t) => t.group === g).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`cg-tab${t.id === tab && !searching ? " sel" : ""}`}
                    onClick={() => {
                      setTab(t.id);
                      setSearching(false);
                      setQuery("");
                    }}
                  >
                    <TabIcon id={t.id} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="cg-dock">
            <button type="button" aria-label="Search" className={searching ? "on" : ""} onClick={() => setSearching((v) => !v)}>
              <SearchIcon />
            </button>
            <button type="button" aria-label={light ? "Dark menu" : "Light menu"} onClick={() => setLight((v) => !v)}>
              {light ? <MoonIcon /> : <SunIcon />}
            </button>
            <button type="button" aria-label="Themes" onClick={() => { setTab("themes"); setSearching(false); }}>
              <GearIcon />
            </button>
          </div>
        </aside>

        {/* content */}
        <section className="cg-content" key={searching ? `s:${query}` : tab}>
          {searching && !query.trim() ? (
            <p className="cg-empty">Type to search every module</p>
          ) : tab === "configs" && !searching ? (
            <div className="cg-list">
              {CONFIGS.map((c, i) => (
                <div className="cg-card cg-row" key={c.name} style={{ animationDelay: `${i * 28}ms` }}>
                  <div>
                    <div className="cg-name">{c.name}</div>
                    <div className="cg-desc">by {c.author} · {c.server} · {c.uses.toLocaleString("en")} uses</div>
                  </div>
                  <button type="button" className={`cg-btn${loaded === c.name ? " on" : ""}`} onClick={() => setLoaded(c.name)}>
                    {loaded === c.name ? "Loaded" : "Load"}
                  </button>
                </div>
              ))}
            </div>
          ) : tab === "friends" && !searching ? (
            <div className="cg-list">
              {FRIENDS.map((f, i) => (
                <div className="cg-card cg-row" key={f.name} style={{ animationDelay: `${i * 28}ms` }}>
                  <div className="cg-friend">
                    <span className="cg-avatar lg">{f.name[0]!.toUpperCase()}</span>
                    <div>
                      <div className="cg-name">{f.name}</div>
                      <div className="cg-desc">{f.online ? `Online · ${f.server}` : "Offline"}</div>
                    </div>
                  </div>
                  <span className={`cg-status${f.online ? " on" : ""}`} />
                </div>
              ))}
            </div>
          ) : tab === "themes" && !searching ? (
            <div className="cg-list">
              <div className="cg-card">
                <div className="cg-name">Accent</div>
                <div className="cg-desc">Repaint the menu, HUD and switches.</div>
                <div className="cg-dots">
                  {ACCENTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Accent ${c}`}
                      className={c === accent ? "sel" : ""}
                      style={{ background: c }}
                      onClick={() => setAccent(c)}
                    />
                  ))}
                </div>
              </div>
              <div className="cg-card cg-row" style={{ animationDelay: "28ms" }}>
                <div>
                  <div className="cg-name">Light theme</div>
                  <div className="cg-desc">Switch the whole menu to light.</div>
                </div>
                <Switch on={light} onClick={() => setLight((v) => !v)} />
              </div>
            </div>
          ) : items.length === 0 ? (
            <p className="cg-empty">Nothing here yet</p>
          ) : (
            <div className="cg-cols">
              {splitColumns(items).map((col, ci) => (
                <div className="cg-col" key={ci}>
                  {col.map(({ tab: t, mod }, i) => {
                    const k = key(t, mod.name);
                    return (
                      <ModuleCard
                        key={k}
                        mod={mod}
                        index={i * 2 + ci}
                        on={!!enabled[k]}
                        expanded={!!open[k]}
                        values={values}
                        prefix={k}
                        onToggle={() => setEnabled((e) => ({ ...e, [k]: !e[k] }))}
                        onExpand={() => setOpen((o) => ({ ...o, [k]: !o[k] }))}
                        onValue={(name, v) => setValues((vs) => ({ ...vs, [`${k}/${name}`]: v }))}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Switch({ on, onClick }: { on: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`cg-switch${on ? " on" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <span />
    </button>
  );
}

interface CardProps {
  mod: ModuleDef;
  index: number;
  on: boolean;
  expanded: boolean;
  values: Values;
  prefix: string;
  onToggle: () => void;
  onExpand: () => void;
  onValue: (name: string, v: number | boolean | string) => void;
}

function ModuleCard({ mod, index, on, expanded, values, prefix, onToggle, onExpand, onValue }: CardProps) {
  const hasSettings = !!mod.settings?.length;
  return (
    <div
      className="cg-card"
      style={{ animationDelay: `${index * 28}ms` }}
      onContextMenu={(e) => {
        if (!hasSettings) return;
        e.preventDefault();
        onExpand();
      }}
    >
      <div
        className="cg-card-head"
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="cg-name">{mod.name}</div>
        <div className="cg-controls">
          <Switch on={on} onClick={onToggle} />
          {hasSettings && (
            <button
              type="button"
              aria-label={expanded ? "Hide settings" : "Show settings"}
              aria-expanded={expanded}
              className={`cg-chevron${expanded ? " open" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
            >
              <ChevronRight />
            </button>
          )}
        </div>
        <div className="cg-desc">{mod.desc}</div>
      </div>

      {hasSettings && (
        <div className={`cg-settings${expanded ? " open" : ""}`}>
          <div>
            {mod.settings!.map((s) => (
              <SettingRow key={s.name} s={s} value={values[`${prefix}/${s.name}`]} onValue={(v) => onValue(s.name, v)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SettingRow({ s, value, onValue }: { s: Setting; value: number | boolean | string | undefined; onValue: (v: number | boolean | string) => void }) {
  if (s.kind === "bool") {
    const v = (value as boolean | undefined) ?? s.value;
    return (
      <div className="cg-set cg-set-inline">
        <span className="cg-set-name">{s.name}</span>
        <Switch on={v} onClick={() => onValue(!v)} />
      </div>
    );
  }
  if (s.kind === "mode") {
    const v = (value as string | undefined) ?? s.value;
    return (
      <div className="cg-set cg-set-inline">
        <span className="cg-set-name">{s.name}</span>
        <button type="button" className="cg-pill" onClick={() => onValue(s.options[(s.options.indexOf(v) + 1) % s.options.length]!)}>
          <span>{v}</span>
          <ChevronDown />
        </button>
      </div>
    );
  }
  const v = (value as number | undefined) ?? s.value;
  const pct = ((v - s.min) / (s.max - s.min)) * 100;
  const shown = s.step < 1 ? v.toFixed(s.step < 0.1 ? 2 : 1) : String(v);
  return (
    <div className="cg-set">
      <div className="cg-set-inline">
        <span className="cg-set-name">{s.name}</span>
        <span className="cg-set-val">{shown}{s.suffix ?? ""}</span>
      </div>
      <input
        type="range"
        className="cg-slider"
        min={s.min}
        max={s.max}
        step={s.step}
        value={v}
        aria-label={s.name}
        style={{ "--p": `${pct}%` } as CSSProperties}
        onChange={(e) => onValue(Number(e.target.value))}
      />
    </div>
  );
}
