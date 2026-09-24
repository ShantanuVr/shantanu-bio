import type { ReactNode } from "react";

type Variant = "board" | "primary";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
};

function classes({ variant = "board", size = "md", className }: Common) {
  return ["btn", variant === "primary" && "btn--primary", size === "sm" && "btn--sm", className]
    .filter(Boolean)
    .join(" ");
}

/** The label drawn as a split-flap module: two static halves and a leaf that drops on hover. */
function Faces({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn-sizer" aria-hidden="true">
        {children}
      </span>
      <span className="btn-visual" aria-hidden="true">
        <span className="btn-face btn-face-top">
          <span className="btn-label">{children}</span>
        </span>
        <span className="btn-face btn-face-bottom">
          <span className="btn-label">{children}</span>
        </span>
        <span className="btn-leaf">
          <span className="btn-face btn-leaf-front">
            <span className="btn-label">{children}</span>
          </span>
          <span className="btn-face btn-leaf-back">
            <span className="btn-label">{children}</span>
          </span>
        </span>
      </span>
    </>
  );
}

type LinkProps = Common & {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
};

export function FlapLink({ href, label, external, download, ...common }: LinkProps) {
  return (
    <a
      href={href}
      className={classes(common)}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      <Faces>{common.children}</Faces>
    </a>
  );
}

type ButtonProps = Common & {
  label: string;
  onClick: () => void;
  pressed?: boolean;
};

export function FlapButton({ label, onClick, pressed, ...common }: ButtonProps) {
  return (
    <button
      type="button"
      className={classes(common)}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <Faces>{common.children}</Faces>
    </button>
  );
}
