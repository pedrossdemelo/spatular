import TheDataDbApi from "./TheDataDbApi";

export class FoodApi extends TheDataDbApi {
  constructor(url: string) {
    super(url, "meals");
  }

  getNationalities() {
    return this.getBy("anationalities", "list", "list");
  }
}

const foodApi = new FoodApi("https://www.themealdb.com/api/json/v1/1/");

export default foodApi;
