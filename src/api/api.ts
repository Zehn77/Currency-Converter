const BASE_URL = "https://open.er-api.com/v6/latest";

export class API {
  static async fetch(code: string) {
    const url = `${BASE_URL}/${code}`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch currency data");

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("API error:", error);

      return null;
    }
  }
}
