import formatDistance from "date-fns/formatDistance"
import getYear from "date-fns/getYear"
import compareAsc from "date-fns/compareAsc"
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

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

type Field = {
    name: string,
    value: string,
    inline: boolean
}

export function pushToMap(map: Map<any, any[]>, key: any, value: any) {
    if (map.has(key) && map !== undefined) map.get(key)!.push(value);
    else map.set(key, value);
}

export async function taskBuilder(value: any[][]) {
    let date_set = new Set<number>();
    let task_map = new Map<number, Field[]>();
    const now: Date = new Date();

    for (let i = 0; i < value.length; i++) {
        const homework_name: string = value[i][0];
        const subject_name: string = value[i][1];
        const month: number = value[i][2];
        const day: number = value[i][3];
        const description: string = value[i][4];

        const task: Field = {
            "name": `${subject_name}: ${homework_name} (${month}/${day})`,
            "value": description,
            "inline": false
        }

        let adder: 0 | 1 = 0;
        if (now.getMonth() > month) adder = 1;

        const task_date: number = parseInt(format(new Date(getYear(now) + adder, month, day), "yyMMdd"));
        date_set.add(task_date);
        pushToMap(task_map, task_date, task);
    }

    let date_array: number[] = Array.from(date_set).sort();

    let fields: Field[] = [];

    let counter: number = 1;
    for (let i = 0; i < date_array.length; i++) {
        const task_array: Field[] | undefined = task_map.get(date_array[i]);

        if (task_array !== undefined) {

            for (let j = 0; j < task_array.length; j++) {
                let task = task_array[j];
                task.name = "[${counter}] " + task.name;
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
    const month: number = await params.month;
    const day: number = await params.day;
    const description: string = await params.description;
    sheet.appendRow([homework, subject, month, day, description]);
}

export function doDelete(sheet: GoogleAppsScript.Spreadsheet.Sheet) {

}

// "/list"
export async function doGet() {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const value: any[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getValues();

    const fields = await taskBuilder(value);

    return ContentService.createTextOutput(JSON.stringify(fields)).setMimeType(ContentService.MimeType.JSON);
}

// "/create", "/delete"
export async function doPost(e: any) {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params = await JSON.parse(e.postData.getDataAsString());
    const post_type: string = params.command;

    if (post_type == "create") {
        doCreate(sheet!, params);
    }


    if (post_type == "delete") {

    }

    return ContentService.createTextOutput("");
}

