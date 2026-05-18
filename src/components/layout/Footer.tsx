import Image from "next/image";
import Link from "next/link";
import { headerThemeConfig } from "@/content/site/header-theme";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  iconImageSrc: string;
  iconAlt: string;
}

interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  logoHref: string;
  menuTitle: string;
  menuLinks: FooterLink[];
  legalTitle: string;
  legalLinks: FooterLink[];
  contactTitle: string;
  contactEmail: string;
  copyright: string;
  socialLinks: SocialLink[];
  className?: string;
}

export function Footer({
  logoSrc,
  logoAlt,
  logoHref,
  menuTitle,
  menuLinks,
  legalTitle,
  legalLinks,
  contactTitle,
  contactEmail,
  copyright,
  socialLinks,
  className,
}: FooterProps) {
  return (
    <footer
      data-header-theme={headerThemeConfig.footerTheme}
      className={cn("relative overflow-hidden bg-white text-foreground", className)}
    >
      <div className="mx-auto mb-46 flex w-full max-w-6xl flex-col gap-10 px-6 pt-12 md:mb-64 lg:mb-86">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full flex-col gap-6 lg:max-w-55 lg:shrink-0">
            <Link href={logoHref} aria-label={logoAlt}>
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={150}
                height={76}
                loading="eager"
                className="h-auto w-32.5"
              />
            </Link>
            <div className="text-[10px] font-medium uppercase leading-[1.07] tracking-[0.01em] text-(--color-footer-copy)">
              {copyright}
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <div key={link.label} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="opacity-80 transition hover:opacity-100"
                    target="_blank"
                  >
                    <Image
                      src={link.iconImageSrc}
                      alt={link.iconAlt}
                      width={20}
                      height={20}
                      className="aspect-square object-contain"
                    />
                  </Link>
                  {index < socialLinks.length - 1 ? (
                    <span
                      className="h-6 w-px bg-(--color-footer-divider)"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 gap-x-2 lg:ml-auto lg:w-fit lg:grid-cols-[auto_auto_auto] lg:gap-x-20">
            <div className="space-y-3">
              <div className="text-[18px] font-medium uppercase leading-9.5 tracking-[0.01em] text-foreground">
                {menuTitle}
              </div>
              <ul className="space-y-2 text-[16px] font-medium leading-6 tracking-[-0.03em] text-(--color-footer-text)">
                {menuLinks.map((link) => (
                  <li key={link.href} className="group w-fit">
                    <Link
                      href={link.href}
                      className="inline-block transition group-hover:text-foreground group-hover:underline group-hover:underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[18px] font-medium uppercase leading-9.5 tracking-[0.01em] text-foreground">
                {legalTitle}
              </div>
              <ul className="space-y-2 text-[16px] font-medium leading-6 tracking-[-0.03em] text-(--color-footer-text)">
                {legalLinks.map((link) => (
                  <li key={link.href} className="group w-fit">
                    <Link
                      href={link.href}
                      className="inline-block transition group-hover:text-foreground group-hover:underline group-hover:underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 space-y-3 lg:col-span-1">
              <div className="text-[18px] font-medium uppercase leading-9.5 tracking-[0.01em] text-foreground">
                {contactTitle}
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="footer-contact-link text-[16px] font-medium leading-6 tracking-[-0.03em] underline underline-offset-4"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Image
        src="/images/brand/footer-watermark-strong.svg"
        alt=""
        width={1200}
        height={200}
        aria-hidden="true"
        loading="eager"
        className="pointer-events-none absolute bottom-0 left-1/2 w-[95%] max-w-6xl -translate-x-1/2 select-none"
      />
    </footer>
  );
}
