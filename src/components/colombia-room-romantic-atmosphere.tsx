export function ColombiaRoomRomanticAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] h-dvh w-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(251, 113, 133, 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(159, 18, 57, 0.14), transparent 50%), radial-gradient(ellipse 50% 35% at 0% 80%, rgba(251, 191, 36, 0.06), transparent 45%)"
        }}
      />
      <div className="colombia-romantic-glow colombia-romantic-glow-a" />
      <div className="colombia-romantic-glow colombia-romantic-glow-b" />
      <div className="colombia-romantic-petals">
        {["🌹", "💕", "🌺", "✨", "💃", "🌹", "💕", "🌺"].map((petal, index) => (
          <span key={`${petal}-${index}`} className={`colombia-romantic-petal colombia-romantic-petal-${index + 1}`}>
            {petal}
          </span>
        ))}
      </div>
    </div>
  );
}
