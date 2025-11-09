"use client";

import { BetterAuthActionButton } from "@/shared/components/better-auth-action-btn";
import { authClient } from "@/shared/lib/auth/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "@/shared/lib/auth/o-auth-providers";
import { cn } from "../lib/utils";

export function SocialAuthButtons({ className }: { className?: string }) {
  return SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
    const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon;

    return (
      <BetterAuthActionButton
        variant="outline"
        className={cn("cursor-pointer", className)}
        key={provider}
        action={() => {
          return authClient.signIn.social({
            provider,
            callbackURL: "/",
          });
        }}
      >
        <Icon />
        {SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
      </BetterAuthActionButton>
    );
  });
}
