import { MailTemplate, MailTemplateList } from "./types";

export function setDefaultTemplate(
  allTemplates: MailTemplateList
): MailTemplate | undefined {
  if (Utilities.formatDate(new Date(), "Asia/Tokyo", "HHmm") < "1000") {
    return allTemplates.find((template) => {
      return template.timingId === "remote_work_start";
    });
  } else if (Utilities.formatDate(new Date(), "Asia/Tokyo", "HHmm") > "1900") {
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
  let text = rawText;

  const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "MM/dd");

  text = text.replace(/{{NAME}}/g, name + "");
  text = text.replace(/{{DATE}}/g, today + "");

  return text;
}
