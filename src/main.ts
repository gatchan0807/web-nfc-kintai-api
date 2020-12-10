export function doGet(
  event: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const payload = event.parameter as Payload;
  const userData = {
    cardId: "",
    passcode: "",
  };

  if (payload.items) {
    const { items } = payload;
    userData.cardId = items.cardId;
    userData.passcode = items.passcode;
  }

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
