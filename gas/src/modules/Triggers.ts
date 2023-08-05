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

    const params = getClassroomAssignments();

    const homework: string = params.homework;
    const subject: string = params.subject;
    const month_str: string = params.month;
    const day_str: string = params.day;
    const description: string = params.description;

    const month: number = parseInt(month_str);
    const day: number = parseInt(day_str);

    const now: Date = new Date();

    // 年の変更への対応
    let adder: 0 | 1 = 0;
    if (now.getMonth() > month) adder = 1;

    const date: Date = new Date(now.getFullYear() + adder, month - 1, day);

    sheet!.appendRow([homework, subject, date, description]);

    sortSheet(sheet!);
}
