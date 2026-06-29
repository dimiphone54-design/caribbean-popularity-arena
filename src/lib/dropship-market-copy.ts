import type { DropshipOrder, DropshipProduct } from "@/lib/dropshipping";
import { internationalSuiteCountries } from "@/lib/international-suite";

export type DropshipCopyLocale = "en" | "es" | "es-CO" | "es-EC" | "ja" | "zh";

const spanishCountryIds = new Set(["venezuela", "trinidad", "jamaica", "guyana"]);

export function resolveDropshipCopyLocale(countryId: string): DropshipCopyLocale {
  if (countryId === "japan") return "ja";
  if (countryId === "china") return "zh";
  if (countryId === "colombia") return "es-CO";
  if (countryId === "ecuador") return "es-EC";
  if (spanishCountryIds.has(countryId)) return "es";
  return "en";
}

export function isJapanDropshipMarket(countryId: string) {
  return resolveDropshipCopyLocale(countryId) === "ja";
}

export function isChinaDropshipMarket(countryId: string) {
  return resolveDropshipCopyLocale(countryId) === "zh";
}

export function isEcuadorDropshipMarket(countryId: string) {
  return resolveDropshipCopyLocale(countryId) === "es-EC";
}

export function isEastAsiaDropshipMarket(countryId: string) {
  const locale = resolveDropshipCopyLocale(countryId);
  return locale === "ja" || locale === "zh";
}

export type DropshipMarketCopy = {
  title: string;
  subtitle: string;
  /** Room panel · top-center header (China: DROP SHIPPING) */
  roomHeaderTitle?: string;
  roomHeaderTitleLead?: string;
  roomHeaderTitleTrail?: string;
  roomHeaderIconSrc?: string;
  marketOnlyBadge: string;
  dropshipBadge: string;
  roomSub: (flag: string, countryName: string) => string;
  roomIntroAria: (countryName: string) => string;
  steps: ReadonlyArray<{ title: string; body: string }>;
  shipsFrom: string;
  buy: string;
  categoryAria: string;
  categoryTech: string;
  categoryAutomotive: string;
  legalShort: string;
  checkoutStreetAddress: string;
  checkoutPayLoading: string;
  checkoutPayButton: (price: string) => string;
  checkoutErrorStart: string;
  checkoutErrorNetwork: string;
  orderPlaced: (category: string, city: string) => string;
  orderStarted: string;
  ordersTitle: (flag: string, countryName: string) => string;
  ordersLoading: string;
  ordersEmpty: string;
  ordersItemFallback: string;
  orderStatus: Record<DropshipOrder["status"], string>;
  aiTitle: string;
  aiSub: string;
  aiExact: string;
  aiLead: string;
  aiFrom: string;
  aiTo: string;
  aiUsd: string;
  aiFxLabel: string;
  aiSplitLabel: string;
  aiAuto: string;
  aiSplitCompact: (host50: string, host70: string) => string;
  aiSplit5050: (host: string, platform: string) => string;
  aiSplit7030: (host: string, platform: string) => string;
  aiSplitFormula: (margin: string, gross: string) => string;
  aiAria: string;
  checkoutKicker: string;
  checkoutShipsMeta: (shipsFrom: string, price: string, countryName: string) => string;
  checkoutNote: (origin: string) => string;
  checkoutClose: string;
  checkoutFullName: string;
  checkoutEmail: string;
  checkoutPhone: string;
  checkoutAddress: string;
  checkoutCity: string;
  checkoutPostal: string;
  checkoutCountry: string;
  checkoutPay: string;
  checkoutCancel: string;
  enterMarketWithCountry: (flag: string, countryName: string) => string;
  enterMarketFull: string;
  enterCompact: string;
  enterHint: string;
  intlNoGate: string;
  marketOnlyNoGate: string;
  laneBadge: (flag: string, countryName: string) => string;
  marketPageDesc: (countryName: string) => string;
  switchCountryLane: string;
  laneTechName: (countryName: string) => string;
  laneTechDesc: string;
  laneAutoName: (countryName: string) => string;
  laneAutoDesc: string;
  openFullMarket: (countryName: string) => string;
};

