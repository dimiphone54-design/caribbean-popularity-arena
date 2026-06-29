import Image from "next/image";

export function EldersTableLockPanel() {
  return (
    <div className="luxury-plan-lock-panel" aria-label="AI Real Life Lock">
      <Image
        src="/elders-table-ai-lock-panel.png"
        alt=""
        fill
        className="luxury-plan-lock-panel-bg"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
      <div className="luxury-plan-lock-panel-overlay" aria-hidden="true" />
    </div>
  );
}
