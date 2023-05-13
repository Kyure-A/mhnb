import { format } from "date-fns"
import getYear from "date-fns/getYear"
import ja from "date-fns/locale/ja"

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

export function taskBuilder(value: any[][]): Field[] {
    let date_set: Set<number> = new Set<number>();
    let task_map: Map<number, Field[]> = new Map<number, Field[]>();
    const now: Date = new Date();

    for (let i = 0; i < value.length; i++) {
        const homework_name: string = value[i][0];
        const subject_name: string = value[i][1];
        const month_str: string = value[i][2];
        const day_str: string = value[i][3];
        const description: string = value[i][4];

        const month: number = parseInt(month_str);
        const day: number = parseInt(day_str);

        const task: Field = {
            "name": `${subject_name}: ${homework_name} (${month}/${day})`,
            "value": description,
            "inline": false
        }

        let adder: 0 | 1 = 0;
        if (now.getMonth() > month) adder = 1; // その年度の課題しか想定していないので，1 年またぐ課題とかは無理

        const task_date: number = parseInt(format(new Date(getYear(now) + adder, month, day), "yyMMdd", { locale: ja }));
        date_set.add(task_date);

        if (task_map.has(task_date) && task_map !== undefined) task_map.get(task_date)!.push(task);
        else {
            task_map.set(task_date, []);
            task_map.get(task_date)!.push(task);
        }
    }

    let date_array: number[] = Array.from(date_set).sort();

    let fields: Field[] = [];

    let counter: number = 1;
    for (let i = 0; i < date_array.length; i++) {
        const task_array: Field[] | undefined = task_map.get(date_array[i]);

        if (task_array !== undefined) {

            for (let j = 0; j < task_array.length; j++) {
                let task = task_array[j];
                task.name = `[${counter}] ` + task.name;
                fields.push(task);
                counter++;
            }
        }
    }

    return fields;
}

export async function doCreate(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): Promise<void> {
    const homework: string = await params.homework;
    const subject: string = await params.subject;
    const month: string = await params.month;
    const day: string = await params.day;
    const description: string = await params.description;

    sheet.appendRow([homework, subject, month, day, description]);
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
export async function doPost(e: any) {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params: JsonCreate = await JSON.parse(e.postData.getDataAsString());
    const post_type: string = params.command;

    if (post_type == "create") {
        await doCreate(sheet!, params);
    }


    if (post_type == "delete") {

    }

    return ContentService.createTextOutput("");
}
