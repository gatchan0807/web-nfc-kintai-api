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

  Logger.log(event.parameters);
  Logger.log(payload);
  Logger.log(userData);

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
