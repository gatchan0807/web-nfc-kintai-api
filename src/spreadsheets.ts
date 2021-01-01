import { MailTemplateList, UserDataList } from "./types";
type ResponsedAny = any;

/**
 * 指定のSpreadSheetのメールテンプレートシートからテンプレートリストを取得し、
 *  プレースホルダー置き換え前状態のメッセージをオブジェクトに詰めて返す
 *
 * @param spreadSheetId リマインド文言シートがあるSpreadSheetのID
 * @param sheetName Sheetの名前。デフォルトで `MailTemplate` を設定済み
 */
export function getMailTemplate(
  spreadSheetId: string,
  sheetName = "MailTemplate"
): MailTemplateList {
  const mailTemplateSheet = SpreadsheetApp.openById(
    spreadSheetId
  ).getSheetByName(sheetName);

  if (!mailTemplateSheet) return [];

  const mailTemplateAllRange = mailTemplateSheet.getDataRange().getValues();
  const [_, ...mailTemplateValues] = mailTemplateAllRange;

  return formatMailTemplateList(mailTemplateValues);
}

/**
 * 指定のSpreadSheetのユーザーデータシートからユーザー情報のリストを取得し、
 *  オブジェクトに詰めて返す
 *
 * @param spreadSheetId リマインド文言シートがあるSpreadSheetのID
 * @param sheetName Sheetの名前。デフォルトで `UserData` を設定済み
 */
export function getUserDataList(
  spreadSheetId: string,
  sheetName = "UserData"
): UserDataList {
  const userDataSheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName(
    sheetName
  );

  if (!userDataSheet) return [];

  const userListAllRange = userDataSheet.getDataRange().getValues();
  const [_, ...userDataValues] = userListAllRange;

  return formatUserDataList(userDataValues);
}

// ============ private functions ============

function formatMailTemplateList(rawValues: ResponsedAny[][]): MailTemplateList {
  return rawValues.map((rv) => {
    return {
      timingId: rv[0],
      rawTitle: rv[1],
      rawContent: rv[2],
      rawSendTargetMailAddress: rv[3],
      sendTargetMailAddress: rv[3].split(","),
    };
  });
}

function formatUserDataList(rawValues: ResponsedAny[][]): UserDataList {
  return rawValues.map((rv) => {
    return {
      cardId: rv[0],
      passcode: rv[1],
      usedCount: parseInt(rv[2]),
    };
  });
}
