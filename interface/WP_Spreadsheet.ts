export default class WP_Spreadsheet {
  private static interfaceSheets: string[] = [
    'Dashboard',
    'Posts',
    'Pages',
    'Categories',
    'Tags',
    'Media'
  ]

  static bootstrapAllSheets () {
    this.interfaceSheets.forEach((sheet, index) => {
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheet, index)
    })
  }

  static appendSpreadsheetRow (sheetName, resources) {
    resources.forEach(resource => {
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).appendRow(resource);
    })
  }
}