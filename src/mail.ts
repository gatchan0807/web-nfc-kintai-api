import { MailTemplate, MailTemplateList } from "./types";

export function setDefaultTemplate(
  allTemplates: MailTemplateList
): MailTemplate | undefined {
  Logger.log(Utilities.formatDate(new Date(), "Asia/Tokyo", "HHmm"));
  Logger.log(Utilities.formatDate(new Date(), "Asia/Tokyo", "HHmm") < "1000");

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
