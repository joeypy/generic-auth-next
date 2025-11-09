import { InvitationRepository } from "./db/repository";
import {
  Invitation,
  CreateInvitationData,
  UpdateInvitationData,
} from "./types/invitation";

export class InvitationService {
  constructor(private invitationRepository: InvitationRepository) {}

  async createInvitation(data: CreateInvitationData): Promise<Invitation> {
    // Check if invitation already exists for this email and organization
    const existingInvitation =
      await this.invitationRepository.findByOrganizationAndEmail(
        data.organizationId,
        data.email
      );
    if (existingInvitation && existingInvitation.status === "pending") {
      throw new Error(
        "Invitation already exists for this email and organization"
      );
    }

    return this.invitationRepository.create(data);
  }

  async getInvitationById(id: string): Promise<Invitation | null> {
    return this.invitationRepository.findById(id);
  }

  async getInvitationsByOrganizationId(
    organizationId: string
  ): Promise<Invitation[]> {
    return this.invitationRepository.findByOrganizationId(organizationId);
  }

  async getInvitationsByEmail(email: string): Promise<Invitation[]> {
    return this.invitationRepository.findByEmail(email);
  }

  async getInvitationByOrganizationAndEmail(
    organizationId: string,
    email: string
  ): Promise<Invitation | null> {
    return this.invitationRepository.findByOrganizationAndEmail(
      organizationId,
      email
    );
  }

  async getInvitationsByStatus(status: string): Promise<Invitation[]> {
    return this.invitationRepository.findByStatus(status);
  }

  async updateInvitation(
    id: string,
    data: UpdateInvitationData
  ): Promise<Invitation | null> {
    return this.invitationRepository.update(id, data);
  }

  async deleteInvitation(id: string): Promise<boolean> {
    return this.invitationRepository.delete(id);
  }

  async deleteInvitationsByOrganizationId(
    organizationId: string
  ): Promise<boolean> {
    return this.invitationRepository.deleteByOrganizationId(organizationId);
  }

  async deleteExpiredInvitations(): Promise<boolean> {
    return this.invitationRepository.deleteExpired();
  }

  async acceptInvitation(id: string): Promise<Invitation | null> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation) {
      throw new Error("Invitation not found");
    }

    if (invitation.status !== "pending") {
      throw new Error("Invitation is not pending");
    }

    if (invitation.expiresAt < new Date()) {
      throw new Error("Invitation has expired");
    }

    return this.invitationRepository.update(id, { status: "accepted" });
  }

  async rejectInvitation(id: string): Promise<Invitation | null> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation) {
      throw new Error("Invitation not found");
    }

    if (invitation.status !== "pending") {
      throw new Error("Invitation is not pending");
    }

    return this.invitationRepository.update(id, { status: "rejected" });
  }

  async isInvitationValid(id: string): Promise<boolean> {
    const invitation = await this.invitationRepository.findById(id);
    if (!invitation) return false;

    return invitation.status === "pending" && invitation.expiresAt > new Date();
  }

  async generateInvitationExpiryDate(daysFromNow: number = 7): Promise<Date> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysFromNow);
    return expiryDate;
  }
}
