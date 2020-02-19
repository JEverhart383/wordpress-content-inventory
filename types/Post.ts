export default class Post {
  public id: number;
  public title: string;
  public published: string;
  public link: string;
  public slug: string;
  public categories: number[];
  public featured_media: number;
  public author: number
  public content: string;

  constructor(PostAPIResponse) {
    this.id = PostAPIResponse.id;
    this.title = PostAPIResponse.title;
    this.published = PostAPIResponse.published;
    this.link = PostAPIResponse.link;
    this.slug = PostAPIResponse.slug;
    this.categories = PostAPIResponse.categories;
    this.featured_media = PostAPIResponse.featured_media;
    this.author = PostAPIResponse.author;
    this.content = PostAPIResponse.content.rendered;

  }
  //The formatted getter allows us to determine the order of the array
  get formatted() {
    return [this.id, this.title, this.published, this.link, this.slug, this.featured_media, this.author, this.content]
  }
}