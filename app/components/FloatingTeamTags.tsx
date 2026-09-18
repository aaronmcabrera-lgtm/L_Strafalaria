"use client";

/**
 * FloatingTeamTags
 * -----------------
 * Etiquetas que nacen justo en el punto del cursor (o del dedo, en móvil),
 * crecen suave hasta su tamaño final (sin rebote), se quedan un instante
 * y luego se encogen mientras se desvanecen. No se desplazan ni "caen":
 * nacen y mueren en el mismo punto. El efecto de "seguir al cursor" es un
 * truco de trail — como nacen muy seguido mientras mueves el mouse, da la
 * sensación de una estela seguidora.
 *
 * Cada equipo trae sus propios colores (bg = fondo de la etiqueta,
 * fg = color del texto), en vez de un color al azar de una paleta
 * compartida — así cada nombre sale siempre con sus colores reales.
 *
 * USO en app/page.tsx:
 *
 *   <section style={{ position: "relative" }}>
 *     <FloatingTeamTags className="z-20" />
 *     ...el resto de tu hero (logo, slogan, CTA)...
 *   </section>
 */

import { useCallback, useEffect, useRef } from "react";

export type TeamTag = { name: string; bg: string; fg: string };

const DEFAULT_TEAMS: TeamTag[] = [
  { name: "PERROS NEGROS", bg: "#0a0a0f", fg: "#ffffff" },
  { name: "COWBOYS", bg: "#0057ff", fg: "#ffffff" },
  { name: "REDSKINS", bg: "#ff1744", fg: "#fff200" },
  { name: "BORREGOS", bg: "#0057ff", fg: "#ffffff" },
  { name: "COMANCHES", bg: "#fff200", fg: "#0a0a0f" },
  { name: "BENGALS", bg: "#0a0a0f", fg: "#ff6d00" },
  { name: "PITTSBURGH", bg: "#0a0a0f", fg: "#fff200" },
  { name: "PATRIOTS", bg: "#d7263d", fg: "#e8f1ff" },
  { name: "DRAGONES", bg: "#ff1744", fg: "#fff200" },
  { name: "CHICAGO", bg: "#0057ff", fg: "#ff6d00" },
  { name: "ÁGUILAS", bg: "#ff1744", fg: "#ffffff" },
  { name: "PUMAS", bg: "#0057ff", fg: "#ffd60a" },
  { name: "LINCES", bg: "#0a0a0f", fg: "#ff3b5c" },
  { name: "BUCANEROS", bg: "#0057ff", fg: "#ffd60a" },
  { name: "RAIDERS", bg: "#0a0a0f", fg: "#e0f7ff" },
  { name: "MIAMI", bg: "#00e5ff", fg: "#ffffff" },
  { name: "EAGLES", bg: "#00e676", fg: "#eafff5" },
  { name: "BRONCOS", bg: "#ff6d00", fg: "#0057ff" },
  { name: "CHARGERS", bg: "#0057ff", fg: "#fff200" },
  { name: "CHIEFS", bg: "#ff1744", fg: "#fff200" },
  { name: "CIMARRONES", bg: "#0a0a0f", fg: "#00d4ff" },
  { name: "UDLA", bg: "#00e676", fg: "#ff6d00" },
  { name: "ANÁHUAC", bg: "#ff6d00", fg: "#0a0a0f" },
  { name: "OSOS", bg: "#0057ff", fg: "#ffffff" },
  { name: "AUTÉNTICOS TIGRES", bg: "#0057ff", fg: "#ffd60a" },
  { name: "KANSAS", bg: "#ff1744", fg: "#fff200" },
  { name: "BULLDOGS", bg: "#0057ff", fg: "#ffffff" },
  { name: "COLTS", bg: "#0057ff", fg: "#ffffff" },
  { name: "VIKINGS", bg: "#b026ff", fg: "#ffffff" },
  { name: "SEAHAWKS", bg: "#0057ff", fg: "#39ff14" },
  { name: "CARDINALS", bg: "#0a0a0f", fg: "#ff3b5c" },
  { name: "TITANS", bg: "#00d4ff", fg: "#ff1744" },
  { name: "RAMS", bg: "#0057ff", fg: "#fff200" },
  { name: "BILLS", bg: "#0057ff", fg: "#ff3b5c" },
  { name: "JETS", bg: "#00e676", fg: "#ffffff" },
  { name: "49ERS", bg: "#d7263d", fg: "#f2f2f2" },
  { name: "GIGANTES", bg: "#0057ff", fg: "#ff3b5c" },
  { name: "FALCONS", bg: "#0a0a0f", fg: "#ff3b5c" },
  { name: "THE CREW", bg: "#0a0a0f", fg: "#39ff14" },
  { name: "GATORS", bg: "#ff6d00", fg: "#0057ff" },
  { name: "LEGENDS", bg: "#0a0a0f", fg: "#ffffff" },
];

