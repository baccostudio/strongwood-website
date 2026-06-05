const viewportHeightScript = `
(function() {
  var styleId = "viewport-height-style";
  var doc = document;
  var root = document.documentElement;
  var viewport = window.visualViewport;
  var height = Math.floor(
    (viewport && viewport.height) ||
    root.clientHeight ||
    window.innerHeight ||
    0
  );

  if (height > 0) {
    var style = doc.getElementById(styleId);
    var css = ":root{--vh:" + (height * 0.01) + "px}";

    if (!style) {
      style = doc.createElement("style");
      style.id = styleId;
      doc.head.appendChild(style);
    }

    style.textContent = css;
  }
}());
`;

export function ViewportHeightScript() {
  return <script dangerouslySetInnerHTML={{ __html: viewportHeightScript }} />;
}
