import { sortSheet, fieldsBuilder } from "./index"
import { getClassroomAssignments } from "./assignmentGetter"

export function wakeGlitch(): void {
    const glitch_url: string | null = PropertiesService.getDocumentProperties().getProperty("glitch_url");
    const data = {};
    const headers = { 'Content-Type': 'application/json; charset=UTF-8' };
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "post",
        "payload": JSON.stringify(data),
        "headers": headers,
    }
    const response = UrlFetchApp.fetch(glitch_url!, params);
    console.log(response);
}

// Discord.js が動くサーバサイドで通知を実装するのがクソ面倒だったため，定時実行でよしなにしてくれる GAS で叩く
// Fieldsbuilder を絶対に使えるような構造をしているが now を与えるのがだるい
export function remindTasks(): void {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

    sortSheet(sheet!);

    const now = new Date();

    let fields: Field[] = fieldsBuilder(sheet!, now);

    const webhook_url = PropertiesService.getDocumentProperties().getProperty("webhook");

    const now_month: number = now.getMonth() + 1;
    const now_day: number = now.getDate();

    const message = {
        "embeds": [
            {
                "title": `${now_month}/${now_day} 提出の課題`,
                "fields": fields
            }
        ]
    };

    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "post",
        "headers": { 'Content-type': "application/json" },
        "payload": JSON.stringify(message)
    };

    if (fields.length > 0) UrlFetchApp.fetch(webhook_url!, param);
}

export async function addTaskFromClassroom() {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    sortSheet(sheet!);
    let fields: Field[] = fieldsBuilder(sheet!, undefined, getClassroomAssignments());

}
