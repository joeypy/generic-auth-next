import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  decimal,
  date,
} from "drizzle-orm/pg-core";
import { user } from "@/features/users/db/schema";
import { recipes } from "./drizzle-recipe-schema";

export const recipeBudgets = pgTable("recipe_budgets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  recipeId: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  budgetName: text("budget_name").notNull(),
  budgetDate: date("budget_date").notNull(),
  servings: integer("servings").notNull(),
  ingredientCost: decimal("ingredient_cost", { precision: 10, scale: 2 }).default(
    "0"
  ),
  laborCost: decimal("labor_cost", { precision: 10, scale: 2 }).default("0"),
  overheadCost: decimal("overhead_cost", { precision: 10, scale: 2 }).default(
    "0"
  ),
  packagingCost: decimal("packaging_cost", { precision: 10, scale: 2 }).default(
    "0"
  ),
  otherCosts: decimal("other_costs", { precision: 10, scale: 2 }).default("0"),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).default("0"),
  profitMarginPercentage: decimal("profit_margin_percentage", {
    precision: 5,
    scale: 2,
  }).default("0"),
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }).default(
    "0"
  ),
  notes: text("notes"),
  status: text("status").default("draft"), // e.g., 'draft', 'active', 'archived'
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
