// Export all schemas as a single schema object for Drizzle
import { user } from "@/features/users/db/schema";
import { session } from "@/features/auth/db/schemas/drizzle-session-schema";
import { account } from "@/features/auth/db/schemas/drizzle-account-schema";
import { verification } from "@/features/auth/db/schemas/drizzle-verification-schema";
import { twoFactor } from "@/features/auth/db/schemas/drizzle-two-factor-schema";
import { passkey } from "@/features/auth/db/schemas/drizzle-passkey-schema";
import { organization } from "@/features/organizations/db/schemas/drizzle-organization-schema";
import { member } from "@/features/organizations/db/schemas/drizzle-member-schema";
import { invitation } from "@/features/organizations/db/schemas/drizzle-invitation-schema";
import { subscription } from "@/features/subscriptions/db/schemas/drizzle-subscription-schema";
import { recipes } from "@/features/gastronomy/db/schemas/drizzle-recipe-schema";
import { units } from "@/features/gastronomy/db/schemas/drizzle-unit-schema";
import { recipeIngredients } from "@/features/gastronomy/db/schemas/drizzle-recipe-ingredient-schema";
import { recipeInstructions } from "@/features/gastronomy/db/schemas/drizzle-recipe-instruction-schema";
import { recipeSubrecipes } from "@/features/gastronomy/db/schemas/drizzle-recipe-subrecipe-schema";
import { recipeBudgets } from "@/features/gastronomy/db/schemas/drizzle-recipe-budget-schema";

export const schema = {
  user,
  session,
  account,
  verification,
  twoFactor,
  passkey,
  organization,
  member,
  invitation,
  subscription,
  recipes,
  units,
  recipeIngredients,
  recipeInstructions,
  recipeSubrecipes,
  recipeBudgets,
};

// Export individual schemas for Drizzle
export {
  user,
  session,
  account,
  verification,
  twoFactor,
  passkey,
  organization,
  member,
  invitation,
  subscription,
  recipes,
  units,
  recipeIngredients,
  recipeInstructions,
  recipeSubrecipes,
  recipeBudgets,
};
