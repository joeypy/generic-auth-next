import { MemberRepository } from "./db/repository";
import { Member, CreateMemberData, UpdateMemberData } from "./types/member";

export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async createMember(data: CreateMemberData): Promise<Member> {
    // Check if user is already a member of this organization
    const existingMember =
      await this.memberRepository.findByOrganizationAndUser(
        data.organizationId,
        data.userId
      );
    if (existingMember) {
      throw new Error("User is already a member of this organization");
    }

    return this.memberRepository.create(data);
  }

  async getMemberById(id: string): Promise<Member | null> {
    return this.memberRepository.findById(id);
  }

  async getMembersByOrganizationId(organizationId: string): Promise<Member[]> {
    return this.memberRepository.findByOrganizationId(organizationId);
  }

  async getMembersByUserId(userId: string): Promise<Member[]> {
    return this.memberRepository.findByUserId(userId);
  }

  async getMemberByOrganizationAndUser(
    organizationId: string,
    userId: string
  ): Promise<Member | null> {
    return this.memberRepository.findByOrganizationAndUser(
      organizationId,
      userId
    );
  }

  async updateMember(
    id: string,
    data: UpdateMemberData
  ): Promise<Member | null> {
    return this.memberRepository.update(id, data);
  }

  async deleteMember(id: string): Promise<boolean> {
    return this.memberRepository.delete(id);
  }

  async removeMemberFromOrganization(
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    const member = await this.memberRepository.findByOrganizationAndUser(
      organizationId,
      userId
    );
    if (!member) {
      throw new Error("Member not found");
    }

    return this.memberRepository.delete(member.id);
  }

  async removeAllMembersFromOrganization(
    organizationId: string
  ): Promise<boolean> {
    return this.memberRepository.deleteByOrganizationId(organizationId);
  }

  async removeUserFromAllOrganizations(userId: string): Promise<boolean> {
    return this.memberRepository.deleteByUserId(userId);
  }

  async isUserMemberOfOrganization(
    organizationId: string,
    userId: string
  ): Promise<boolean> {
    const member = await this.memberRepository.findByOrganizationAndUser(
      organizationId,
      userId
    );
    return member !== null;
  }

  async getUserRoleInOrganization(
    organizationId: string,
    userId: string
  ): Promise<string | null> {
    const member = await this.memberRepository.findByOrganizationAndUser(
      organizationId,
      userId
    );
    return member?.role || null;
  }
}
