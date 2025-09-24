import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

type CampaignState = {
  campaignName: string;
  description: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  participantInstructions: string;
  interviewPrompt: string;
  outcomePrompt: string;
  participants: string[];

  setCampaignName: (name: string) => void;
  setDescription: (desc: string) => void;
  setDates: (start: Dayjs | null, end: Dayjs | null) => void;
  setParticipantInstructions: (val: string) => void;
  setInterviewPrompt: (val: string) => void;
  setOutcomePrompt: (val: string) => void;
  addParticipant: (p: string) => void;
  removeParticipant: (idx: number) => void;
};

export const useCampaignStore = create<CampaignState>((set) => ({
  campaignName: '',
  description: 'This campaign delves deep into the personal narratives of adventurers...',
  startDate: null,
  endDate: null,
  participantInstructions: '',
  interviewPrompt: '',
  outcomePrompt: '',
  participants: ['Ana Marin Scot', 'Sarah Kirby Holt', 'Abigail Dougherty', 'Chris Martin'],

  setCampaignName: (name) => set({ campaignName: name }),
  setDescription: (desc) => set({ description: desc }),
  setDates: (start, end) => set({ startDate: start, endDate: end }),
  setParticipantInstructions: (val) => set({ participantInstructions: val }),
  setInterviewPrompt: (val) => set({ interviewPrompt: val }),
  setOutcomePrompt: (val) => set({ outcomePrompt: val }),
  addParticipant: (p) =>
    set((state) => ({
      participants: p.trim() ? [...state.participants, p.trim()] : state.participants
    })),
  removeParticipant: (idx) =>
    set((state) => ({
      participants: state.participants.filter((_, i) => i !== idx)
    }))
}));
