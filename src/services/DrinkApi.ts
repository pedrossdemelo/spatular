import TheDataDbApi from "./TheDataDbApi";

export class DrinkApi extends TheDataDbApi {
  constructor(url: string) {
    super(url, "drinks");
  }

  getAlcoholicLabels() {
    return this.getBy("alcoholic", "list", "list");
  }
}

const drinkApi = new DrinkApi("https://www.thecocktaildb.com/api/json/v1/1/");

export default drinkApi;
