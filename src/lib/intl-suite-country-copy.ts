/** International SUITE built-room · one-click enter label per country */
const enterOneClickByCountryId: Record<string, (flag: string) => string> = {
  colombia: (flag) => `${flag} ENTRAR SALA`,
  ecuador: (flag) => `${flag} ENTRAR SALA`,
  uk: (flag) => `${flag} ENTER ROOM · 1 click enter`,
  japan: (flag) => `${flag} ルームへ · 1クリックで入る`,
  china: (flag) => `${flag} 进入房间 · 一键进入`
};

export function getIntlSuiteEnterRoomOneClick(countryId: string, flag: string, fallback: string) {
  const localized = enterOneClickByCountryId[countryId];
  if (localized) return localized(flag);
  return `${flag} ${fallback}`;
}
