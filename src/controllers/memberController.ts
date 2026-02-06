import { Request, Response } from "express";
import * as memberService from "../services/memberService";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving members" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }
    const member = await memberService.getMemberById(id);
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving member" });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const {
      forename,
      surname,
      email,
      phone_number,
      address_line1,
      address_line2,
      postcode,
      city,
    } = req.body;
    const newMember = await memberService.createMember(
      forename,
      surname,
      email,
      phone_number,
      address_line1,
      address_line2,
      postcode,
      city,
    );
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Error creating member" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }
    const updatedMember = await memberService.updateMember(id, req.body);
    if (updatedMember) {
      res.json(updatedMember);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating member" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }
    await memberService.deleteMember(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting member" });
  }
};
