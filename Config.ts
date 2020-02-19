import Taxonomy from './types/Taxonomy'
import Post from './types/Post'
export default class Config {
  static resources: object = {
    'pages': {
      resourceURL: 'pages',
      sheetName: 'Pages',
      mappingCallback: (resource) => {
        return new Post(resource).formatted
      }
    },
    'posts': {
      resourceURL: 'posts',
      sheetName: 'Posts',
      mappingCallback: (resource) => {
        return new Post(resource).formatted
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