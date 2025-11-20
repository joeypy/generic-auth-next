import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  decimal,
} from "drizzle-orm/pg-core";

export const units = pgTable("units", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  abbreviation: text("abbreviation").notNull(),
  unitType: text("unit_type").notNull(), // e.g., 'volume', 'weight', 'count'
  category: text("category"), // e.g., 'metric', 'imperial'
  conversionFactor: decimal("conversion_factor", { precision: 10, scale: 6 }), // factor to convert to base unit
  baseUnit: boolean("base_unit").default(false), // is this the base unit for its type?
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
