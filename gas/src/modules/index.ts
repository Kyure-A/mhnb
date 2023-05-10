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

// スプレッドシートの内容を JSON で返す
export function doGet(e: any) {
    const params = JSON.parse(e.postData.getDataAsString());
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const value: string[][] = sheet!.getRange(1, 1, sheet!.getLastRow(), sheet!.getLastColumn()).getValues();

    const fields = [];

    for (let i = 0; i < value.length; i++) {
        const homework_name: string = value[i][0];
        const subject_name: string = value[i][1];
        const deadline: string = value[i][2]; // due date
        const description: string = value[i][3];

        const json = {
            "name": `${subject_name}: ${homework_name} (${deadline})`,
            "value": description,
            "inline": false
        }

        fields.push(json);
    }
}

// スプレッドシートに内容を追記するまたは内容を削除する
export function doPost(e: any) {
    const params = JSON.parse(e.postData.getDataAsString());
    const post_type = params.command;

    if (post_type == "create") {
        const homework: string = params.homework;
        const subject: string = params.subject;
        const month: number = params.month;
        const day: number = params.day;
    }

    if (post_type == "delete") {

    }
}
