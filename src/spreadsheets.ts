import { MailTemplateList, SendLog, UserDataList } from "./types";
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

/**
 * 送信実行ログをSpreadSheetに記録する
 *
 * @param payload シートに登録するための
 * @param spreadSheetId リマインド文言シートがあるSpreadSheetのID
 * @param sheetName Sheetの名前。デフォルトで `UserData` を設定済み
 */
export function appendSendLog(
  payload: SendLog,
  spreadSheetId: string,
  sheetName = "SendLog"
): boolean {
  const sendLogSheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName(
    sheetName
  );

  if (!sendLogSheet) return false;

  // Timestampの更新
  payload.timestamp = Utilities.formatDate(
    new Date(),
    "Asia/Tokyo",
    "yyyy/MM/dd HH:mm"
  );

  if (sendLogSheet.appendRow(formatSendLogPayload(payload))) {
    return true;
  } else {
    return false;
  }
}

// ============ private functions ============

function formatMailTemplateList(rawValues: ResponsedAny[][]): MailTemplateList {
  return rawValues.map((rv) => {
    return {
      timingId: rv[0],
      rawTitle: rv[1],
      rawContent: rv[2],
      rawSendTargetMailAddress: rv[3],
      sendTargetMailAddress: rv[3].split("/"),
    };
  });
}

function formatUserDataList(rawValues: ResponsedAny[][]): UserDataList {
  return rawValues.map((rv) => {
    return {
      cardId: rv[0],
      passcode: rv[1],
    };
  });
}

function formatSendLogPayload(rawValues: SendLog): string[] {
  return [
    // String型に強制キャスト
    rawValues.cardId + "",
    rawValues.templateId + "",
    rawValues.timestamp + "",
  ];
}
