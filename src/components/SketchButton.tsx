import type { ReactNode, ButtonHTMLAttributes } from "react";

interface SketchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  block?: boolean;
}

export default function SketchButton({
  children,
  primary,
  block,
  style,
  ...rest
}: SketchButtonProps) {
  return (
    <button
      style={{
        border: "2px solid var(--ink)",
        background: primary ? "var(--accent)" : "var(--paper)",
        borderRadius: 999,
        padding: "8px 16px",
        fontFamily: "inherit",
        fontSize: 14,
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
        justifyContent: block ? "center" : undefined,
        alignItems: "center",
        gap: 6,
        boxShadow: "2px 2px 0 var(--ink)",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
