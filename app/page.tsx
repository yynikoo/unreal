import Link from "next/link";
import ClickGui from "@/components/clickgui/ClickGui";
import { ACCENTS } from "@/components/clickgui/data";
import Island from "@/components/Island";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="hero">
        <span className="pill-tag"><span className="dot" />Minecraft client</span>
        <h1>
          Play sharper. <span className="accent">Look cleaner.</span>
        </h1>
        <p className="lead">
          Unreal packs 150+ modules into one fast, quiet menu, with smooth visuals and cloud configs to match.
        </p>
        <div className="row">
          <Link href="/purchase" className="btn primary lg">Get Unreal</Link>
          {user ? (
            <Link href="/ps" className="btn lg">My account</Link>
          ) : (
            <Link href="/register" className="btn lg">Create account</Link>
          )}
        </div>
      </section>

      <section className="showcase" aria-label="Menu preview">
        <ClickGui username={user?.name ?? "Player"} />
        <p className="showcase-caption">This is our in-game menu, live in your browser. Click a card, open its settings, switch tabs or themes.</p>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">The menu</span>
          <h2>Everything in <span className="accent">one place</span></h2>
          <p>Modules are grouped the way you play. Toggle with a click, tune with a right-click.</p>
        </div>
        <div className="bento">
          <div className="card feature">
            <h3>Combat</h3>
            <p>Aura, AutoTotem, Velocity, TriggerBot and more, all tunable per server.</p>
            <div className="big">21</div>
            <p className="small faint">combat modules</p>
          </div>
          <div className="card feature">
            <h3>Visuals</h3>
            <p>ESP, nametags, custom sky, fog, particles, hand effects.</p>
            <div className="big">50+</div>
            <p className="small faint">visual modules</p>
          </div>
          <div className="card feature">
            <h3>Movement</h3>
            <p>Sprint, speed, elytra control and the small things that add up.</p>
            <div className="big">16</div>
            <p className="small faint">movement modules</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">HUD</span>
          <h2>A <span className="accent">dynamic island</span> for your game</h2>
          <p>Toggles, targets and timers show up in one small pill at the top of your screen, then get out of the way.</p>
        </div>
        <div className="bento">
          <div className="card feature wide">
            <h3>Live events</h3>
            <p>What just happened, at a glance.</p>
            <div className="visual"><Island /></div>
          </div>
          <div className="card feature wide">
            <h3>Your colors</h3>
            <p>Pick an accent and the whole client follows: menu, HUD, switches and highlights.</p>
            <div className="visual swatches">
              {ACCENTS.map((c) => (
                <span key={c} className="swatch" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="card feature">
            <h3>Cloud configs</h3>
            <p>Load a ready-made setup in one click, or save yours to the cloud.</p>
            <div className="visual chips">
              <span className="chip on">Sharp PvP</span>
              <span className="chip">Legit Daily</span>
              <span className="chip">Visuals Only</span>
            </div>
          </div>
          <div className="card feature">
            <h3>Friends</h3>
            <p>Middle-click a player to add them. Friends are never targeted.</p>
            <div className="visual chips">
              <span className="chip on">mira · online</span>
              <span className="chip">lex</span>
            </div>
          </div>
          <div className="card feature">
            <h3>Light or dark</h3>
            <p>Both themes, with a smooth fade between them.</p>
            <div className="visual chips">
              <span className="chip on">Dark</span>
              <span className="chip">Light</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card cta">
          <h2>Ready to <span className="accent">play</span>?</h2>
          <p className="muted">Grab Unreal and get every module right away.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link href="/purchase" className="btn primary lg">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
