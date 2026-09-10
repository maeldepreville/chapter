"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { staticAsset } from "./static-assets";

type EmptyDestinationProps = {
  asset: string;
  assetAlt: string;
  kicker: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  compact?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
  section: "journal" | "library" | "discover" | "search" | "profile" | "list" | "trace";
};

export function EmptyDestination({ asset, assetAlt, kicker, title, children, action, compact = false, headingLevel = "h2", section }: EmptyDestinationProps) {
  const Heading = headingLevel;
  return (
    <div className={`editorial-empty editorial-empty--centered destination-empty destination-empty--${section}${compact ? " destination-empty--compact" : ""}`}>
      <figure className="destination-empty-asset">
        <Image src={staticAsset(asset)} alt={assetAlt} width={1200} height={800} sizes={compact ? "(max-width: 899px) 70vw, 280px" : "(max-width: 899px) 88vw, 520px"} unoptimized />
      </figure>
      <p className="empty-kicker">{kicker}</p>
      <Heading>{title}</Heading>
      <p>{children}</p>
      {action && <div className="destination-empty-actions">{action}</div>}
    </div>
  );
}