const enCopy: DropshipMarketCopy = {
  title: "Dropship Market",
  subtitle: "Browse · buy on arena · supplier ships direct to you",
  marketOnlyBadge: "MARKET ONLY",
  dropshipBadge: "DROPSHIP",
  roomSub: (_flag, countryName) => `${countryName} · supplier ships direct · market only`,
  roomIntroAria: (countryName) => `${countryName} dropship market intro`,
  steps: [
    { title: "1 · Browse", body: "Pick a product from this country lane." },
    { title: "2 · Pay", body: "Checkout on arena · enter ship address." },
    { title: "3 · Supplier ships", body: "Partner packs direct · no stock here." },
    { title: "4 · Track", body: "Same email · status updates here." }
  ],
  shipsFrom: "Ships from",
  buy: "Buy · dropship",
  categoryAria: "Dropship category options",
  categoryTech: "📱 Tech & Gadgets",
  categoryAutomotive: "🚗 Automotive & Car Accessories",
  legalShort: "",
  checkoutStreetAddress: "Street address",
  checkoutPayLoading: "Starting…",
  checkoutPayButton: (price) => `Pay ${price} · dropship`,
  checkoutErrorStart: "Could not start checkout",
  checkoutErrorNetwork: "Network error — try again",
  orderPlaced: (category, city) => `Order placed · ${category} ships to ${city}`,
  orderStarted: "Order started — complete payment to confirm",
  ordersTitle: (flag, countryName) => `Your orders · ${flag} ${countryName}`,
  ordersLoading: "Loading orders…",
  ordersEmpty: "No orders yet — buy above with your email · track status here after checkout",
  ordersItemFallback: "Dropship item",
  orderStatus: {
    pending_payment: "Awaiting payment",
    ordered: "Ordered · preparing",
    shipped: "Shipped",
    delivered: "Delivered"
  },
  aiTitle: "LIVE AI GENERATOR · DROPSHIPPING",
  aiSub: "AI AUTOMATED · EXACT INFO",
  aiExact: "EXACT",
  aiLead: "Real-time FX · Arena Plus split · auto exact calc.",
  aiFrom: "From",
  aiTo: "To",
  aiUsd: "USD",
  aiFxLabel: "FX · EXACT",
  aiSplitLabel: "SPLIT · AUTO",
  aiAuto: "AUTO",
  aiSplitCompact: (host50, host70) => `50/50 H ${host50} · 70/30 H ${host70}`,
  aiSplit5050: (host, platform) => `50/50 · H ${host} · P ${platform}`,
  aiSplit7030: (host, platform) => `70/30 · H ${host} · P ${platform}`,
  aiSplitFormula: (margin, gross) => `m ${margin} = ${gross} − sup − proc`,
  aiAria: "LIVE AI GENERATOR · Dropshipping · AI automated exact info",
  checkoutKicker: "Dropship checkout",
  checkoutShipsMeta: (shipsFrom, price, countryName) =>
    `Ships from ${shipsFrom} · ${price} · to you in ${countryName}`,
  checkoutNote: (origin) =>
    `You pay here on the arena. Our supplier in ${origin} packs and ships direct to your door — you never hold stock.`,
  checkoutClose: "Close",
  checkoutFullName: "Full name",
  checkoutEmail: "Email (for tracking)",
  checkoutPhone: "Phone",
  checkoutAddress: "Address line 1",
  checkoutCity: "City",
  checkoutPostal: "Postal code",
  checkoutCountry: "Country",
  checkoutPay: "Pay · dropship order",
  checkoutCancel: "Cancel",
  enterMarketWithCountry: (flag, countryName) => `${flag} Enter Dropship · ${countryName}`,
  enterMarketFull: "▶ Enter Dropship Market",
  enterCompact: "▶ Dropship · 1 click",
  enterHint: "Browse · pay · supplier ships · track order",
  intlNoGate: "Dropship market · no live gate",
  marketOnlyNoGate: "Market only · no live gate",
  laneBadge: (flag, countryName) => `${flag} ${countryName} lane`,
  marketPageDesc: (countryName) =>
    `${countryName} · browse · checkout · supplier ships direct · separate from $6 live gift rooms`,
  switchCountryLane: "Switch country lane",
  laneTechName: (countryName) => `${countryName} Tech & Gadgets Pack`,
  laneTechDesc: "Phone accessories · cables · gadget bundle · local supplier ships direct",
  laneAutoName: (countryName) => `${countryName} Car Accessories Kit`,
  laneAutoDesc: "Interior accessories · care kit · local supplier ships direct",
  openFullMarket: (countryName) => `Open full ${countryName} market →`
};

