import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20",
  secondary:
    "bg-muted text-foreground hover:bg-border/60 border border-border",
  ghost: "text-foreground hover:bg-muted",
  outline:
    "border border-border bg-white text-foreground hover:border-primary/40 hover:bg-primary-light/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: BaseButtonProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { variant, size, className, href, ...anchorProps } = props;
    return (
      <a href={href} className={buttonClasses({ variant, size, className })} {...anchorProps} />
    );
  }

  const { variant, size, className, type = "button", ...buttonProps } =
    props as ButtonAsButton;
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...buttonProps}
    />
  );
}
