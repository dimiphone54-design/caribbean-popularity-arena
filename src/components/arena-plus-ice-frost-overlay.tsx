import Image from "next/image";

type ArenaPlusIceFrostOverlayProps = {
  src?: string;
  imageClassName?: string;
};

/** Arena Plus · cropped frost + ice border from photo overlay. */
export function ArenaPlusIceFrostOverlay({
  src = "/arena-plus-ice-frost-border.png",
  imageClassName = "luxury-plan-ice-frost-image",
}: ArenaPlusIceFrostOverlayProps) {
  return (
    <span className="luxury-plan-ice-frost-overlay" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        className={imageClassName}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <span className="luxury-plan-ice-frost-vignette" aria-hidden="true" />
    </span>
  );
}
