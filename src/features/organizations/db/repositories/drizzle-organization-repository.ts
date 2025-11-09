import { eq } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { organization } from "../schemas/drizzle-organization-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Organization,
  CreateOrganizationData,
  UpdateOrganizationData,
} from "../../types/organization";

// Organization repository implementation
export class OrganizationRepository extends BaseRepository<Organization> {
  async create(data: CreateOrganizationData): Promise<Organization> {
    const [newOrganization] = await this.db
      .insert(organization)
      .values({
        id: generateId(),
        ...data,
      })
      .returning();

    return newOrganization as Organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const [organizationRecord] = await this.db
      .select()
      .from(organization)
      .where(eq(organization.id, id));

    return (organizationRecord as Organization) || null;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const [organizationRecord] = await this.db
      .select()
      .from(organization)
      .where(eq(organization.slug, slug));

    return (organizationRecord as Organization) || null;
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.db.select().from(organization);

    return organizations as Organization[];
  }

  async update(
    id: string,
    data: UpdateOrganizationData
  ): Promise<Organization | null> {
    const [updatedOrganization] = await this.db
      .update(organization)
      .set(data)
      .where(eq(organization.id, id))
      .returning();

    return (updatedOrganization as Organization) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(organization)
      .where(eq(organization.id, id));

    return result.length > 0;
  }
}
