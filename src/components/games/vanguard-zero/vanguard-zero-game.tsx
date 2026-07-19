"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { MatchMode } from "./missions/ghost-tide";

type GameWeapon = {
  id: string;
  name: string;
  damage: number;
  fireRate: number;
  ammo: number;
  maxAmmo: number;
  color: string;
};

type GameState = "menu" | "playing" | "paused" | "gameover";
type Vector3 = { x: number; y: number; z: number };

const WEAPONS: GameWeapon[] = [
  { id: "rifle", name: "M4 Carbine", damage: 22, fireRate: 100, ammo: 30, maxAmmo: 30, color: "#94a3b8" },
  { id: "shotgun", name: "SPAS-12", damage: 80, fireRate: 800, ammo: 8, maxAmmo: 8, color: "#f97316" },
  { id: "sniper", name: "AWP", damage: 120, fireRate: 1500, ammo: 5, maxAmmo: 5, color: "#22c55e" },
  { id: "pistol", name: "Glock-17", damage: 18, fireRate: 150, ammo: 17, maxAmmo: 17, color: "#e2e8f0" }
];

type Enemy = {
  id: number;
  x: number;
  y: number;
  z: number;
  health: number;
  maxHealth: number;
  speed: number;
  color: string;
  scale: number;
  type: string;
  lastAttack: number;
};

type Projectile = {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
  damage: number;
  color: string;
  life: number;
};

type VanguardZeroGameProps = {
  countryId?: string;
  matchMode?: MatchMode;
  onExit?: () => void;
};

