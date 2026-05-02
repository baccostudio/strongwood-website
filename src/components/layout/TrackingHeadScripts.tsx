import Script from "next/script";

import type { SiteTrackingConfig } from "@/types/site";

interface TrackingHeadScriptsProps {
  tracking: SiteTrackingConfig;
}

export function TrackingHeadScripts({ tracking }: TrackingHeadScriptsProps) {
  const { facebookPixel, googleTagManager } = tracking;

  return (
    <>
      {facebookPixel.enabled ? (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/${facebookPixel.scriptLocale}/fbevents.js');
            fbq('init', ${JSON.stringify(facebookPixel.pixelId)});
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {googleTagManager.enabled ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script',${JSON.stringify(googleTagManager.dataLayerName)},${JSON.stringify(googleTagManager.containerId)});
          `}
        </Script>
      ) : null}
    </>
  );
}
