import { eq, and } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { member } from "../schemas/drizzle-member-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import { Member, CreateMemberData, UpdateMemberData } from "../../types/member";

// Member repository implementation
export class MemberRepository extends BaseRepository<Member> {
  async create(data: CreateMemberData): Promise<Member> {
    const [newMember] = await this.db
      .insert(member)
      .values({
        id: generateId(),
        ...data,
      })
      .returning();

    return newMember as Member;
  }

  async findById(id: string): Promise<Member | null> {
    const [memberRecord] = await this.db
      .select()
      .from(member)
      .where(eq(member.id, id));

    return (memberRecord as Member) || null;
  }

  async findByOrganizationId(organizationId: string): Promise<Member[]> {
    const members = await this.db
      .select()
      .from(member)
      .where(eq(member.organizationId, organizationId));

    return members as Member[];
  }

  async findByUserId(userId: string): Promise<Member[]> {
    const members = await this.db
      .select()
      .from(member)
      .where(eq(member.userId, userId));

    return members as Member[];
  }

  async findByOrganizationAndUser(
    organizationId: string,
    userId: string
  ): Promise<Member | null> {
    const [memberRecord] = await this.db
      .select()
      .from(member)
      .where(
        and(
          eq(member.organizationId, organizationId),
          eq(member.userId, userId)
        )
      );

    return (memberRecord as Member) || null;
  }

  async update(id: string, data: UpdateMemberData): Promise<Member | null> {
    const [updatedMember] = await this.db
      .update(member)
      .set(data)
      .where(eq(member.id, id))
      .returning();

    return (updatedMember as Member) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(member).where(eq(member.id, id));

    return result.length > 0;
  }

  async deleteByOrganizationId(organizationId: string): Promise<boolean> {
    const result = await this.db
      .delete(member)
      .where(eq(member.organizationId, organizationId));

    return result.length > 0;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await this.db
      .delete(member)
      .where(eq(member.userId, userId));

    return result.length > 0;
  }
}
