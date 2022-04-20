import { parseRecipe } from "utils";
import useFetch from "./useFetch";

function useDataDbApi(
  urlWithKey: UrlWithKey,
): [Recipe[], boolean, string | null];

function useDataDbApi<P extends MaybeParser>(
  urlWithKey: UrlWithKey,
  options: Options<P>,
): [InferDataType<P>, boolean, string | null];

function useDataDbApi<P extends MaybeParser>(
  urlWithKey: UrlWithKey,
  options?: Options<P>,
): unknown {
  const { key, url } = urlWithKey;

  const { parser, limit } = options || {};

  const [rawData, loading, error] = useFetch(url);

  let data = (rawData as any)?.[key] || [];
  if (limit) data = data.slice(0, limit);

  switch (typeof parser) {
    case "function": {
      return [data.map(parser), loading, error];
    }
    case "undefined": {
      return [data.map(parseRecipe), loading, error];
    }
    default: {
      return [data, loading, error];
    }
  }
}

export default useDataDbApi;

interface UrlWithKey {
  key: "meals" | "drinks";
  url: string;
}

type MaybeParser = ((...args: any[]) => any) | null | unknown | undefined;

interface Options<P extends MaybeParser> {
  parser?: P;
  limit?: number;
}

type Recipe = ReturnType<typeof parseRecipe>;

type InferDataType<P extends MaybeParser> = unknown extends P
  ? Recipe[]
  : P extends undefined
  ? Recipe[]
  : P extends null
  ? unknown[]
  : P extends (...args: any[]) => infer U
  ? U[]
  : never;
