import { eq, and } from "drizzle-orm";
import { units } from "../schemas/drizzle-unit-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import { Unit, CreateUnitData, UpdateUnitData } from "../../types/unit";

export class UnitRepository extends BaseRepository<Unit> {
  async create(data: CreateUnitData): Promise<Unit> {
    const [newUnit] = await this.db
      .insert(units)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newUnit as Unit;
  }

  async findById(id: string): Promise<Unit | null> {
    const [unit] = await this.db.select().from(units).where(eq(units.id, id));

    return (unit as Unit) || null;
  }

  async findAll(): Promise<Unit[]> {
    const allUnits = await this.db
      .select()
      .from(units)
      .where(eq(units.isActive, true));

    return allUnits as Unit[];
  }

  async findByType(unitType: string): Promise<Unit[]> {
    const typeUnits = await this.db
      .select()
      .from(units)
      .where(and(eq(units.unitType, unitType), eq(units.isActive, true)));

    return typeUnits as Unit[];
  }

  async findByCategory(category: string): Promise<Unit[]> {
    const categoryUnits = await this.db
      .select()
      .from(units)
      .where(and(eq(units.category, category), eq(units.isActive, true)));

    return categoryUnits as Unit[];
  }

  async findBaseUnit(unitType: string): Promise<Unit | null> {
    const [baseUnit] = await this.db
      .select()
      .from(units)
      .where(
        and(
          eq(units.unitType, unitType),
          eq(units.baseUnit, true),
          eq(units.isActive, true)
        )
      );

    return (baseUnit as Unit) || null;
  }

  async update(id: string, data: UpdateUnitData): Promise<Unit | null> {
    const [updatedUnit] = await this.db
      .update(units)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(units.id, id))
      .returning();

    return (updatedUnit as Unit) || null;
  }

  async delete(id: string): Promise<boolean> {
    // Soft delete by setting isActive to false
    const [deletedUnit] = await this.db
      .update(units)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(units.id, id))
      .returning();

    return deletedUnit !== undefined;
  }
}
