import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-navy-700 text-white shadow-[0_12px_30px_rgba(28,44,84,0.22)] hover:bg-navy-800 hover:shadow-[0_16px_34px_rgba(28,44,84,0.26)] focus-visible:outline-navy-500",
  secondary:
    "border border-slate-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-slate-50 focus-visible:outline-navy-500",
};

type ButtonVariant = keyof typeof buttonVariants;

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-[0.01em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-4 focus-visible:ring-navy-100 disabled:pointer-events-none disabled:opacity-50",
    buttonVariants[variant],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {
  variant?: ButtonVariant;
}

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, className)} {...props} />;
}