const esCOCopy: DropshipMarketCopy = {
  title: "Mercado Dropship",
  subtitle: "Explora · compra en la arena · proveedor envía directo",
  marketOnlyBadge: "SOLO MERCADO",
  dropshipBadge: "DROPSHIP",
  roomSub: (flag, countryName) => `${flag} ${countryName} · proveedor envía directo · solo mercado`,
  roomIntroAria: (countryName) => `Intro mercado dropship · ${countryName}`,
  steps: [
    { title: "1 · Explorar", body: "Elige un producto de este carril del país." },
    { title: "2 · Pagar", body: "Checkout en la arena · ingresa dirección de envío." },
    { title: "3 · Proveedor envía", body: "Socio empaca directo · sin inventario aquí." },
    { title: "4 · Rastrear", body: "Mismo correo · actualizaciones de estado aquí." }
  ],
  shipsFrom: "Envío desde",
  buy: "Comprar · dropship",
  categoryAria: "Opciones de categoría dropship",
  categoryTech: "📱 Tech y gadgets",
  categoryAutomotive: "🚗 Automotriz y accesorios",
  legalShort:
    "Proveedor en Colombia envía · carril COP · aranceles pueden aplicar fuera de Colombia",
  checkoutStreetAddress: "Dirección",
  checkoutPayLoading: "Iniciando…",
  checkoutPayButton: (price) => `Pagar ${price} · dropship`,
  checkoutErrorStart: "No se pudo iniciar el checkout",
  checkoutErrorNetwork: "Error de red — intenta de nuevo",
  orderPlaced: (category, city) => `Pedido realizado · ${category} envía a ${city}`,
  orderStarted: "Pedido iniciado — completa el pago para confirmar",
  ordersTitle: (flag, countryName) => `Tus pedidos · ${flag} ${countryName}`,
  ordersLoading: "Cargando pedidos…",
  ordersEmpty:
    "Aún no hay pedidos — compra arriba con tu correo · rastrea el estado aquí después del checkout",
  ordersItemFallback: "Artículo dropship",
  orderStatus: {
    pending_payment: "Esperando pago",
    ordered: "Pedido · preparando",
    shipped: "Enviado",
    delivered: "Entregado"
  },
  aiTitle: "GENERADOR AI EN VIVO · DROPSHIPPING",
  aiSub: "AI AUTOMATIZADO · INFO EXACTA",
  aiExact: "EXACTO",
  aiLead: "FX en tiempo real · reparto Arena Plus · cálculo exacto automático.",
  aiFrom: "De",
  aiTo: "A",
  aiUsd: "USD",
  aiFxLabel: "FX · EXACTO",
  aiSplitLabel: "REPARTO · AUTO",
  aiAuto: "AUTO",
  aiSplitCompact: (host50, host70) => `50/50 H ${host50} · 70/30 H ${host70}`,
  aiSplit5050: (host, platform) => `50/50 · H ${host} · P ${platform}`,
  aiSplit7030: (host, platform) => `70/30 · H ${host} · P ${platform}`,
  aiSplitFormula: (margin, gross) => `m ${margin} = ${gross} − prov − proc`,
  aiAria: "GENERADOR AI EN VIVO · Dropshipping · info exacta automatizada",
  checkoutKicker: "Checkout dropship",
  checkoutShipsMeta: (shipsFrom, price, countryName) =>
    `Envío desde ${shipsFrom} · ${price} · a ti en ${countryName}`,
  checkoutNote: (origin) =>
    `Pagas aquí en la arena. Nuestro proveedor en ${origin} empaca y envía directo a tu puerta — nunca manejas inventario.`,
  checkoutClose: "Cerrar",
  checkoutFullName: "Nombre completo",
  checkoutEmail: "Correo (para rastreo)",
  checkoutPhone: "Teléfono",
  checkoutAddress: "Dirección línea 1",
  checkoutCity: "Ciudad",
  checkoutPostal: "Código postal",
  checkoutCountry: "País",
  checkoutPay: "Pagar · pedido dropship",
  checkoutCancel: "Cancelar",
  enterMarketWithCountry: (flag, countryName) => `${flag} Entrar Dropship · ${countryName}`,
  enterMarketFull: "▶ Entrar Mercado Dropship",
  enterCompact: "▶ Dropship · 1 toque",
  enterHint: "Explora · paga · proveedor envía · rastrea pedido",
  intlNoGate: "Mercado dropship · sin acceso en vivo",
  marketOnlyNoGate: "Solo mercado · sin acceso en vivo",
  laneBadge: (flag, countryName) => `Carril ${flag} ${countryName}`,
  marketPageDesc: (countryName) =>
    `${countryName} · explora · checkout · proveedor envía directo · separado de salas en vivo de regalo $6`,
  switchCountryLane: "Cambiar carril de país",
  laneTechName: (countryName) => `Pack tech y gadgets · ${countryName}`,
  laneTechDesc: "Accesorios celular · cables · bundle · proveedor local envía directo",
  laneAutoName: (countryName) => `Kit accesorios auto · ${countryName}`,
  laneAutoDesc: "Accesorios interior · kit de cuidado · proveedor local envía directo",
  openFullMarket: (countryName) => `Abrir mercado completo ${countryName} →`
};