interface FloatingTeamTagsProps {
  /** Lista de equipos con sus colores propios. Por defecto: la lista de Strafalaria. */
  teams?: TeamTag[];
  /** Milisegundos mínimos entre etiquetas nuevas (controla la densidad de la estela). */
  throttleMs?: number;
  /** Duración de la animación de entrada (suave, sin rebote), en ms. */
  popInMs?: number;
  /** Duración de la animación de salida (encoger + desvanecer), en ms. Más corta que la entrada. */
  popOutMs?: number;
  /** Tiempo mínimo que la etiqueta se queda a tamaño completo antes de empezar a salir, en ms (~15 frames extra respecto a la versión anterior). */
  holdMinMs?: number;
  /** Variación aleatoria adicional sobre holdMinMs, en ms. */
  holdRangeMs?: number;
  className?: string;
}

export default function FloatingTeamTags({
  teams = DEFAULT_TEAMS,
  throttleMs = 147,
  popInMs = 420,
  popOutMs = 220,
  holdMinMs = 250,
  holdRangeMs = 80,
  className,
}: FloatingTeamTagsProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);

  const spawnTag = useCallback(
    (x: number, y: number) => {
      const layer = layerRef.current;
      if (!layer) return;

      const team = teams[Math.floor(Math.random() * teams.length)];
      const rotation = Math.random() * 34 - 17;

      const tag = document.createElement("span");
      tag.textContent = team.name;
      Object.assign(tag.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        background: team.bg,
        color: team.fg,
        fontWeight: "700",
        fontSize: "9px",
        letterSpacing: "0.04em",
        padding: "5px 10px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        transformOrigin: "center center",
        willChange: "transform, opacity",
        boxShadow:
          "0 6px 16px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
      });
      layer.appendChild(tag);

      const base = `translate(-50%, -50%) rotate(${rotation}deg)`;

      // Entrada: nace chica y transparente, crece suave hasta su tamaño final (sin rebote)
      const popIn = tag.animate(
        [
          { transform: `${base} scale(0.3)`, opacity: 0 },
          { transform: `${base} scale(1)`, opacity: 1 },
        ],
        {
          duration: popInMs,
          easing: "ease-out",
          fill: "forwards",
        }
      );

      popIn.onfinish = () => {
        const holdMs = holdMinMs + Math.random() * holdRangeMs;
        window.setTimeout(() => {
          // Salida: encoge y se desvanece — más rápida que la entrada
          const popOut = tag.animate(
            [
              { transform: `${base} scale(1)`, opacity: 1 },
              { transform: `${base} scale(0.35)`, opacity: 0 },
            ],
            { duration: popOutMs, easing: "ease-in", fill: "forwards" }
          );
          popOut.onfinish = () => tag.remove();
        }, holdMs);
      };
    },
    [teams, popInMs, popOutMs, holdMinMs, holdRangeMs]
  );

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // Escuchamos en window para no depender de pointer-events en la capa,
    // y así nunca interferimos con clics en el contenido real del hero.
    const handlePointer = (clientX: number, clientY: number) => {
      const rect = layer.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      if (!inside) return;

      const now = Date.now();
      if (now - lastSpawn.current < throttleMs) return;
      lastSpawn.current = now;
      spawnTag(clientX - rect.left, clientY - rect.top);
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) handlePointer(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [spawnTag, throttleMs]);

  return (
    <div
      ref={layerRef}
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    />
  );
}
