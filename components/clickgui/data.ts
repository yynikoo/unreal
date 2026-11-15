// Content for the web replica of the in-game ModernClickgui.
// Tab order and groups mirror ModernClickgui.TAB_NAMES / GROUP_NAMES; module names come from the mod.

export type Setting =
  | { kind: "slider"; name: string; value: number; min: number; max: number; step: number; suffix?: string }
  | { kind: "bool"; name: string; value: boolean }
  | { kind: "mode"; name: string; value: string; options: string[] };

export interface ModuleDef {
  name: string;
  desc: string;
  on?: boolean;
  settings?: Setting[];
}

export type TabId =
  | "combat" | "movement" | "player" | "esp" | "world" | "other" | "configs" | "friends" | "themes";

export interface TabDef {
  id: TabId;
  name: string;
  group: "Player" | "Visuals" | "Other";
}

export const TABS: TabDef[] = [
  { id: "combat", name: "Combat", group: "Player" },
  { id: "movement", name: "Movement", group: "Player" },
  { id: "player", name: "Player", group: "Player" },
  { id: "esp", name: "ESP", group: "Visuals" },
  { id: "world", name: "World", group: "Visuals" },
  { id: "other", name: "Other", group: "Visuals" },
  { id: "configs", name: "Cloud Configs", group: "Other" },
  { id: "friends", name: "Friends", group: "Other" },
  { id: "themes", name: "Themes", group: "Other" },
];

export const MODULES: Partial<Record<TabId, ModuleDef[]>> = {
  combat: [
    {
      name: "Aura", desc: "Attacks targets around you automatically.", on: true,
      settings: [
        { kind: "slider", name: "Range", value: 3.2, min: 2.5, max: 6, step: 0.1 },
        { kind: "mode", name: "Rotation", value: "Smooth", options: ["Smooth", "Snap", "Legit"] },
        { kind: "bool", name: "Only players", value: true },
      ],
    },
    { name: "AutoTotem", desc: "Keeps a totem in your offhand.", on: true },
    {
      name: "Velocity", desc: "Reduces the knockback you take.",
      settings: [
        { kind: "slider", name: "Horizontal", value: 40, min: 0, max: 100, step: 5, suffix: "%" },
        { kind: "slider", name: "Vertical", value: 100, min: 0, max: 100, step: 5, suffix: "%" },
      ],
    },
    { name: "TriggerBot", desc: "Swings when your crosshair is on a target." },
    { name: "Criticals", desc: "Lands critical hits more often." },
    {
      name: "AimAssist", desc: "Gently pulls your aim towards targets.",
      settings: [{ kind: "slider", name: "Strength", value: 35, min: 0, max: 100, step: 5, suffix: "%" }],
    },
    { name: "Hitboxes", desc: "Makes enemy hitboxes a little bigger." },
    { name: "AutoGapple", desc: "Eats a golden apple when your health drops." },
  ],
  movement: [
    { name: "AutoSprint", desc: "Sprints for you, always.", on: true },
    {
      name: "Speed", desc: "Moves you faster than normal.",
      settings: [{ kind: "mode", name: "Mode", value: "Grim", options: ["Grim", "Vanilla", "Strafe"] }],
    },
    { name: "NoWeb", desc: "Cobwebs no longer slow you down." },
    { name: "Spider", desc: "Climb up walls like a ladder." },
    { name: "ElytraStrafe", desc: "Better control while gliding." },
    { name: "Timer", desc: "Changes the game speed.", settings: [{ kind: "slider", name: "Speed", value: 1.1, min: 0.5, max: 3, step: 0.05, suffix: "x" }] },
    { name: "HighJump", desc: "Jump higher than usual." },
    { name: "NoJumpDelay", desc: "Removes the delay between jumps.", on: true },
  ],
  player: [
    { name: "AutoEat", desc: "Eats when you get hungry.", on: true },
    { name: "FreeCam", desc: "Fly the camera around without moving." },
    { name: "NoFall", desc: "Prevents fall damage." },
    { name: "MiddleClick", desc: "Middle-click a player to add a friend.", on: true },
    { name: "Scaffold", desc: "Places blocks under your feet." },
    { name: "InvUtils", desc: "Faster, smarter inventory handling." },
    { name: "AutoRespawn", desc: "Respawns instantly after death." },
    { name: "Stealer", desc: "Takes items out of chests quickly." },
  ],
  esp: [
    {
      name: "BoxESP", desc: "Draws boxes around players.", on: true,
      settings: [
        { kind: "mode", name: "Style", value: "Corners", options: ["Corners", "Full", "Glow"] },
        { kind: "bool", name: "Show friends", value: false },
      ],
    },
    { name: "Nametags", desc: "Clean nametags with health and armor.", on: true },
    { name: "Chams", desc: "See players through walls." },
    { name: "StorageESP", desc: "Highlights chests, shulkers and barrels." },
    { name: "TargetESP", desc: "Marks the player you're fighting.", on: true },
    { name: "SkeletonESP", desc: "Shows player skeletons." },
    { name: "Esp2D", desc: "Flat 2D boxes with health bars." },
    { name: "XRay", desc: "See ores through stone." },
  ],
  world: [
    { name: "SkyShader", desc: "A custom animated sky.", on: true },
    { name: "Ambience", desc: "Change the time of day, client-side.", settings: [{ kind: "slider", name: "Time", value: 18, min: 0, max: 24, step: 1, suffix: "h" }] },
    { name: "CustomFog", desc: "Soft, colored distance fog." },
    { name: "WorldParticles", desc: "Ambient particles around you." },
    { name: "JumpCircles", desc: "Rings on the ground when you land.", on: true },
    { name: "WorldColor", desc: "Tint the whole world." },
    { name: "Removals", desc: "Hide fire, pumpkins, bossbars and more." },
    { name: "RainGround", desc: "Wet ground effect while it rains." },
  ],
  other: [
    { name: "Notifications", desc: "Small popups when modules toggle.", on: true },
    { name: "NameProtect", desc: "Hides your name on screen." },
    { name: "BetterF5", desc: "Smoother third-person camera.", on: true },
    { name: "CustomFov", desc: "Set any field of view.", settings: [{ kind: "slider", name: "FOV", value: 100, min: 30, max: 140, step: 1 }] },
    { name: "DiscordRPC", desc: "Shows what you're playing on Discord." },
    { name: "AutoAuth", desc: "Logs in to servers for you." },
    { name: "Watermark", desc: "Client logo, FPS and ping in the corner.", on: true },
    { name: "Panic", desc: "Turns every module off at once." },
  ],
};

export const CONFIGS = [
  { name: "Sharp PvP", author: "rin", server: "FunTime", uses: 1240 },
  { name: "Legit Daily", author: "mira", server: "HolyWorld", uses: 860 },
  { name: "Visuals Only", author: "unreal", server: "Any", uses: 3120 },
  { name: "Duels Max", author: "kai", server: "ReallyWorld", uses: 540 },
];

export const FRIENDS = [
  { name: "mira", online: true, server: "FunTime" },
  { name: "kai", online: true, server: "HolyWorld" },
  { name: "lex", online: false, server: "" },
  { name: "ozzy", online: false, server: "" },
];

// Same count as the in-game accent picker (ModuleGrid COLOR_DOTS = 7); first is MoreSettings.DEFAULT_ACCENT.
export const ACCENTS = ["#FF5A1A", "#FF3B6B", "#A855F7", "#5B7CFF", "#22B8CF", "#2FBF71", "#F5B700"];
