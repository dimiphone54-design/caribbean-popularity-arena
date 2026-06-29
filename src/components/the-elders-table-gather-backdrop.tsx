import { eldersTableLegacyMembersClassic, type EldersTableLegacyMember } from "@/lib/the-elders-table-legacy";

type TheEldersTableGatherBackdropProps = {
  members?: EldersTableLegacyMember[];
  /** Lighter layer when stacked inside the #5 composite backdrop. */
  embedded?: boolean;
};

export function TheEldersTableGatherBackdrop({
  members = eldersTableLegacyMembersClassic,
  embedded = false
}: TheEldersTableGatherBackdropProps) {
  return (
    <div
      className={`elders-table-backdrop pointer-events-none absolute inset-0 overflow-hidden${
        embedded ? " elders-table-gather-embedded" : ""
      }`}
      aria-hidden="true"
    >
      {!embedded ? (
        <div
          className="elders-table-backdrop-base absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cotswolds-everyone-unified.png')" }}
        />
      ) : null}
      <div className="elders-table-marrakech-glow absolute inset-0" />
      <div className="elders-table-gather-grid absolute inset-0">
        {members.map((member, index) => {
          const isMan = member.group === "gym-men" || member.group === "morocco-rich-men";

          return (
            <div
              key={member.id}
              className={`elders-table-gather-cell elders-table-gather-cell-${index % 3}${
                isMan ? " elders-table-gather-cell-man" : " elders-table-gather-cell-woman"
              }`}
              style={{
                backgroundImage: `url('${member.backgroundImage}')`,
                gridColumn: member.gridColumn
              }}
            />
          );
        })}
      </div>
      {!embedded ? (
        <>
          <div className="elders-table-velvet-scrim absolute inset-0" />
          <div className="elders-table-vignette absolute inset-0" />
          <div className="elders-table-slideshow-grain absolute inset-0" />
        </>
      ) : null}
    </div>
  );
}
