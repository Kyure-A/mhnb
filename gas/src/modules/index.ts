import { parse } from "date-fns"

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

export function sortSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
    const range = sheet.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn());
    range.sort({ column: 3, ascending: true });
    range.removeDuplicates();
}

export function taskBuilder(value: any[][]): Field[] {
    let fields: Field[] = [];

    for (let i = 0; i < value.length; i++) {
        const homework_name: string = value[i][0];
        const subject_name: string = value[i][1];
        const date_str: string = value[i][2];
        const description: string = value[i][3];

        const date: Date = parse(date_str, "yyyy/MM/dd", new Date());

        const month: number = date.getMonth() + 1;
        const day: number = date.getDate();

        const counter: number = i + 1;

        const field: Field = {
            "name": `[${counter}] ${subject_name}: ${homework_name} (${month}/${day})`,
            "value": description,
            "inline": false
        }

        fields.push(field);
    }

    return fields;
}

export async function doCreate(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): Promise<void> {
    const homework: string = await params.homework;
    const subject: string = await params.subject;
    const month_str: string = await params.month;
    const day_str: string = await params.day;
    const description: string = await params.description;

    const month = parseInt(month_str);
    const day = parseInt(day_str);

    const now: Date = new Date();

    let adder: 0 | 1 = 0;
    if (now.getMonth() > month) adder = 1;

    const date: Date = new Date(now.getFullYear() + adder, month - 1, day);

    sheet.appendRow([homework, subject, date, description]);

    sortSheet(sheet);
}

export function doDelete(sheet: GoogleAppsScript.Spreadsheet.Sheet) {

}

// "/list"
export function doGet(): GoogleAppsScript.Content.TextOutput {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const value: string[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getDisplayValues();

    const fields: Field[] = taskBuilder(value);

    return ContentService.createTextOutput(JSON.stringify(fields)).setMimeType(ContentService.MimeType.JSON);
}

// "/create", "/delete"
export async function doPost(e: any): GoogleAppsScript.Content.TextOutput {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params: JsonCreate = await JSON.parse(e.postData.getDataAsString());
    const post_type: string = params.command;

    if (post_type == "create") {
        await doCreate(sheet!, params);
    }


    if (post_type == "delete") {

    }

    const output = `/${post_type} による POST が受け取られました！`

    return ContentService.createTextOutput(output);
}