const esCopy: DropshipMarketCopy = {
  title: "Mercado Dropship",
  subtitle: "Explora · compra en la arena · proveedor envía directo",
  marketOnlyBadge: "SOLO MERCADO",
  dropshipBadge: "DROPSHIP",
  roomSub: (flag, countryName) => `${flag} ${countryName} · proveedor envía directo · solo mercado`,
  roomIntroAria: (countryName) => `Intro mercado dropship · ${countryName}`,
  steps: [
    { title: "1 · Explorar", body: "Elige un producto de este carril del país." },
    { title: "2 · Pagar", body: "Checkout en la arena · ingresa dirección de envío." },
    { title: "3 · Proveedor envía", body: "Socio empaca directo · sin inventario aquí." },
    { title: "4 · Rastrear", body: "Mismo correo · actualizaciones de estado aquí." }
  ],
  shipsFrom: "Envío desde",
  buy: "Comprar · dropship",
  categoryAria: "Opciones de categoría dropship",
  categoryTech: "📱 Tech y gadgets",
  categoryAutomotive: "🚗 Automotriz y accesorios",
  legalShort: "Proveedor local envía · conversión de moneda · aranceles pueden aplicar",
  checkoutStreetAddress: "Dirección",
  checkoutPayLoading: "Iniciando…",
  checkoutPayButton: (price) => `Pagar ${price} · dropship`,
  checkoutErrorStart: "No se pudo iniciar el checkout",
  checkoutErrorNetwork: "Error de red — intenta de nuevo",
  orderPlaced: (category, city) => `Pedido realizado · ${category} envía a ${city}`,
  orderStarted: "Pedido iniciado — completa el pago para confirmar",
  ordersTitle: (flag, countryName) => `Tus pedidos · ${flag} ${countryName}`,
  ordersLoading: "Cargando pedidos…",
  ordersEmpty:
    "Aún no hay pedidos — compra arriba con tu correo · rastrea el estado aquí después del checkout",
  ordersItemFallback: "Artículo dropship",
  orderStatus: {
    pending_payment: "Esperando pago",
    ordered: "Pedido · preparando",
    shipped: "Enviado",
    delivered: "Entregado"
  },
  aiTitle: "GENERADOR AI EN VIVO · DROPSHIPPING",
  aiSub: "AI AUTOMATIZADO · INFO EXACTA",
  aiExact: "EXACTO",
  aiLead: "FX en tiempo real · reparto Arena Plus · cálculo exacto automático.",
  aiFrom: "De",
  aiTo: "A",
  aiUsd: "USD",
  aiFxLabel: "FX · EXACTO",
  aiSplitLabel: "REPARTO · AUTO",
  aiAuto: "AUTO",
  aiSplitCompact: (host50, host70) => `50/50 H ${host50} · 70/30 H ${host70}`,
  aiSplit5050: (host, platform) => `50/50 · H ${host} · P ${platform}`,
  aiSplit7030: (host, platform) => `70/30 · H ${host} · P ${platform}`,
  aiSplitFormula: (margin, gross) => `m ${margin} = ${gross} − prov − proc`,
  aiAria: "GENERADOR AI EN VIVO · Dropshipping · info exacta automatizada",
  checkoutKicker: "Checkout dropship",
  checkoutShipsMeta: (shipsFrom, price, countryName) =>
    `Envío desde ${shipsFrom} · ${price} · a ti en ${countryName}`,
  checkoutNote: (origin) =>
    `Pagas aquí en la arena. Nuestro proveedor en ${origin} empaca y envía directo a tu puerta — nunca manejas inventario.`,
  checkoutClose: "Cerrar",
  checkoutFullName: "Nombre completo",
  checkoutEmail: "Correo (para rastreo)",
  checkoutPhone: "Teléfono",
  checkoutAddress: "Dirección línea 1",
  checkoutCity: "Ciudad",
  checkoutPostal: "Código postal",
  checkoutCountry: "País",
  checkoutPay: "Pagar · pedido dropship",
  checkoutCancel: "Cancelar",
  enterMarketWithCountry: (flag, countryName) => `${flag} Entrar Dropship · ${countryName}`,
  enterMarketFull: "▶ Entrar Mercado Dropship",
  enterCompact: "▶ Dropship · 1 toque",
  enterHint: "Explora · paga · proveedor envía · rastrea pedido",
  intlNoGate: "Mercado dropship · sin acceso en vivo",
  marketOnlyNoGate: "Solo mercado · sin acceso en vivo",
  laneBadge: (flag, countryName) => `Carril ${flag} ${countryName}`,
  marketPageDesc: (countryName) =>
    `${countryName} · explora · checkout · proveedor envía directo · separado de salas en vivo de regalo $6`,
  switchCountryLane: "Cambiar carril de país",
  laneTechName: (countryName) => `Pack tech y gadgets · ${countryName}`,
  laneTechDesc: "Accesorios celular · cables · bundle · proveedor local envía directo",
  laneAutoName: (countryName) => `Kit accesorios auto · ${countryName}`,
  laneAutoDesc: "Accesorios interior · kit de cuidado · proveedor local envía directo",
  openFullMarket: (countryName) => `Abrir mercado completo ${countryName} →`
};

