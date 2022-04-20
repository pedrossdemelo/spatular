import Api from "./Api";

export default class TheDataDbApi extends Api {
  key: string;

  constructor(key: string, url: string) {
    super(url);
    this.key = key;
    this.getBy = this.getBy.bind(this);
    this.getByCategory = this.getByCategory.bind(this);
    this.getByNationality = this.getByNationality.bind(this);
    this.getByIngredient = this.getByIngredient.bind(this);
    this.getBySearch = this.getBySearch.bind(this);
    this.getByFirstLetter = this.getByFirstLetter.bind(this);
    this.getById = this.getById.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  async getBy(type: string, method: string, query: string) {
    const { url, key } = this;

    const fetchURL = `${url}${method}.php?${type[0]}=${query}`;

    return { fetchURL, key };
  }

  getCategories() {
    return this.getBy("categories", "list", "list");
  }

  getIngredients() {
    return this.getBy("ingredients", "list", "list");
  }

  getByCategory(category: string) {
    return this.getBy("category", "filter", category);
  }

  getByNationality(nationality: string) {
    return this.getBy("anationality", "filter", nationality);
  }

  getByIngredient(ingredient: string) {
    return this.getBy("ingredient", "filter", ingredient);
  }

  getBySearch(search: string) {
    return this.getBy("search", "search", search);
  }

  getByFirstLetter(letter: string) {
    return this.getBy("firstLetter", "filter", letter);
  }

  getById(id: string) {
    return this.getBy("id", "lookup", id);
  }

  async getRandom() {
    const { url, key } = this;

    return { fetchUrl: `${url}random.php`, key };
  }
}
