import formatDistance from "date-fns/formatDistance"
import getYear from "date-fns/getYear"
import min from "date-fns/min"

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

export function sortTask(date_list: Set<Date>, tasks: Map<Date, Field[]>) {
    const date_list_array: Date[] = Array.from(date_list);
}

export function taskBuilder(value: any[][]) {
    const date_list = new Set<Date>();
    const tasks = new Map<Date, Field[]>();
    const now: Date = new Date();

    for (let i = 0; i < value.length; i++) {
        const homework_name: string = value[i][0];
        const subject_name: string = value[i][1];
        const month: number = value[i][2];
        const day: number = value[i][3];
        const description: string = value[i][4];

        const task: Field = {
            "name": `${subject_name}: ${homework_name} `,
            "value": description,
            "inline": false
        }

        let adder = 0;
        if (now.getMonth() > month) adder = 1;

        const task_date: Date = new Date(getYear(now) + adder, month, day);
        date_list.add(task_date);
        // push "task" to map with Key ("task_date")
    }
}

export function doCreate(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): void {
    const homework: string = params.homework;
    const subject: string = params.subject;
    const month: number = params.month;
    const day: number = params.day;
    sheet.appendRow([homework, subject, month, day]);
}

export function doDelete(sheet: GoogleAppsScript.Spreadsheet.Sheet) {

}

// "/list"
export function doGet(e: any) {
    const params = JSON.parse(e.postData.getDataAsString());
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const value: any[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getValues();

    const fields = [];
}

// "/create", "/delete"
export function doPost(e: any) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params = JSON.parse(e.postData.getDataAsString());
    const post_type = params.command;

    if (post_type == "create") {
        doCreate(sheet!, params);
        return ContentService.createTextOutput("created");
    }


    if (post_type == "delete") {

    }
}

