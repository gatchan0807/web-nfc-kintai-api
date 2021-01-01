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

  const result = userDataList.find((ud) => {
    ud.cardId === userData.cardId;
  });

  Logger.log(result);
  Logger.log(userData.cardId === userDataList[0].cardId);

  if (!result) {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Used card is not registered." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  Logger.log(mailTemplates);
  Logger.log(userDataList);

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
}

type Payload = {
  items: {
    cardId: string;
    passcode: string;
  };
};
