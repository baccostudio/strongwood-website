interface JsonLdScriptProps {
  data: Record<string, unknown>;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  // JSON-LD needs a raw script payload; keep it deterministic and escape "<" to avoid HTML parsing issues.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
