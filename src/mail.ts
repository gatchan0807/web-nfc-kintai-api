import { MailTemplate, MailTemplateList } from "./types";

export function setDefaultTemplate(
  allTemplates: MailTemplateList
): MailTemplate | undefined {
  const now = Utilities.formatDate(new Date(), "Asia/Tokyo", "HHmm");

  if (now < "1000" && now > "0000") {
    return allTemplates.find((template) => {
      return template.timingId === "remote_work_start";
    });
  } else if (now > "1900" && now < "2359") {
    return allTemplates.find((template) => {
      return template.timingId === "remote_work_end";
    });
  } else {
    return undefined;
  }
}

export function replacePlaceholderOfText(
  rawText: string,
  name = "古賀"
): string {
  Logger.log(name);
  let text = rawText;

  const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "MM/dd");

  text = text.replace(/{{NAME}}/g, name + "");
  text = text.replace(/{{DATE}}/g, today + "");

  return text;
}
