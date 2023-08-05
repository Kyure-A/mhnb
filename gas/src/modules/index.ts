import { parse } from "date-fns"

export function sortSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
    const range = sheet.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn());
    range.sort({ column: 3, ascending: true });
    range.removeDuplicates();
}

export function fieldsBuilder(sheet: GoogleAppsScript.Spreadsheet.Sheet, now?: Date, value: string[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getDisplayValues()): Field[] {
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

        if (date == now) fields.push(field);
    }

    return fields;
}

export async function doCreate(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): Promise<void> {
    const homework: string = await params.homework;
    const subject: string = await params.subject;
    const month_str: string = await params.month;
    const day_str: string = await params.day;
    const description: string = await params.description;

    const month: number = parseInt(month_str);
    const day: number = parseInt(day_str);

    const now: Date = new Date();

    // 年の変更への対応
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
