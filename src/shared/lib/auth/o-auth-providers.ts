import { ComponentProps, ElementType } from "react";
import { FcGoogle } from "react-icons/fc";

export const SUPPORTED_OAUTH_PROVIDERS = ["google"] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProvider,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  google: { name: "Google", Icon: FcGoogle },
};
