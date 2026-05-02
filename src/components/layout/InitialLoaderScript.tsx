import {
  PRELOADER_HOME_PATH,
  PRELOADER_STATE_ATTRIBUTE,
} from "@/lib/preloader";

const initialLoaderBootstrapScript = `
  (function() {
    var isHome = window.location.pathname === ${JSON.stringify(PRELOADER_HOME_PATH)};
    var nextState = isHome ? "pending" : "skip";

    document.documentElement.setAttribute(${JSON.stringify(PRELOADER_STATE_ATTRIBUTE)}, nextState);
  })();
`;

const initialLoaderNoScriptStyles = `
  html[${PRELOADER_STATE_ATTRIBUTE}="pending"] body {
    overflow: auto !important;
  }

  html[${PRELOADER_STATE_ATTRIBUTE}="pending"] #initial-black-overlay {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transform: translateY(-100%) !important;
    transition: none !important;
  }
`;

export function InitialLoaderScript() {
  return (
    <>
      <script id="initial-loader">
        {initialLoaderBootstrapScript}
      </script>
      <noscript>
        <style>{initialLoaderNoScriptStyles}</style>
      </noscript>
    </>
  );
}
