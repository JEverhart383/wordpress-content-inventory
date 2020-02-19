function FileIndexer () {

  this.sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pages').getDataRange().getValues();
  this.pagesFolder = DriveApp.getFolderById('1wcj8xErxadVs24hfxps7QAg76jEmAONi');
  this.allFiles = function () {
    var files = this.sheetData.map(function(item) {return item;});
    files.shift();
    return files;
  }
  
  this.allHTMLFiles = function () {
    var files = this.sheetData.map(function(item) {return item;});
    files.filter(function(file){return file[9] === 'HTML'});
    return files;
  }
  
  this.returnFileIndexById = function (id) {
    var fileIndex = null;
    this.sheetData.forEach(function(item, index) {
      if (item[0] === id) {
        fileIndex = index
      }
    })
    return fileIndex;
  }
  
  this.getFilesByName = function (title) {
    var files = this.pagesFolder.getFilesByName(title);
    var fileHolder = [];
    while (files.hasNext()) {
      var file = files.next();
      Logger.log(file.getName() + ' ' +file.getMimeType())
      fileHolder.push(file);
    }
    return fileHolder; 
  }
  
  this.deleteFile = function(file) {
    Logger.log('Deleting this file '  + file.getName() + ' ' + file.getMimeType());
    this.pagesFolder.removeFile(file);
    DriveApp.removeFile(file);
  }
  
  this.writeUpdatesToSheet = function (index, fileUrl) {
    var values = [[fileUrl, '', new Date(), 'Google Doc' ]];
    var row = index + 1;
    var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pages').getRange(row, 7, 1, 4);
    range.setValues(values);
  }
  
  
  this.indexFiles = function () {
    var self = this;
    var htmlFiles = this.allHTMLFiles();
    htmlFiles.forEach(function(file) {
      var index = self.returnFileIndexById(file[0]);
      var driveFiles = self.getFilesByName(file[1]);
      if (driveFiles.length > 1) {
        var htmlFile = driveFiles.filter(function(file){
          return file.getMimeType() === 'text/html'
        })[0]
        if (htmlFile) {
          self.deleteFile(htmlFile)
        }
        var googleDocFile = driveFiles.filter(function(file){
          return file.getMimeType() === 'application/vnd.google-apps.document'
        })[0]
        
        if (googleDocFile) {
          self.writeUpdatesToSheet(index, googleDocFile.getUrl())
        }
        SpreadsheetApp.getActiveSpreadsheet().toast('Successfully re-indexed ' + googleDocFile.getName(), 'Status', 1);
      }
    })
  }
  
  


}
