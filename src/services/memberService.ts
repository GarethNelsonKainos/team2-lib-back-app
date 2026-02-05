import db from '../db';
import { Member } from '../types/types';

export const getMembers = async (): Promise<Member[]> => {
  const result = await db.query('SELECT * FROM members WHERE is_deleted = false');
  return result as Member[];
};

export const getMemberById = async (id: number): Promise<Member | null> => {
  const result = await db.query('SELECT * FROM members WHERE member_id = $1 AND is_deleted = false', [id]);
  return result.length > 0 ? (result[0] as Member) : null;
};

export const createMember = async (member: Omit<Member, 'member_id' | 'status'>): Promise<Member> => {
  const { forename, surname, email, phone_number, address_line1, address_line2, postcode, city } = member;
  const result = await db.query(
    'INSERT INTO members (forename, surname, email, phone_number, address_line1, address_line2, postcode, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [forename, surname, email, phone_number, address_line1, address_line2, postcode, city]
  );
  return result[0] as Member;
};

export const updateMember = async (id: number, member: Partial<Member>): Promise<Member | null> => {
  const existingMember = await getMemberById(id);
  if (!existingMember) {
    return null;
  }

  const updatedMember = { ...existingMember, ...member };
  const { forename, surname, email, phone_number, address_line1, address_line2, postcode, city, status } = updatedMember;

  const result = await db.query(
    'UPDATE members SET forename = $1, surname = $2, email = $3, phone_number = $4, address_line1 = $5, address_line2 = $6, postcode = $7, city = $8, status = $9 WHERE member_id = $10 RETURNING *',
    [forename, surname, email, phone_number, address_line1, address_line2, postcode, city, status, id]
  );

  return result[0] as Member;
};

export const deleteMember = async (id: number): Promise<boolean> => {
    const result = await db.query('UPDATE members SET is_deleted = true WHERE member_id = $1', [id]);
    return true;
};
