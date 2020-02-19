import WP_Spreadsheet from '../interface/WP_Spreadsheet';
class WordPressAPI {
  private baseURL;
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  
  callAPI (resource, pageNumber = 1) {
    var url = pageNumber !== undefined && pageNumber > 1
    ? `${this.baseURL}/wp-json/wp/v2/${resource.resourceURL}?page=${pageNumber}`
    : `${this.baseURL}/wp-json/wp/v2/${resource.resourceURL}`;

    Logger.log(`Calling API for ${resource.resourceURL}, page ${pageNumber} : ${url}`)
    var response = UrlFetchApp.fetch(url);
    var resources = JSON.parse(response.getContentText());
    var mappedResources = this.mapAPIResponseToResource(resources, resource.mappingCallback);
    return mappedResources;
  }
  getTotalPagesForResourceType (resourceURL) {
    var response = UrlFetchApp.fetch(`${this.baseURL}/wp-json/wp/v2/${resourceURL}`);
    var totalPages = response.getHeaders()['x-wp-totalpages'];
    return totalPages;
  }
  mapAPIResponseToResource (responses, resourceParseCallback) {
    return responses.map(resourceParseCallback)
  }
  
  getAllResources (resource) {
    var currentPage = 1;
    var totalPages = this.getTotalPagesForResourceType(resource.resourceURL);
    
    while (currentPage <= totalPages) {
      Logger.log('In here');
     var pagesToWrite = this.callAPI(resource, currentPage);
     WP_Spreadsheet.appendSpreadsheetRow(resource.sheetName, pagesToWrite)
     currentPage++ 
    }
  
  }
}