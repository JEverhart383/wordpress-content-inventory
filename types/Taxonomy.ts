export default class Taxonomy {
  public id: number;
  public name: string;
  public count: number;
  public link: string;
  public slug: string;
  public description: string;

  constructor(TagAPIResponse) {
    this.id = TagAPIResponse.id;
    this.count = TagAPIResponse.count;
    this.description = TagAPIResponse.description;
    this.link = TagAPIResponse.link;
    this.name = TagAPIResponse.name;
    this.slug = TagAPIResponse.slug;
  }
  get formatted() {
    return [this.id, this.name, this.count, this.link, this.slug, this.description]
  }
}