import { eq, and } from "drizzle-orm";
import { invitation } from "./schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Invitation,
  CreateInvitationData,
  UpdateInvitationData,
} from "../types/invitation";

// Invitation repository implementation
export class InvitationRepository extends BaseRepository<Invitation> {
  async create(data: CreateInvitationData): Promise<Invitation> {
    const [newInvitation] = await this.db
      .insert(invitation)
      .values({
        ...data,
        status: "pending",
      })
      .returning();

    return newInvitation as Invitation;
  }

  async findById(id: string): Promise<Invitation | null> {
    const [invitationRecord] = await this.db
      .select()
      .from(invitation)
      .where(eq(invitation.id, id));

    return (invitationRecord as Invitation) || null;
  }

  async findByOrganizationId(organizationId: string): Promise<Invitation[]> {
    const invitations = await this.db
      .select()
      .from(invitation)
      .where(eq(invitation.organizationId, organizationId));

    return invitations as Invitation[];
  }

  async findByEmail(email: string): Promise<Invitation[]> {
    const invitations = await this.db
      .select()
      .from(invitation)
      .where(eq(invitation.email, email));

    return invitations as Invitation[];
  }

  async findByOrganizationAndEmail(
    organizationId: string,
    email: string
  ): Promise<Invitation | null> {
    const [invitationRecord] = await this.db
      .select()
      .from(invitation)
      .where(
        and(
          eq(invitation.organizationId, organizationId),
          eq(invitation.email, email)
        )
      );

    return (invitationRecord as Invitation) || null;
  }

  async findByStatus(status: string): Promise<Invitation[]> {
    const invitations = await this.db
      .select()
      .from(invitation)
      .where(eq(invitation.status, status));

    return invitations as Invitation[];
  }

  async update(
    id: string,
    data: UpdateInvitationData
  ): Promise<Invitation | null> {
    const [updatedInvitation] = await this.db
      .update(invitation)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(invitation.id, id))
      .returning();

    return (updatedInvitation as Invitation) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(invitation)
      .where(eq(invitation.id, id));

    return result.rowCount > 0;
  }

  async deleteByOrganizationId(organizationId: string): Promise<boolean> {
    const result = await this.db
      .delete(invitation)
      .where(eq(invitation.organizationId, organizationId));

    return result.rowCount > 0;
  }

  async deleteExpired(): Promise<boolean> {
    const result = await this.db
      .delete(invitation)
      .where(eq(invitation.expiresAt, new Date()));

    return result.rowCount > 0;
  }
}
