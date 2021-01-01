import { getMailTemplate, getUserDataList } from "./spreadsheets";

const SPREAD_SHEET_ID = "1EZ9SmiF-EjtWj4LksRrcYQoQqXOSkV34YawsPzp8pRE";

export function doGet(
  event: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const payload = event.parameter as Payload;
  let userData = {
    cardId: "",
    passcode: "",
  };

  if (!payload.items) {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Request has not payloads." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const { items } = payload;
  userData = items;

  const mailTemplates = getMailTemplate(SPREAD_SHEET_ID);
  const userDataList = getUserDataList(SPREAD_SHEET_ID);

  Logger.log(mailTemplates);
  Logger.log(userDataList);

  return ContentService.createTextOutput(JSON.stringify(userData)).setMimeType(
    ContentService.MimeType.JSON
  );
}

type Payload = {
  items: {
    cardId: string;
    passcode: string;
  };
};
