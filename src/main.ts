import { replacePlaceholderOfText, setDefaultTemplate } from "./mail";
import {
  appendSendLog,
  getMailTemplate,
  getUserDataList,
} from "./spreadsheets";

const SPREAD_SHEET_ID = "1EZ9SmiF-EjtWj4LksRrcYQoQqXOSkV34YawsPzp8pRE";

export function doGet(
  event: GoogleAppsScript.Events.DoGet
): GoogleAppsScript.Content.TextOutput {
  const payload = event.parameter as Payload;
  let userData = {
    cardId: "",
    passcode: "",
  };

  // Card IDが受信できているかチェック
  if (!payload.items) {
    return ContentService.createTextOutput(
      JSON.stringify({ message: "Request has not payloads.", statusCode: 400 })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // 受け取ったCard IDが登録済みかチェック
  // 受け取ったパスコードが登録されているものと一致するかチェック
  const { items } = payload;
  userData = JSON.parse(items);

  const userDataList = getUserDataList(SPREAD_SHEET_ID);
  const searchResult = userDataList.find((ud) => {
    return ud.cardId === userData.cardId;
  });

  if (!searchResult || searchResult.passcode !== userData.passcode) {
    return ContentService.createTextOutput(
      JSON.stringify({
        message: "Used card is not registered.",
        statusCode: 401,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // 使用するメールテンプレートを選択
  const allTemplates = getMailTemplate(SPREAD_SHEET_ID);
  const mailTemplate = setDefaultTemplate(allTemplates);

  // 遅刻の場合のテンプレート設定処理（WIP）
  // if (userData.lateFlag) {
  //   mailTemplate = setLateTemplate(allTemplates);
  // }

  if (!mailTemplate) {
    return ContentService.createTextOutput(
      JSON.stringify({
        message: "Sorry. We can't find a E-mail template from registered list.",
        statusCode: 404,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // プレースホルダーの置き換え
  const mailPayload = Object.assign(mailTemplate, { title: "", content: "" });
  mailPayload.title = replacePlaceholderOfText(
    mailTemplate.rawTitle,
    searchResult.name
  );
  mailPayload.content = replacePlaceholderOfText(
    mailTemplate.rawContent,
    searchResult.name
  );

  // メールを送信
  const toAddresses = mailTemplate.sendTargetMailAddress.join(",");
  if (toAddresses === "") {
    return ContentService.createTextOutput(
      JSON.stringify({
        message: "We can't find of send target",
        statusCode: 404,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  MailApp.sendEmail({
    to: toAddresses,
    subject: mailPayload.title,
    body: mailPayload.content,
  });

  // 送信ログに記録
  const sendLogData = {
    cardId: userData.cardId,
    templateId: mailTemplate.timingId,
    timestamp: "Not set",
  };

  appendSendLog(sendLogData, SPREAD_SHEET_ID);

  // 送信完了情報を返却
  return ContentService.createTextOutput(
    JSON.stringify({ message: "Success, Send E-mail.", statusCode: 200 })
  ).setMimeType(ContentService.MimeType.JSON);
}

type Payload = {
  items: string;
};