/** Ecuador · dropship room copy · USD lane · Quito · Guayaquil */
const esECCopy: DropshipMarketCopy = {
  ...esCopy,
  subtitle: "Explora · compra en la arena · proveedor ecuatoriano envía directo a tu puerta",
  roomSub: (flag, countryName) =>
    `${flag} ${countryName} · proveedor envía directo · carril USD · Quito y Guayaquil · solo mercado`,
  legalShort:
    "Proveedor ecuatoriano envía · carril USD · hubs Quito y Guayaquil · aranceles pueden aplicar fuera de Ecuador",
  steps: [
    { title: "1 · Explorar", body: "Elige producto del carril Ecuador — kits, artesanías, tech y auto." },
    {
      title: "2 · Pagar",
      body: "Checkout en la arena · USD · ingresa dirección de envío · procesamiento 3.4% + $0.30."
    },
    {
      title: "3 · Proveedor envía",
      body: "Socio en Quito o Guayaquil empaca directo · sin inventario en la arena · 3–7 días nacional."
    },
    { title: "4 · Rastrear", body: "Mismo correo · estado: pago → preparando → enviado → entregado." }
  ],
  aiLead: "FX en tiempo real · reparto Arena Plus 50/50 y 70/30 · cálculo exacto automático · carril USD Ecuador."
};

const jaCopy: DropshipMarketCopy = {
  title: "ドロップシップマーケット",
  subtitle: "閲覧 · アリーナで購入 · サプライヤー直送",
  marketOnlyBadge: "マーケットのみ",
  dropshipBadge: "ドロップシップ",
  roomSub: (flag) => `${flag} 日本 · サプライヤー直送 · マーケットのみ`,
  roomIntroAria: () => "日本ドロップシップマーケット",
  steps: [
    { title: "1 · 閲覧", body: "この国レーンから商品を選ぶ。" },
    { title: "2 · 決済", body: "アリーナでチェックアウト · 配送先を入力。" },
    { title: "3 · サプライヤー発送", body: "パートナーが直送 · 在庫はここにない。" },
    { title: "4 · 追跡", body: "同じメール · ここでステータス更新。" }
  ],
  shipsFrom: "発送元",
  buy: "購入 · ドロップシップ",
  categoryAria: "ドロップシップカテゴリー",
  categoryTech: "📱 テック＆ガジェット",
  categoryAutomotive: "🚗 自動車＆カーアクセサリー",
  legalShort: "日本レーン · 円換算 · 国内サプライヤーレーン",
  checkoutStreetAddress: "住所",
  checkoutPayLoading: "開始中…",
  checkoutPayButton: (price) => `支払う ${price} · ドロップシップ`,
  checkoutErrorStart: "チェックアウトを開始できません",
  checkoutErrorNetwork: "ネットワークエラー — 再試行してください",
  orderPlaced: (category, city) => `注文完了 · ${category} → ${city}へ発送`,
  orderStarted: "注文開始 — 支払いを完了して確定",
  ordersTitle: (flag) => `ご注文 · ${flag} 日本`,
  ordersLoading: "注文を読み込み中…",
  ordersEmpty: "まだ注文なし — 上でメール付き購入 · チェックアウト後ここで追跡",
  ordersItemFallback: "ドロップシップ商品",
  orderStatus: {
    pending_payment: "支払い待ち",
    ordered: "注文済み · 準備中",
    shipped: "発送済み",
    delivered: "配達完了"
  },
  aiTitle: "ライブAIジェネレーター · ドロップシップ",
  aiSub: "AI自動 · 正確情報",
  aiExact: "正確",
  aiLead: "リアルタイム為替 · アリーナプラス分配 · 自動正確計算。",
  aiFrom: "から",
  aiTo: "へ",
  aiUsd: "USD",
  aiFxLabel: "為替 · 正確",
  aiSplitLabel: "分配 · 自動",
  aiAuto: "自動",
  aiSplitCompact: (host50, host70) => `50/50 ホスト ${host50} · 70/30 ホスト ${host70}`,
  aiSplit5050: (host, platform) => `50/50 · ホスト ${host} · プラット ${platform}`,
  aiSplit7030: (host, platform) => `70/30 · ホスト ${host} · プラット ${platform}`,
  aiSplitFormula: (margin, gross) => `m ${margin} = ${gross} − 仕入 − 手数料`,
  aiAria: "ライブAIジェネレーター · ドロップシップ · AI自動正確情報",
  checkoutKicker: "ドロップシップチェックアウト",
  checkoutShipsMeta: (shipsFrom, price, countryName) =>
    `発送元 ${shipsFrom} · ${price} · ${countryName}へお届け`,
  checkoutNote: (origin) =>
    `アリーナでお支払い。${origin}のサプライヤーが直接お届け — 在庫は持ちません。`,
  checkoutClose: "閉じる",
  checkoutFullName: "氏名",
  checkoutEmail: "メール（追跡用）",
  checkoutPhone: "電話",
  checkoutAddress: "住所1",
  checkoutCity: "市区町村",
  checkoutPostal: "郵便番号",
  checkoutCountry: "国",
  checkoutPay: "支払う · ドロップシップ注文",
  checkoutCancel: "キャンセル",
  enterMarketWithCountry: (flag) => `${flag} ドロップシップへ · 日本`,
  enterMarketFull: "▶ ドロップシップマーケットへ",
  enterCompact: "▶ ドロップシップ · 1クリック",
  enterHint: "閲覧 · 決済 · サプライヤー直送 · 注文追跡",
  intlNoGate: "ドロップシップマーケット · ライブゲートなし",
  marketOnlyNoGate: "マーケットのみ · ライブゲートなし",
  laneBadge: (flag) => `${flag} 日本レーン`,
  marketPageDesc: () =>
    "日本 · 閲覧 · チェックアウト · サプライヤー直送 · $6ライブギフトルームとは別",
  switchCountryLane: "国レーンを切り替え",
  laneTechName: (countryName) => `${countryName}テック＆ガジェットパック`,
  laneTechDesc: "スマホアクセサリー · ケーブル · ガジェットセット · 現地サプライヤー直送",
  laneAutoName: (countryName) => `${countryName}カーアクセサリーキット`,
  laneAutoDesc: "インテリアアクセサリー · ケアキット · 現地サプライヤー直送",
  openFullMarket: () => "フル日本マーケットへ →"
};

