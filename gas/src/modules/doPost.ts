import { doCreate, doDelete } from "./index"

export async function doPostEdit(sheet: GoogleAppsScript.Spreadsheet.Sheet, params: any) {
    const task_str: string | null = PropertiesService.getDocumentProperties().getProperty("task_number");
    PropertiesService.getDocumentProperties().setProperty("task_number", "-1");
    const homework: string = await params.homework;
    const subject: string = await params.subject;
    const month_str: string = await params.month;
    const day_str: string = await params.day;
    const description: string = await params.description;

    const task_number: number = parseInt(task_str!);
    const month = parseInt(month_str);
    const day = parseInt(day_str);

    const now: Date = new Date();

    let adder: 0 | 1 = 0;
    if (now.getMonth() > month) adder = 1;

    const date: Date = new Date(now.getFullYear() + adder, month - 1, day);

    // 1 indexed
    sheet.getRange(task_number, 1).setValue(homework);
    sheet.getRange(task_number, 2).setValue(subject);
    sheet.getRange(task_number, 3).setValue(date);
    sheet.getRange(task_number, 4).setValue(description);
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
