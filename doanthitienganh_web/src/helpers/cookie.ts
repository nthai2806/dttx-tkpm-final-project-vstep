import { parseCookies, setCookie, destroyCookie } from "nookies";

export default class CookieHelper {
  static getCookie(key: string): string {
    const cookies = parseCookies();
    return cookies[key] || "";
  }

  static setCookie(
    key: string,
    val: string,
    opts: {
      maxAge?: number;
      path?: string;
    } = {
      path: "/",
    }
  ) {
    setCookie(null, key, val, opts);
  }

  static deleteCookie(key: string) {
    destroyCookie(null, key);
  }
}
