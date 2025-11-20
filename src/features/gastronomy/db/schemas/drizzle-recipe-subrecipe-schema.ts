import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  decimal,
} from "drizzle-orm/pg-core";
import { recipes } from "./drizzle-recipe-schema";
import { units } from "./drizzle-unit-schema";

export const recipeSubrecipes = pgTable("recipe_subrecipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentRecipeId: uuid("parent_recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  subrecipeId: uuid("subrecipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  quantity: decimal("quantity", { precision: 10, scale: 3 }).notNull(),
  unitId: uuid("unit_id")
    .notNull()
    .references(() => units.id),
  notes: text("notes"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
