import { useEffect } from "react";
import { onConsentChange } from "@/lib/consent";
import { syncTagManager } from "@/lib/tag-manager";

export function TagManager() {
  useEffect(() => {
    syncTagManager();
    return onConsentChange(syncTagManager);
  }, []);

  return null;
}