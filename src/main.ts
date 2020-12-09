export function doGet(
  event: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  Logger.log("HEY!");

  return ContentService.createTextOutput(
    JSON.stringify(event.parameter)
  ).setMimeType(ContentService.MimeType.JSON);
}
