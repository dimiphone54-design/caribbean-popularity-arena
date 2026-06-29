"use client";

import {
  type ArenaGiftCardInput,
  formatCardNumberInput,
  formatExpiryInput,
  getArenaGiftCardLabels
} from "@/lib/arena-gift-card";

type ArenaGiftCardFieldsProps = {
  countryId?: string;
  compact?: boolean;
  disabled?: boolean;
  value: ArenaGiftCardInput;
  errors?: Partial<Record<keyof ArenaGiftCardInput, string>>;
  onChange: (next: ArenaGiftCardInput) => void;
  className?: string;
  /** Apple Liquid Glass · active built-country gift panels */
  styleVariant?: "default" | "liquid-glass";
};

export function ArenaGiftCardFields({
  countryId,
  compact = false,
  disabled = false,
  value,
  errors = {},
  onChange,
  className = "",
  styleVariant = "default"
}: ArenaGiftCardFieldsProps) {
  const labels = getArenaGiftCardLabels(countryId);
  const liquidGlass = styleVariant === "liquid-glass";

  return (
    <fieldset
      className={`arena-gift-card-fields${compact ? " arena-gift-card-fields--compact" : ""}${
        liquidGlass ? " arena-gift-card-fields--liquid-glass" : ""
      }${className ? ` ${className}` : ""}`}
      disabled={disabled}
    >
      <legend
        className={`arena-gift-card-fields-kicker${
          liquidGlass ? " arena-gift-card-fields-kicker--liquid-glass" : ""
        }`}
      >
        {liquidGlass ? (
          <span className="arena-gift-card-fields-kicker-glass">
            <span className="arena-gift-card-fields-kicker-icon" aria-hidden="true">
              💳
            </span>
            <span className="arena-gift-card-fields-kicker-label">{labels.kicker}</span>
          </span>
        ) : (
          labels.kicker
        )}
      </legend>

      <label className="arena-gift-card-field arena-gift-card-field--full">
        <span>{labels.cardNumber}</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder={labels.cardNumberPlaceholder}
          value={value.cardNumber}
          onChange={(event) =>
            onChange({ ...value, cardNumber: formatCardNumberInput(event.target.value) })
          }
          aria-invalid={Boolean(errors.cardNumber)}
        />
        {errors.cardNumber ? <em className="arena-gift-card-field-error">{errors.cardNumber}</em> : null}
      </label>

      <div className="arena-gift-card-field-row">
        <label className="arena-gift-card-field">
          <span>{labels.expiry}</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder={labels.expiryPlaceholder}
            value={value.expiry}
            onChange={(event) => onChange({ ...value, expiry: formatExpiryInput(event.target.value) })}
            aria-invalid={Boolean(errors.expiry)}
          />
          {errors.expiry ? <em className="arena-gift-card-field-error">{errors.expiry}</em> : null}
        </label>

        <label className="arena-gift-card-field">
          <span>{labels.cvv}</span>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={labels.cvvPlaceholder}
            value={value.cvv}
            onChange={(event) =>
              onChange({ ...value, cvv: event.target.value.replace(/\D/g, "").slice(0, 4) })
            }
            aria-invalid={Boolean(errors.cvv)}
          />
          {errors.cvv ? <em className="arena-gift-card-field-error">{errors.cvv}</em> : null}
        </label>
      </div>

      <label className="arena-gift-card-field arena-gift-card-field--full">
        <span>{labels.cardholderName}</span>
        <input
          type="text"
          autoComplete="cc-name"
          placeholder={labels.namePlaceholder}
          value={value.cardholderName}
          onChange={(event) => onChange({ ...value, cardholderName: event.target.value })}
          aria-invalid={Boolean(errors.cardholderName)}
        />
        {errors.cardholderName ? (
          <em className="arena-gift-card-field-error">{errors.cardholderName}</em>
        ) : null}
      </label>

      <p className="arena-gift-card-fields-secure">{labels.secureNote}</p>
    </fieldset>
  );
}
