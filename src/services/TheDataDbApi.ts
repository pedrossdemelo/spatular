import Api from "./Api";

export interface QueryOptions {
  limit?: number;
}

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
    this.getNationalities = this.getNationalities.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getAlcoholicLabels = this.getAlcoholicLabels.bind(this);
  }

  async getBy(
    type: string,
    method: string,
    query: string,
    { limit }: QueryOptions = {},
  ) {
    const { url, key } = this;

    const formatQuery = `${url}${method}.php?${type[0]}=${query}`;

    const { data, error } = await Api.fetchJson(formatQuery);

    const keyData = data?.[key] ?? [];

    if (limit) keyData.splice(limit);

    return { data: keyData, error };
  }

  getCategories(options: QueryOptions) {
    return this.getBy("categories", "list", "list", options);
  }

  getNationalities(options: QueryOptions) {
    if (this.key === "meals") {
      return this.getBy("anationalities", "list", "list", options);
    }

    return undefined;
  }

  getAlcoholicLabels(options: QueryOptions) {
    if (this.key === "drinks") {
      return this.getBy("alcoholic", "list", "list", options);
    }
    throw new Error("Meals API does not support alcoholic labels");
  }

  getIngredients(options: QueryOptions) {
    return this.getBy("ingredients", "list", "list", options);
  }

  getByCategory(category: string, options: QueryOptions) {
    return this.getBy("category", "filter", category, options);
  }

  getByNationality(nationality: string, options: QueryOptions) {
    return this.getBy("anationality", "filter", nationality, options);
  }

  getByIngredient(ingredient: string, options: QueryOptions) {
    return this.getBy("ingredient", "filter", ingredient, options);
  }

  getBySearch(search: string, options: QueryOptions) {
    return this.getBy("search", "search", search, options);
  }

  getByFirstLetter(letter: string, options: QueryOptions) {
    return this.getBy("firstLetter", "filter", letter, options);
  }

  getById(id: string) {
    return this.getBy("id", "lookup", id);
  }

  async getRandom() {
    const { url, key } = this;
    const { data, error } = await Api.fetchJson(`${url}random.php`);
    const keyData = data?.[key] ?? [];

    return { data: keyData, error };
  }
}
