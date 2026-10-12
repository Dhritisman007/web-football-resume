import type { ReactNode } from "react";
import { isPlaceholder } from "@/data/profile";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
}

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300";

const variants = {
  primary:
    "border-red bg-red text-chalk before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-chalk before:transition-transform before:duration-500 before:ease-stadium hover:text-ink hover:before:scale-x-100",
  ghost:
    "border-line-strong text-chalk before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-chalk/10 before:transition-transform before:duration-500 hover:before:scale-x-100",
};

// A real link when `href` is set. A disabled-looking note when it is still a
// placeholder, so the page never links to "EMAIL_HERE".
export default function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
}: ActionLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isPlaceholder(href)) {
    return (
      <span
        aria-disabled="true"
        className={`${classes} cursor-not-allowed border-dashed border-line-strong text-mist opacity-70`}
        title="Link to be added"
      >
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 text-[0.6rem] text-mist/70">· TO ADD</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor="ENTER"
    >
      <span className="relative z-10 transition-colors">{children}</span>
    </a>
  );
}
