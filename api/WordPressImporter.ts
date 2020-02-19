function WordPressImporter () {

  function getTotalPages() {
    var response = UrlFetchApp.fetch('http://motonmuseum.org/wp-json/wp/v2/pages');
    var totalPages = response.getHeaders()['x-wp-totalpages'];
    return totalPages;
  }

function writePagesToSheets(pagesToWrite) {
  pagesToWrite.forEach(function(page) {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pages').appendRow(page);
  })
}

this.getAllPages = function() {
  var currentPage = 1;
  var totalPages = getTotalPages();
  
  while (currentPage <= totalPages) {
    Logger.log('In here');
   var pagesToWrite = callPagesAPI(currentPage);
   writePagesToSheets(pagesToWrite);
   currentPage++ 
  }

}

function callPagesAPI(page) {
  var url = page !== undefined && page > 1
  ? 'http://motonmuseum.org/wp-json/wp/v2/pages?page=' + page 
  : 'http://motonmuseum.org/wp-json/wp/v2/pages';

  var response = UrlFetchApp.fetch(url);
  var pages = JSON.parse(response.getContentText());
  var pagesToAdd = mapAPIResponseToPage(pages);
  return pagesToAdd;
}

function mapAPIResponseToPage (responses) {

  return responses.map(function(response){
    var page = {
      id: response.id,
      title: response.title.rendered,
      datePublished: response.date,
      slug: response.slug,
      wordpressLink: response.link,
      seoKeywords: '',
      googleDocsLink: '',
      content: response.content.rendered,
      googleDocCreated: 0,
      googleFileType: ''
    }
    
    var pageArray = []
    for (var key in page) {
      pageArray.push(page[key]);
    }
    return pageArray;
  })

}

}
