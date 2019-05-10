type RequestFunctionArgument = any | undefined;
type RequestFunction<T extends RequestFunctionArgument, R> = (args?: T) => Promise<R>;

export abstract class CachedService {
  private static readonly CACHE_TIME = 1000 * 60 * 5; // 5 minutes

  public static cachedRequest<T, R>(request: RequestFunction<T, R>): RequestFunction<T, R> {
    let cache: R;
    let cacheExpireDate: number;

    return (args?: T) => {
      const now = Date.now();

      if (cache && now < cacheExpireDate) {
        return Promise.resolve(cache);
      } else {
        return request(args).then((result: R) => {
          cache = result;
          cacheExpireDate = now + CachedService.CACHE_TIME;
          return cache;
        });
      }
    };
  }
}
