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

export function fieldsBuilder(sheet: GoogleAppsScript.Spreadsheet.Sheet): Field[] {
    const value: string[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getDisplayValues();

    sortSheet(sheet);

    let fields: Field[] = [];

    for (let i = 0; i < value.length; i++) {

        if (value[i][0] == "") continue;

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

export function doList(sheet: GoogleAppsScript.Spreadsheet.Sheet): GoogleAppsScript.Content.TextOutput {
    const fields: Field[] = fieldsBuilder(sheet!);
    return ContentService.createTextOutput(JSON.stringify(fields)).setMimeType(ContentService.MimeType.JSON);
}

export async function doDelete(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any) {
    const task_number: number = await params.task_number;

    sheet.deleteRow(task_number);

    sortSheet(sheet);
}

export function doGetEdit(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): GoogleAppsScript.Content.TextOutput {
    const i: number = params.task_number;
    const value: string[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getDisplayValues();
    const homework_name: string = value[i][0];
    const subject_name: string = value[i][1];
    const date_str: string = value[i][2];
    const description: string = value[i][3];

    const date: Date = parse(date_str, "yyyy/MM/dd", new Date());

    const month: string = String(date.getMonth() + 1);
    const day: string = String(date.getDate());

    const json = {
        "homework": homework_name,
        "subject": subject_name,
        "month": month,
        "day": day,
        "description": description
    }

    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
}

export async function doPostEdit(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any) {
    const task_str: string = await params.task_number;
    const homework: string = await params.homework;
    const subject: string = await params.subject;
    const month_str: string = await params.month;
    const day_str: string = await params.day;
    const description: string = await params.description;

    const task_number: number = parseInt(task_str);
    const month = parseInt(month_str);
    const day = parseInt(day_str);

    const now: Date = new Date();

    let adder: 0 | 1 = 0;
    if (now.getMonth() > month) adder = 1;

    const date: Date = new Date(now.getFullYear() + adder, month - 1, day);

    sheet.getRange(task_number, 1).setValue(homework);
    sheet.getRange(task_number, 2).setValue(subject);
    sheet.getRange(task_number, 3).setValue(date);
    sheet.getRange(task_number, 4).setValue(description);
}

// "/list", "/edit"
export function doGet(e: any): GoogleAppsScript.Content.TextOutput {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params = JSON.parse(e.postData.getDataAsString());
    const get_type: string = params.command;

    if (get_type == "edit") {
        const output: GoogleAppsScript.Content.TextOutput = doGetEdit(sheet!, params);
        return output;
    }

    else { // get_type == "list"
        const output: GoogleAppsScript.Content.TextOutput = doList(sheet!);
        return output;
    }
}

// "/create", "/delete"
export async function doPost(e: any): Promise<GoogleAppsScript.Content.TextOutput> {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params = await JSON.parse(e.postData.getDataAsString());
    const post_type: string = params.command;

    if (post_type == "create") {
        await doCreate(sheet!, params);
    }


    if (post_type == "delete") {
        await doDelete(sheet!, params);
    }

    if (post_type == "edit") {
        await doPostEdit(sheet!, params);
    }

    const output = `/${post_type} による POST が受け取られました！`

    return ContentService.createTextOutput(output);
}
