import logoSvg from "../../assets/logo.svg?raw";

export function Logo() {
  return (
    <span
      className="logo-wrap"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  );
}
