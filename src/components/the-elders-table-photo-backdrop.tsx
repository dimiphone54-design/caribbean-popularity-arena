export function TheEldersTablePhotoBackdrop() {
  return (
    <div className="elders-table-backdrop pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="elders-table-noir-photo absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/elders-table-tokyo-marrakech-noir.png')" }}
      />
      <div className="elders-table-noir-scrim absolute inset-0" />
      <div className="elders-table-noir-vignette absolute inset-0" />
    </div>
  );
}
