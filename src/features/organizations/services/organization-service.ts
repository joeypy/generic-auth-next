import { OrganizationRepository } from "./db/repository";
import {
  Organization,
  CreateOrganizationData,
  UpdateOrganizationData,
} from "./types/organization";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async createOrganization(
    data: CreateOrganizationData
  ): Promise<Organization> {
    // Check if slug is unique if provided
    if (data.slug) {
      const existingOrg = await this.organizationRepository.findBySlug(
        data.slug
      );
      if (existingOrg) {
        throw new Error("Organization with this slug already exists");
      }
    }

    return this.organizationRepository.create(data);
  }

  async getOrganizationById(id: string): Promise<Organization | null> {
    return this.organizationRepository.findById(id);
  }

  async getOrganizationBySlug(slug: string): Promise<Organization | null> {
    return this.organizationRepository.findBySlug(slug);
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async updateOrganization(
    id: string,
    data: UpdateOrganizationData
  ): Promise<Organization | null> {
    // Check if slug is unique if being updated
    if (data.slug) {
      const existingOrg = await this.organizationRepository.findBySlug(
        data.slug
      );
      if (existingOrg && existingOrg.id !== id) {
        throw new Error("Organization with this slug already exists");
      }
    }

    return this.organizationRepository.update(id, data);
  }

  async deleteOrganization(id: string): Promise<boolean> {
    return this.organizationRepository.delete(id);
  }

  async generateSlug(name: string): Promise<string> {
    // Generate a URL-friendly slug from the organization name
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}
