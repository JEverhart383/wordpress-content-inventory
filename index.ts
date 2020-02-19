import Config from './Config'

function importWordPressPages() {
  var wordpressImporter = new WordPressImporter();
  wordpressImporter.getAllPages();
}

function createGoogleDriveFilesFromContent () {
  var fileCreator = new FileCreator();
  fileCreator.processFiles();

}

function indexFilesWithSpreadsheet () {
  var fileIndexer = new FileIndexer();
  fileIndexer.indexFiles();

}

function onOpen () {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu('WordPress Content Import')
  .addItem('Create Sheets', 'WP_Spreadsheet.bootstrapAllSheets')
  .addItem('Get All Pages', 'getPages')
  .addItem('Get All Posts', 'getPosts')
  .addItem('Get All Tags', 'getTags')
  .addItem('Get All Categories', 'getCategories')
  .addToUi();
}

function getPages() {
  const wpAPI = new WordPressAPI('https://jeffreyeverhart.com');
  wpAPI.getAllResources(Config.resources['pages'])
}

function getPosts() {
  const wpAPI = new WordPressAPI('https://jeffreyeverhart.com');
  wpAPI.getAllResources(Config.resources['posts'])
}

function getCategories() {
  const wpAPI = new WordPressAPI('https://jeffreyeverhart.com');
  wpAPI.getAllResources(Config.resources['categories'])
}

function getTags() {
  const wpAPI = new WordPressAPI('https://jeffreyeverhart.com');
  wpAPI.getAllResources(Config.resources['tags'])
}

function getMedia() {
  const wpAPI = new WordPressAPI('https://jeffreyeverhart.com');
  wpAPI.getAllResources(Config.resources['media'])
}

