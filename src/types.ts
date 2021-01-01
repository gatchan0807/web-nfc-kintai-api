export interface UserData {
  cardId: string;
  passcode: string;
  usedCount: number;
}

export type UserDataList = UserData[];

export interface MailTemplate {
  timingId: string;
  rawTitle: string;
  rawContent: string;
  rawSendTargetMailAddress: string;
  sendTargetMailAddress: string[];
}

export type MailTemplateList = MailTemplate[];
