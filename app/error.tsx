"use client";

import { useEffect } from "react";
import { ErrorSurface } from "./p6-states";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <ErrorSurface onRetry={reset} />;
}
