var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import got from "got";
import metascraper from "metascraper";
import description from "metascraper-description";
import image from "metascraper-image";
import iframe from "metascraper-iframe";
import publisher from "metascraper-publisher";
import title from "metascraper-title";
import urlMeta from "metascraper-url";
/**
 * Configure metascraper with all desired plugins.
 */
const scraper = metascraper([
    title(),
    description(),
    urlMeta(),
    image(),
    publisher(),
    iframe(),
]);
export function fetchMetadata(link) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body, url } = yield got(link, { timeout: { request: 10000 } });
            const metadata = yield scraper({ html: body, url });
            return metadata;
        }
        catch (err) {
            console.error("Failed to fetch metadata:", (err === null || err === void 0 ? void 0 : err.message) || err);
            return {};
        }
    });
}