const zhCopy: DropshipMarketCopy = {
  title: "代发货市场",
  subtitle: "浏览 · 在竞技场购买 · 供应商直发",
  roomHeaderTitle: "DROP SHIPPING",
  roomHeaderTitleLead: "DROP",
  roomHeaderTitleTrail: "SHIPPING",
  roomHeaderIconSrc: "/dropship-parachute-icon.png",
  marketOnlyBadge: "仅市场",
  dropshipBadge: "代发货",
  roomSub: (flag) => `${flag} 中国 · 供应商直发 · 仅市场`,
  roomIntroAria: () => "中国代发货市场",
  steps: [
    { title: "1 · 浏览", body: "从本国通道选择商品。" },
    { title: "2 · 支付", body: "在竞技场结账 · 填写收货地址。" },
    { title: "3 · 供应商发货", body: "合作方直发 · 此处无库存。" },
    { title: "4 · 追踪", body: "同一邮箱 · 在此查看状态更新。" }
  ],
  shipsFrom: "发货地",
  buy: "购买 · 代发货",
  categoryAria: "代发货分类选项",
  categoryTech: "📱 科技与数码",
  categoryAutomotive: "🚗 汽车与配件",
  legalShort: "中国通道 · 人民币换算 · 出口供应商直发",
  checkoutStreetAddress: "街道地址",
  checkoutPayLoading: "启动中…",
  checkoutPayButton: (price) => `支付 ${price} · 代发货`,
  checkoutErrorStart: "无法启动结账",
  checkoutErrorNetwork: "网络错误 — 请重试",
  orderPlaced: (category, city) => `订单已下 · ${category} 发往 ${city}`,
  orderStarted: "订单已开始 — 完成支付以确认",
  ordersTitle: (flag) => `您的订单 · ${flag} 中国`,
  ordersLoading: "加载订单中…",
  ordersEmpty: "暂无订单 — 在上方用邮箱购买 · 结账后在此追踪",
  ordersItemFallback: "代发货商品",
  orderStatus: {
    pending_payment: "等待付款",
    ordered: "已下单 · 准备中",
    shipped: "已发货",
    delivered: "已送达"
  },
  aiTitle: "实时AI生成器 · 代发货",
  aiSub: "AI自动 · 精确信息",
  aiExact: "精确",
  aiLead: "实时汇率 · 竞技场Plus分成 · 自动精确计算。",
  aiFrom: "从",
  aiTo: "到",
  aiUsd: "USD",
  aiFxLabel: "汇率 · 精确",
  aiSplitLabel: "分成 · 自动",
  aiAuto: "自动",
  aiSplitCompact: (host50, host70) => `50/50 主持 ${host50} · 70/30 主持 ${host70}`,
  aiSplit5050: (host, platform) => `50/50 · 主持 ${host} · 平台 ${platform}`,
  aiSplit7030: (host, platform) => `70/30 · 主持 ${host} · 平台 ${platform}`,
  aiSplitFormula: (margin, gross) => `m ${margin} = ${gross} − 供应 − 手续`,
  aiAria: "实时AI生成器 · 代发货 · AI自动精确信息",
  checkoutKicker: "代发货结账",
  checkoutShipsMeta: (shipsFrom, price, countryName) =>
    `发货地 ${shipsFrom} · ${price} · 送至 ${countryName}`,
  checkoutNote: (origin) =>
    `您在竞技场付款。我们在${origin}的供应商打包直送到您门口 — 您无需持有库存。`,
  checkoutClose: "关闭",
  checkoutFullName: "全名",
  checkoutEmail: "邮箱（用于追踪）",
  checkoutPhone: "电话",
  checkoutAddress: "地址行1",
  checkoutCity: "城市",
  checkoutPostal: "邮政编码",
  checkoutCountry: "国家",
  checkoutPay: "支付 · 代发货订单",
  checkoutCancel: "取消",
  enterMarketWithCountry: (flag) => `${flag} 进入代发货 · 中国`,
  enterMarketFull: "▶ 进入代发货市场",
  enterCompact: "▶ 代发货 · 一键",
  enterHint: "浏览 · 支付 · 供应商直发 · 追踪订单",
  intlNoGate: "代发货市场 · 无直播门槛",
  marketOnlyNoGate: "仅市场 · 无直播门槛",
  laneBadge: (flag) => `${flag} 中国通道`,
  marketPageDesc: () => "中国 · 浏览 · 结账 · 供应商直发 · 与$6直播礼物房间分开",
  switchCountryLane: "切换国家通道",
  laneTechName: (countryName) => `${countryName}科技数码套装`,
  laneTechDesc: "手机配件 · 线缆 · 数码套装 · 本地供应商直发",
  laneAutoName: (countryName) => `${countryName}汽车配件套装`,
  laneAutoDesc: "内饰配件 · 护理套装 · 本地供应商直发",
  openFullMarket: () => "打开完整中国市场 →"
};

