import { UnitRepository } from "../db/repositories/drizzle-unit-repository";
import { Unit, CreateUnitData, UpdateUnitData } from "../types/unit";

export class UnitService {
  constructor(private unitRepository: UnitRepository) {}

  async createUnit(data: CreateUnitData): Promise<Unit> {
    return this.unitRepository.create(data);
  }

  async getUnitById(id: string): Promise<Unit | null> {
    return this.unitRepository.findById(id);
  }

  async getAllUnits(): Promise<Unit[]> {
    return this.unitRepository.findAll();
  }

  async getUnitsByType(unitType: string): Promise<Unit[]> {
    return this.unitRepository.findByType(unitType);
  }

  async getUnitsByCategory(category: string): Promise<Unit[]> {
    return this.unitRepository.findByCategory(category);
  }

  async updateUnit(id: string, data: UpdateUnitData): Promise<Unit | null> {
    return this.unitRepository.update(id, data);
  }

  async deleteUnit(id: string): Promise<boolean> {
    return this.unitRepository.delete(id);
  }

  // Unit conversion logic
  async convertUnit(
    value: number,
    fromUnitId: string,
    toUnitId: string
  ): Promise<number | null> {
    const fromUnit = await this.unitRepository.findById(fromUnitId);
    const toUnit = await this.unitRepository.findById(toUnitId);

    if (!fromUnit || !toUnit) return null;

    // Can only convert between same unit types
    if (fromUnit.unitType !== toUnit.unitType) {
      throw new Error(
        `Cannot convert between different unit types: ${fromUnit.unitType} and ${toUnit.unitType}`
      );
    }

    // Get conversion factors
    const fromFactor = Number(fromUnit.conversionFactor) || 1;
    const toFactor = Number(toUnit.conversionFactor) || 1;

    // Convert to base unit, then to target unit
    const baseValue = value * fromFactor;
    const convertedValue = baseValue / toFactor;

    return convertedValue;
  }

  // Get base unit for a given type
  async getBaseUnitForType(unitType: string): Promise<Unit | null> {
    return this.unitRepository.findBaseUnit(unitType);
  }
}
