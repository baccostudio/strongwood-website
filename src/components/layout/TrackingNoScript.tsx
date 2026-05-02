import type { SiteTrackingConfig } from "@/types/site";

interface TrackingNoScriptProps {
  tracking: SiteTrackingConfig;
}

export function TrackingNoScript({ tracking }: TrackingNoScriptProps) {
  const { facebookPixel, googleTagManager } = tracking;

  return (
    <>
      {googleTagManager.enabled ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManager.containerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      ) : null}

      {facebookPixel.enabled ? (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- Facebook Pixel noscript requires a raw tracking beacon. */}
          <img
            src={`https://www.facebook.com/tr?id=${facebookPixel.pixelId}&ev=PageView&noscript=1`}
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
          />
        </noscript>
      ) : null}
    </>
  );
}
