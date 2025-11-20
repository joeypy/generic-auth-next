import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "@/features/users/db/schema";

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  prepTime: integer("prep_time"), // in minutes
  cookTime: integer("cook_time"), // in minutes
  servings: integer("servings"),
  difficulty: text("difficulty"), // e.g., 'easy', 'medium', 'hard'
  category: text("category"), // e.g., 'dessert', 'main course', 'appetizer'
  isSubrecipe: boolean("is_subrecipe").default(false),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
