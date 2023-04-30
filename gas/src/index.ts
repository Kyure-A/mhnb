function wakeGlitch(): void {
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
function doGet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

// スプレッドシートに内容を追記するまたは内容を削除する
function doPost(e) {

}
