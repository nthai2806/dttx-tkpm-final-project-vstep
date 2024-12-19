import { User } from "./user";

export type VstepB2Question = {
  id: number;
  content: string;
  a: string;
  b: string;
  c: string;
  d: string;
  result: "a" | "b" | "c" | "d";
};

export type VstepB2Reading = {
  id: number;
  title: string;
  content: string;
  questions: VstepB2Question[];
};

export type VstepB2Listening = {
  id: number;
  audio: {
    id: number;
    url: string;
  };
  audioUrl: string;
  audioScript: string;
  questions: VstepB2Question[];
};

export type VstepB2ListeningPart = {
  id: number;
  title: string;
  listenings: VstepB2Listening[];
};

export type VstepB2Writing = {
  id: number;
  title: string;
  content: string;
};

export type VstepB2Speaking = {
  id: number;
  title: string;
  content: string;
};

export type VstepB2Exam = {
  id: string;
  title: string;

  readingSection?: VstepB2Reading[];
  listeningSection?: VstepB2ListeningPart[];
  writingSection?: VstepB2Writing[];
  speakingSection?: VstepB2Speaking[];

  beginDate?: Date;
  endDate?: Date;

  creator?: User;
};

export type ConfigVstepB2 = {
  readingTimebox: number;
  listeningTimebox: number;
  writingTimebox: number;
  speakingTimebox: number;
};

export type Media = {
  id: number;
  documentId: string;
  name: string;
  url: string;
};
