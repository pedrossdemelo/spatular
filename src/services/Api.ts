export default class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  static async fetchJson(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return { data };
    } catch (error) {
      return { error };
    }
  }
}