const copyByLocale: Record<DropshipCopyLocale, DropshipMarketCopy> = {
  en: enCopy,
  es: esCopy,
  "es-CO": esCOCopy,
  "es-EC": esECCopy,
  ja: jaCopy,
  zh: zhCopy
};

type ProductCopyEntry = {
  name: string;
  description: string;
  category: string;
  shipsFrom?: string;
};

const colombiaProductCopy: Record<string, ProductCopyEntry> = {
  "co-arepa-kit": {
    name: "Kit inicial de arepas · Cartagena",
    description: "Harina precocida · queso costeño · receta Cartagena · línea fresca",
    category: "Kit comida · tendencia"
  },
  "co-bandeja-box": {
    name: "Caja Bandeja Paisa · Medellín",
    description: "Ingredientes bandeja paisa · chicharrón · frijoles · arroz · proveedor Antioquia",
    category: "Kit comida · tendencia"
  },
  "co-coffee-gift": {
    name: "Caja café especialidad Huila",
    description: "Huila Excelso grado especialidad · notas caramelo · tueste Bogotá · línea export top",
    category: "Café · tendencia"
  }
};

const spanishProductCopy: Record<string, ProductCopyEntry> = {
  "ec-ceviche-kit": {
    name: "Kit ceviche Guayaquil",
    description: "Preparación ceviche costero · limón · chifles",
    category: "Kit comida"
  },
  "ec-quito-craft": {
    name: "Pack artesanal Andes · Quito",
    description: "Textiles tejidos · folleto cultura marimba",
    category: "Artesanías"
  },
  "ec-carnival-wear": {
    name: "Accesorios carnaval Ecuador",
    description: "Colores de festival · kit listo para desfile",
    category: "Moda"
  },
  "jm-dancehall-tee": {
    name: "Camiseta dancehall Kingston",
    description: "Estilo calle isla · estampado Kingston",
    category: "Moda"
  },
  "jm-island-bundle": {
    name: "Bundle vibras isla Jamaica",
    description: "Bandera · stickers · accesorios carril reggae",
    category: "Merch"
  },
  "jm-sound-kit": {
    name: "Kit mini sound system",
    description: "Skin parlante portátil · tarjeta playlist dancehall",
    category: "Electrónica"
  },
  "tt-carnival-pack": {
    name: "Pack carnaval Puerto España",
    description: "Colores soca · kit acento plumas",
    category: "Moda"
  },
  "tt-flag-merch": {
    name: "Merch bandera Trinidad y Tobago",
    description: "Mapa bandera · set orgullo isla",
    category: "Merch"
  },
  "tt-soca-mix": {
    name: "Caja mix fiesta soca",
    description: "Snacks · banderas · starter fiesta",
    category: "Kit comida"
  },
  "ve-music-merch": {
    name: "Merch Latin Fire Caracas",
    description: "Camiseta cultura musical · estampado Caracas",
    category: "Moda"
  },
  "ve-beach-kit": {
    name: "Kit playa costa caribeña",
    description: "Toalla · tote · colores costeros",
    category: "Aire libre"
  },
  "ve-flag-set": {
    name: "Set orgullo Venezuela",
    description: "Bandera · pin · bundle stickers",
    category: "Merch"
  },
  "gy-comedy-merch": {
    name: "Merch comedia Georgetown",
    description: "Camiseta humor mezcla caribeña",
    category: "Merch"
  },
  "gy-caribbean-mix": {
    name: "Caja mix Caribe Guyana",
    description: "Snacks · banderas · mezcla isla",
    category: "Kit comida"
  },
  "gy-river-kit": {
    name: "Kit regalo río Demerara",
    description: "Cultura río · set postales",
    category: "Merch"
  }
};

