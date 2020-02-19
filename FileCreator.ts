function FileCreator() {

  this.sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pages').getDataRange().getValues();
  this.pagesFolder = DriveApp.getFolderById('1wcj8xErxadVs24hfxps7QAg76jEmAONi');
  this.allFiles = function () {
    var files = this.sheetData.map(function(item) {return item;});
    files.shift();
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
  this.filesToBeProcessed = function () {
    return this.allFiles().filter(function(file){
      return file[8] === 0
    })
  }
  this.processFiles = function ( ) {
    var filesToBeProcessed = this.filesToBeProcessed();
    
    if (filesToBeProcessed.length > 0) {
      var filesProcessed = 0;
      while (filesProcessed < 5) {
        var file = filesToBeProcessed[filesProcessed];
        if (file) {
          var index = this.returnFileIndexById(file[0])
          var fileUrl = this.createHTMLFile(file);
          this.writeUpdatesToSheet(index, fileUrl);
        }
        filesProcessed++;
       }
    
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast('No more files left to process', 'Status', 3);
      return;
    }
    //If filesToBeProcessed length > 0
    // check to see if trigger is set, if not set trigger
    // else process next files
    SpreadsheetApp.getActiveSpreadsheet().toast('5 files created successfully', 'Status', 3);
    return;
  }
  
  this.createHTMLFile = function (post) {
    var content = post[7];
    var title = title !== '' ? post[1] : post[3];
    var htmlBlob = Utilities.newBlob(content, "text/html", title + ".html");
    var driveFileUrl = this.pagesFolder.createFile(htmlBlob).setName(title).getUrl();
    return driveFileUrl
  }
  
  this.writeUpdatesToSheet = function (index, fileUrl) {
    var values = [[fileUrl, '', new Date(), 'HTML' ]];
    var row = index + 1;
    var range = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pages').getRange(row, 7, 1, 4);
    range.setValues(values);
  }


}
