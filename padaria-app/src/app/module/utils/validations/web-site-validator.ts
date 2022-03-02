import { DOMAIN_REGEXP, HOSTNAME_REGEXP, URL_REGEXP } from "../constant";

export function isWebSite(webSite: string): boolean {
    if (!webSite) return false;
    if (HOSTNAME_REGEXP.test(webSite)) return true;
    if (DOMAIN_REGEXP.test(webSite)) return true;
    if (URL_REGEXP.test(webSite)) return true;
    return false;
  }