export function VanguardZeroGame({ countryId, matchMode, onExit }: VanguardZeroGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    gameState: "menu" as GameState,
    health: 100,
    maxHealth: 100,
    kills: 0,
    deaths: 0,
    wave: 1,
    score: 0,
    xp: 0,
    level: 1,
    weaponIndex: 0,
    lastShot: 0,
    mouseX: 0,
    mouseY: 0,
    cameraX: 0,
    cameraY: 1.6,
    cameraZ: 25,
    cameraRotY: 0,
    cameraRotX: 0,
    keys: {} as Record<string, boolean>,
    enemies: [] as Enemy[],
    projectiles: [] as Projectile[],
    lastEnemySpawn: 0,
    enemyIdCounter: 0,
    waveEnemiesLeft: 0,
    waveEnemiesSpawned: 0,
    waveCooldown: 0,
    hitMarkerTimer: 0,
    crosshairSpread: 0,
    muzzleFlash: 0,
    reloading: false,
    reloadTimer: 0,
    damageFlash: 0
  });

  const [hud, setHud] = useState({
    health: 100,
    ammo: 30,
    maxAmmo: 30,
    weapon: "M4 Carbine",
    kills: 0,
    wave: 1,
    score: 0,
    xp: 0,
    level: 1,
    hitMarker: false,
    muzzleFlash: false,
    damageFlash: false,
    reloading: false
  });

  const getWeapon = useCallback(() => WEAPONS[stateRef.current.weaponIndex], []);

  const spawnEnemy = useCallback(() => {
    const s = stateRef.current;
    const types = [
      { health: 40, speed: 4, color: "#ef4444", scale: 0.8, type: "drone" },
      { health: 30, speed: 8, color: "#f97316", scale: 0.7, type: "rusher" },
      { health: 120, speed: 2, color: "#7c3aed", scale: 1.2, type: "heavy" },
      { health: 35, speed: 3, color: "#06b6d4", scale: 0.9, type: "marksman" }
    ];
    const t = s.wave >= 8 ? types[2] : types[Math.floor(Math.random() * Math.min(types.length, 1 + Math.floor(s.wave / 2)))];
    const angle = Math.random() * Math.PI * 2;
    const dist = 25 + Math.random() * 10;
    s.enemies.push({
      id: s.enemyIdCounter++,
      x: Math.sin(angle) * dist,
      y: 1,
      z: s.cameraZ - Math.cos(angle) * dist - 5,
      health: t.health * (1 + s.wave * 0.1),
      maxHealth: t.health * (1 + s.wave * 0.1),
      speed: t.speed,
      color: t.color,
      scale: t.scale,
      type: t.type,
      lastAttack: 0
    });
  }, []);

  const shoot = useCallback(() => {
    const s = stateRef.current;
    const w = getWeapon();
    const now = Date.now();
    if (s.reloading || now - s.lastShot < w.fireRate || w.ammo <= 0) return;
    s.lastShot = now;
    w.ammo--;
    s.muzzleFlash = 5;
    s.crosshairSpread = 10;

    const spread = (Math.random() - 0.5) * 0.05;
    s.projectiles.push({
      x: s.cameraX,
      y: s.cameraY,
      z: s.cameraZ,
      dx: Math.sin(s.cameraRotY + spread) * -1,
      dy: Math.sin(s.cameraRotX) * -1,
      dz: Math.cos(s.cameraRotY + spread) * -1,
      damage: w.damage,
      color: w.color,
      life: 60
    });
  }, [getWeapon]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onKey = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key.toLowerCase()] = e.type === "keydown";
      if (e.key === "Escape") {
        const s = stateRef.current;
        if (s.gameState === "playing") s.gameState = "paused";
        else if (s.gameState === "paused") s.gameState = "playing";
      }
      if (e.key.toLowerCase() === "r") {
        const s = stateRef.current;
        const w = WEAPONS[s.weaponIndex];
        if (w.ammo < w.maxAmmo && !s.reloading) {
          s.reloading = true;
          s.reloadTimer = 1500;
        }
      }
      const weaponKeys = ["1", "2", "3", "4"];
      const idx = weaponKeys.indexOf(e.key);
      if (idx >= 0 && idx < WEAPONS.length) {
        stateRef.current.weaponIndex = idx;
      }
    };

    const onMouse = (e: MouseEvent) => {
      if (stateRef.current.gameState !== "playing") return;
      stateRef.current.cameraRotY += e.movementX * 0.002;
      stateRef.current.cameraRotX = Math.max(-1.2, Math.min(1.2, stateRef.current.cameraRotX + e.movementY * 0.002));
    };

    const onClick = () => {
      if (stateRef.current.gameState === "playing") {
        canvas.requestPointerLock();
        shoot();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("click", onClick);

    let animFrame: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      const s = stateRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#0a0a1a");
      skyGrad.addColorStop(0.5, "#111128");
      skyGrad.addColorStop(1, "#1a1a2e");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      if (s.gameState === "menu") {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 36px 'Bebas Neue', Impact, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("VANGUARD ZERO", w / 2, h / 2 - 40);
        ctx.font = "14px system-ui";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(countryId ? `${countryId.toUpperCase()} — ${matchMode ?? "mission"}` : "Global Tournament FPS", w / 2, h / 2);
        ctx.fillText("Click to start · WASD move · Mouse aim · Click shoot · R reload · 1-4 weapons", w / 2, h / 2 + 30);

        const btnW = 180;
        const btnH = 44;
        const btnX = w / 2 - btnW / 2;
        const btnY = h / 2 + 55;
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 8);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px system-ui";
        ctx.fillText("DEPLOY", w / 2, btnY + 28);

        canvas.onclick = () => {
          if (s.gameState === "menu") {
            s.gameState = "playing";
            s.health = 100;
            s.kills = 0;
            s.deaths = 0;
            s.wave = 1;
            s.score = 0;
            s.xp = 0;
            s.level = 1;
            s.weaponIndex = 0;
            s.enemies = [];
            s.projectiles = [];
            s.waveEnemiesLeft = 5;
            s.waveEnemiesSpawned = 0;
            WEAPONS.forEach((w, i) => { w.ammo = WEAPONS[i].maxAmmo; });
            canvas.requestPointerLock();
          }
        };
        animFrame = requestAnimationFrame(loop);
        return;
      }

      if (s.gameState === "paused") {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 28px 'Bebas Neue', Impact, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", w / 2, h / 2);
        ctx.font = "13px system-ui";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("Press ESC to resume", w / 2, h / 2 + 25);
        animFrame = requestAnimationFrame(loop);
        return;
      }

      if (s.gameState === "gameover") {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 32px 'Bebas Neue', Impact, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MISSION FAILED", w / 2, h / 2 - 30);
        ctx.fillStyle = "#fff";
        ctx.font = "14px system-ui";
        ctx.fillText(`Kills: ${s.kills} · Score: ${s.score} · Wave: ${s.wave}`, w / 2, h / 2 + 5);
        animFrame = requestAnimationFrame(loop);
        return;
      }

      // Movement
      const speed = 0.12 * dt;
      const forward = { x: -Math.sin(s.cameraRotY), z: -Math.cos(s.cameraRotY) };
      const right = { x: Math.cos(s.cameraRotY), z: -Math.sin(s.cameraRotY) };
      if (s.keys["w"]) { s.cameraX += forward.x * speed; s.cameraZ += forward.z * speed; }
      if (s.keys["s"]) { s.cameraX -= forward.x * speed; s.cameraZ -= forward.z * speed; }
      if (s.keys["a"]) { s.cameraX += right.x * speed; s.cameraZ += right.z * speed; }
      if (s.keys["d"]) { s.cameraX -= right.x * speed; s.cameraZ -= right.z * speed; }

      // Reload
      if (s.reloading) {
        s.reloadTimer -= 16.667 * dt;
        if (s.reloadTimer <= 0) {
          s.reloading = false;
          WEAPONS[s.weaponIndex].ammo = WEAPONS[s.weaponIndex].maxAmmo;
        }
      }

      // Auto-fire on hold
      if (s.keys[""]) shoot();

      // Spawn enemies
      if (s.waveEnemiesSpawned < s.waveEnemiesLeft) {
        s.lastEnemySpawn += 16.667 * dt;
        if (s.lastEnemySpawn > 1200 - s.wave * 50) {
          s.lastEnemySpawn = 0;
          s.waveEnemiesSpawned++;
          spawnEnemy();
        }
      }

      // Update enemies
      for (let i = s.enemies.length - 1; i >= 0; i--) {
        const e = s.enemies[i];
        const dx = s.cameraX - e.x;
        const dz = s.cameraZ - e.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 1) {
          e.x += (dx / dist) * e.speed * 0.02 * dt;
          e.z += (dz / dist) * e.speed * 0.02 * dt;
        }
        if (dist < 2) {
          const now = Date.now();
          if (now - e.lastAttack > 1000) {
            e.lastAttack = now;
            s.health -= 10 + s.wave * 2;
            s.damageFlash = 10;
            if (s.health <= 0) {
              s.gameState = "gameover";
              s.deaths++;
            }
          }
        }
      }

      // Update projectiles
      for (let i = s.projectiles.length - 1; i >= 0; i--) {
        const p = s.projectiles[i];
        p.x += p.dx * 1.5 * dt;
        p.y += p.dy * 1.5 * dt;
        p.z += p.dz * 1.5 * dt;
        p.life -= dt;
        if (p.life <= 0) { s.projectiles.splice(i, 1); continue; }

        for (let j = s.enemies.length - 1; j >= 0; j--) {
          const e = s.enemies[j];
          const d = Math.sqrt((p.x - e.x) ** 2 + (p.z - e.z) ** 2);
          if (d < 1.5) {
            e.health -= p.damage;
            s.hitMarkerTimer = 8;
            s.projectiles.splice(i, 1);
            if (e.health <= 0) {
              s.kills++;
              s.score += 100;
              s.xp += 20;
              s.enemies.splice(j, 1);
            }
            break;
          }
        }
      }

      // Wave check
      if (s.waveEnemiesLeft > 0 && s.waveEnemiesSpawned >= s.waveEnemiesLeft && s.enemies.length === 0) {
        s.waveCooldown += 16.667 * dt;
        if (s.waveCooldown > 2000) {
          s.wave++;
          s.waveEnemiesLeft = 5 + s.wave * 2;
          s.waveEnemiesSpawned = 0;
          s.waveCooldown = 0;
          s.score += 500;
        }
      }

      // --- RENDER ---
      const cx = w / 2;
      const cy = h / 2;
      const fov = 600;

      // Ground grid
      ctx.strokeStyle = "rgba(100,200,255,0.06)";
      ctx.lineWidth = 1;
      for (let gz = -40; gz <= 40; gz += 4) {
        const rz = gz + s.cameraZ;
        if (rz < 0) continue;
        const projZ = fov / rz;
        ctx.beginPath();
        ctx.moveTo(cx - projZ * 20, cy + projZ * 1.6);
        ctx.lineTo(cx + projZ * 20, cy + projZ * 1.6);
        ctx.stroke();
      }

      // Draw cover blocks
      const coverPoints = [
        { x: -10, z: 5, w: 4, h: 2 }, { x: 10, z: 5, w: 4, h: 2 },
        { x: -5, z: -10, w: 6, h: 2 }, { x: 8, z: -15, w: 4, h: 3 }
      ];
      for (const c of coverPoints) {
        const rz = c.z + s.cameraZ;
        const rx = c.x - s.cameraX;
        if (rz < 1) continue;
        const s2 = fov / rz;
        const sx = cx + rx * s2;
        const sy = cy + 1.6 * s2;
        const sw = c.w * s2;
        const sh = c.h * s2;
        ctx.fillStyle = "rgba(50,70,100,0.5)";
        ctx.fillRect(sx - sw / 2, sy - sh, sw, sh);
        ctx.strokeStyle = "rgba(100,160,255,0.25)";
        ctx.strokeRect(sx - sw / 2, sy - sh, sw, sh);
      }

      // Draw enemies
      for (const e of s.enemies) {
        const rz = e.z - s.cameraZ;
        const rx = e.x - s.cameraX;
        if (rz < 0.5) continue;
        const scale = fov / rz * e.scale;
        const sx = cx + rx * scale;
        const sy = cy + (e.y - s.cameraY) * scale;

        // Body
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(sx, sy, scale * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Health bar
        if (e.health < e.maxHealth) {
          const barW = scale * 0.8;
          const barH = 3;
          ctx.fillStyle = "#333";
          ctx.fillRect(sx - barW / 2, sy - scale * 0.5 - 8, barW, barH);
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(sx - barW / 2, sy - scale * 0.5 - 8, barW * (e.health / e.maxHealth), barH);
        }

        // Glow
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(sx, sy, scale * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw projectiles
      for (const p of s.projectiles) {
        const rz = p.z - s.cameraZ;
        const rx = p.x - s.cameraX;
        if (rz < 0.5) continue;
        const scale = fov / rz;
        const sx = cx + rx * scale;
        const sy = cy + (p.y - s.cameraY) * scale;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Crosshair
      const chSpread = s.crosshairSpread;
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 10 - chSpread, cy); ctx.lineTo(cx - 4 - chSpread, cy);
      ctx.moveTo(cx + 4 + chSpread, cy); ctx.lineTo(cx + 10 + chSpread, cy);
      ctx.moveTo(cx, cy - 10 - chSpread); ctx.lineTo(cx, cy - 4 - chSpread);
      ctx.moveTo(cx, cy + 4 + chSpread); ctx.lineTo(cx, cy + 10 + chSpread);
      ctx.stroke();

      // Hit marker
      if (s.hitMarkerTimer > 0) {
        s.hitMarkerTimer -= dt;
        ctx.strokeStyle = `rgba(255,255,255,${s.hitMarkerTimer / 8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 8); ctx.lineTo(cx - 3, cy - 3);
        ctx.moveTo(cx + 8, cy - 8); ctx.lineTo(cx + 3, cy - 3);
        ctx.moveTo(cx - 8, cy + 8); ctx.lineTo(cx - 3, cy + 3);
        ctx.moveTo(cx + 8, cy + 8); ctx.lineTo(cx + 3, cy + 3);
        ctx.stroke();
      }

      // Muzzle flash
      if (s.muzzleFlash > 0) {
        s.muzzleFlash -= dt;
        ctx.fillStyle = `rgba(255,200,50,${s.muzzleFlash / 5})`;
        ctx.beginPath();
        ctx.arc(cx, cy + 30, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Damage flash
      if (s.damageFlash > 0) {
        s.damageFlash -= dt;
        ctx.fillStyle = `rgba(255,0,0,${s.damageFlash / 20})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Weapon model (bottom)
      const weaponW = 120;
      const weaponH = 50;
      const weaponX = cx - weaponW / 2 + Math.sin(now / 300) * 2;
      const weaponY = h - weaponH - 20;
      ctx.fillStyle = "rgba(40,50,70,0.9)";
      ctx.beginPath();
      ctx.roundRect(weaponX, weaponY, weaponW, weaponH, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(100,160,255,0.3)";
      ctx.strokeRect(weaponX, weaponY, weaponW, weaponH);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 10px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(WEAPONS[s.weaponIndex].name, cx, weaponY + weaponH / 2 + 4);

      // Update HUD
      s.crosshairSpread *= 0.9;
      setHud({
        health: s.health,
        ammo: WEAPONS[s.weaponIndex].ammo,
        maxAmmo: WEAPONS[s.weaponIndex].maxAmmo,
        weapon: WEAPONS[s.weaponIndex].name,
        kills: s.kills,
        wave: s.wave,
        score: s.score,
        xp: s.xp,
        level: s.level,
        hitMarker: s.hitMarkerTimer > 0,
        muzzleFlash: s.muzzleFlash > 0,
        damageFlash: s.damageFlash > 0,
        reloading: s.reloading
      });

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("click", onClick);
    };
  }, [countryId, matchMode, shoot, spawnEnemy]);

  return (
    <div className="vanguard-zero-game relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ cursor: "crosshair" }} />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top bar */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {countryId && (
              <span className="rounded-lg border border-white/20 bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                {countryId.toUpperCase()} · {matchMode ?? "mission"}
              </span>
            )}
            <span className="rounded-lg border border-green-500/30 bg-black/60 px-2 py-1 text-[10px] font-bold text-green-400 backdrop-blur-sm">
              WAVE {hud.wave}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-white/20 bg-black/60 px-2 py-1 text-[10px] font-bold text-yellow-400 backdrop-blur-sm">
              SCORE {hud.score}
            </span>
            <span className="rounded-lg border border-white/20 bg-black/60 px-2 py-1 text-[10px] font-bold text-blue-400 backdrop-blur-sm">
              XP {hud.xp}
            </span>
          </div>
        </div>

        {/* Health bar */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-white">HP</span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all ${hud.health > 50 ? "bg-green-500" : hud.health > 25 ? "bg-yellow-500" : "bg-red-500"}`}
                style={{ width: `${(hud.health / 100) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-white">{Math.max(0, hud.health)}</span>
          </div>
        </div>

        {/* Ammo */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-2">
            {hud.reloading ? (
              <span className="text-[10px] font-bold text-yellow-400 animate-pulse">RELOADING...</span>
            ) : (
              <>
                <span className="text-[10px] font-bold text-white">{hud.weapon}</span>
                <span className="font-mono text-sm font-bold text-white">{hud.ammo}/{hud.maxAmmo}</span>
              </>
            )}
          </div>
        </div>

        {/* Kills */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <span className="rounded-lg border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold text-red-400 backdrop-blur-sm">
            KILLS {hud.kills}
          </span>
        </div>
      </div>

      {onExit && (
        <button
          type="button"
          onClick={onExit}
          className="pointer-events-auto absolute top-3 right-3 z-20 rounded-lg border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm hover:bg-white/10"
        >
          EXIT
        </button>
      )}
    </div>
  );
}
