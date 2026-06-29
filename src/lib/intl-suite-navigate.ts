import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** Portal menu unmounts on close — push first so room links still navigate. */
export function navigateIntlSuiteLink(
  router: AppRouterInstance,
  href: string,
  onNavigate?: () => void
) {
  router.push(href);
  onNavigate?.();
}
