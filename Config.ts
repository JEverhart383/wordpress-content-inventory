import Taxonomy from './types/Taxonomy'
export default class Config {
  static resources: object = {
    'pages': {
      resourceURL: 'pages',
      sheetName: 'Pages',
      mappingCallback: (resource) => {
        var page = {
          id: resource.id,
          title: resource.title.rendered,
          datePublished: resource.date,
          slug: resource.slug,
          wordpressLink: resource.link,
          seoKeywords: '',
          googleDocsLink: '',
          googleDocCreated: 0,
          googleFileType: ''
        }
        
        var pageArray = []
        for (var key in page) {
          pageArray.push(page[key]);
        }
        return pageArray;
      }
    },
    'posts': {
      resourceURL: 'posts',
      sheetName: 'Posts',
      mappingCallback: (resource) => {
        var post = {
          id: resource.id,
          title: resource.title.rendered,
          datePublished: resource.date,
          slug: resource.slug,
          wordpressLink: resource.link,
          seoKeywords: '',
          googleDocsLink: '',
          googleDocCreated: 0,
          googleFileType: ''
        }
        
        var postArray = []
        for (var key in post) {
          postArray.push(post[key]);
        }
        return postArray;
      }

    },
    'categories': {
      resourceURL: 'categories',
      sheetName: 'Categories',
      mappingCallback: (resource) => {
        return new Taxonomy(resource).formatted
      }
    },
    'tags': {
      resourceURL: 'tags',
      sheetName: 'Tags',
      mappingCallback: (resource) => {
        return new Taxonomy(resource).formatted
      }
    },
    'media': {
      resourceURL: 'media',
      sheetName: 'Media'
    },
    'dashboard': {
      sheetName: 'Dashboard'
    },
    'config': {
      sheetName: 'Config'
    }
  }
}