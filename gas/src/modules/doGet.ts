import { parse } from "date-fns"
import { doList } from "./index"

export function doGetEdit(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any): GoogleAppsScript.Content.TextOutput {
    // 0 indexed
    const i: number = parseInt(params.task_number) - 1;
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

    PropertiesService.getDocumentProperties().setProperty("task_number", params.task_number);

    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
}

// "/list", "/edit"
export function doGet(e: any): GoogleAppsScript.Content.TextOutput {
    const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const params = e.parameter;
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
