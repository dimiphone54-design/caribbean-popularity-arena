const FLASH_CLASS = "a2030-intl-neon-flash";
const FLASH_MS = 720;

export function triggerIntlSuiteNeonFlash(element: HTMLElement) {
  element.classList.remove(FLASH_CLASS);
  void element.offsetWidth;
  element.classList.add(FLASH_CLASS);
  window.setTimeout(() => element.classList.remove(FLASH_CLASS), FLASH_MS);
}

export function onIntlSuiteNeonFlashClick(event: React.MouseEvent<HTMLElement>) {
  const row = event.currentTarget.closest(
    ".a2030-intl-suite-country-row-built, .a2030-intl-country-panel-built, .a2030-intl-country-panel--open"
  );
  triggerIntlSuiteNeonFlash((row ?? event.currentTarget) as HTMLElement);
}
