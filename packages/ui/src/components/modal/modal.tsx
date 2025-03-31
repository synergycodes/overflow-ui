import clsx from "clsx";
import styles from "./modal.module.css";

import { Modal as BaseModal } from "@mui/base/Modal";
import { forwardRef, type ReactNode } from "react";
import { NavButton } from "@ui/components/button/nav-button/nav-button";
import { Fade } from "@mui/material";
import { WithIcon } from "@ui/shared/types/with-icon";
import { X } from "@phosphor-icons/react";
import { FooterVariant } from "./types";

type ModalProps = Partial<WithIcon> & {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "regular" | "large";
  footerVariant?: FooterVariant;
  open: boolean;
  onClose?: () => void;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      icon,
      title,
      subtitle,
      children,
      footer,
      size = "regular",
      footerVariant = "integrated",
      open,
      onClose,
    },
    ref
  ) => {
    return (
      <BaseModal open={open} onClose={onClose} slots={{ backdrop: Backdrop }}>
        <Fade in={open}>
          <div className={clsx(styles["modal"], styles[size])} ref={ref}>
            <div className={styles["header"]}>
              <div className={styles["title-wrapper"]}>
                {icon && <div className={styles["icon"]}>{icon}</div>}
                <div>
                  <h6 className={styles["title"]}>{title}</h6>
                  {subtitle && (
                    <p className={styles["description"]}>{subtitle}</p>
                  )}
                </div>
              </div>
              {onClose && <NavButton icon={<X />} onClick={onClose} />}
            </div>

            {children && <div className={styles["content"]}>{children}</div>}

            {footer && (
              <div className={clsx(styles["footer"], styles[footerVariant])}>
                {footer}
              </div>
            )}
          </div>
        </Fade>
      </BaseModal>
    );
  }
);

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className } = props;
  return (
    <Fade in={open}>
      <div className={clsx(styles["backdrop"], className)} ref={ref} />
    </Fade>
  );
});
