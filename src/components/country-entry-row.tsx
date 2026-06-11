export function CountryEntryRow({ country, flag }: { country: string; flag: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a82a8]">Entry info · Country</p>
      <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#f0edf8]">
        <span>{country}</span>
        <span className="text-base leading-none">{flag}</span>
      </p>
    </div>
  );
}
