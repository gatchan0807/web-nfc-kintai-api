export interface UserData {
  cardId: string;
  passcode: string;
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

export interface SendLog {
  cardId: string;
  templateId: string;
  timestamp: string;
}
