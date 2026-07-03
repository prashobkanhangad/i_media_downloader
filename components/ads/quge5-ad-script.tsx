import Script from "next/script";

export function Quge5AdScript() {
  return (
    <Script
      id="quge5-ad"
      src="https://quge5.com/88/tag.min.js"
      data-zone="255934"
      data-cfasync="false"
      strategy="beforeInteractive"
    />
  );
}
