import { Request, Response } from 'express';
import * as memberService from '../services/memberService';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving members' });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const member = await memberService.getMemberById(id);
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving member' });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const newMember = await memberService.createMember(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error creating member' });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updatedMember = await memberService.updateMember(id, req.body);
    if (updatedMember) {
      res.json(updatedMember);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
};




/// SHOULD BE SOFT DELETE IE FLAGGED 
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await memberService.deleteMember(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
};