const chinaProductCopy: Record<string, ProductCopyEntry> = {
  "cn-shanghai-style": {
    name: "上海街头风T恤",
    description: "东亚内容通道周边",
    category: "时尚"
  },
  "cn-tea-set": {
    name: "中国茶道套装",
    description: "散茶 · 茶杯 · 中文卡片",
    category: "食品套装"
  },
  "cn-tech-skin": {
    name: "上海科技皮肤套装",
    description: "手机皮肤 · 霓虹城市印花",
    category: "电子产品"
  }
};

const japanProductCopy: Record<string, ProductCopyEntry> = {
  "jp-lifestyle-box": {
    name: "ジャパンライフスタイルボックス",
    description: "ミニマル雑貨 · ジャパンセレクト",
    category: "ライフスタイル",
    shipsFrom: "🇯🇵 ジャパン · 日本"
  },
  "jp-street-fashion": {
    name: "ジャパンストリートファッションT",
    description: "日本文化ストリートプリント",
    category: "ファッション",
    shipsFrom: "🇯🇵 ジャパン · 日本"
  },
  "jp-matcha-kit": {
    name: "ジャパンマッチャスターターキット",
    description: "抹茶 · 茶筅 · 碗ミニセット",
    category: "食品キット",
    shipsFrom: "🇯🇵 ジャパン · 日本"
  }
};

const productCopyByLocale: Partial<Record<DropshipCopyLocale, Record<string, ProductCopyEntry>>> = {
  "es-CO": colombiaProductCopy,
  es: spanishProductCopy,
  "es-EC": spanishProductCopy,
  zh: chinaProductCopy,
  ja: japanProductCopy
};

function localizeLaneProduct(product: DropshipProduct, copy: DropshipMarketCopy) {
  const country = internationalSuiteCountries.find((entry) => entry.id === product.countryId);
  const countryName = getDropshipCountryDisplayName(
    product.countryId,
    country?.name ?? product.countryId
  );

  if (product.lane === "tech") {
    return {
      name: copy.laneTechName(countryName),
      description: copy.laneTechDesc,
      category: copy.categoryTech,
      shipsFrom: product.shipsFrom
    };
  }

  return {
    name: copy.laneAutoName(countryName),
    description: copy.laneAutoDesc,
    category: copy.categoryAutomotive,
    shipsFrom: product.shipsFrom
  };
}

export function getDropshipCountryDisplayName(countryId: string, countryName: string) {
  if (countryId === "japan") return "日本";
  if (countryId === "china") return "中国";
  return countryName;
}

export function getDropshipMarketCopy(countryId: string): DropshipMarketCopy {
  return copyByLocale[resolveDropshipCopyLocale(countryId)] ?? enCopy;
}

export function getDropshipLegalShortDisplay(countryId: string, configShort: string) {
  const copy = getDropshipMarketCopy(countryId);
  return copy.legalShort || configShort;
}

export function getDropshipCategoryLabel(countryId: string, laneId: "tech" | "automotive") {
  const copy = getDropshipMarketCopy(countryId);
  return laneId === "tech" ? copy.categoryTech : copy.categoryAutomotive;
}

export function getDropshipProductDisplay(product: DropshipProduct, marketCountryId: string) {
  const locale = resolveDropshipCopyLocale(marketCountryId);
  const copy = getDropshipMarketCopy(marketCountryId);

  if (locale === "en") {
    return {
      name: product.name,
      description: product.description,
      category: product.category,
      shipsFrom: product.shipsFrom
    };
  }

  if (product.lane) {
    return localizeLaneProduct(product, copy);
  }

  const localized =
    productCopyByLocale[locale]?.[product.id] ??
    (locale === "es-EC" ? productCopyByLocale.es?.[product.id] : undefined);
  if (localized) {
    return {
      name: localized.name,
      description: localized.description,
      category: localized.category,
      shipsFrom: localized.shipsFrom ?? product.shipsFrom
    };
  }

  return {
    name: product.name,
    description: product.description,
    category: product.category,
    shipsFrom: product.shipsFrom
  };
}
