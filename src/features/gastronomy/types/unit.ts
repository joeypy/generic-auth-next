import type { units } from "../db/schemas/drizzle-unit-schema";

export type Unit = typeof units.$inferSelect;
export type CreateUnitData = typeof units.$inferInsert;
export type UpdateUnitData = Partial<Omit<CreateUnitData, "id">>;
