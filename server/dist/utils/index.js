// const fetchYouTubeData = async (url: string) => {
//     // Build the oEmbed API URL
//     const apiUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//     try {
//         // Fetch the JSON from YouTube oEmbed API
//         const response = await fetch(apiUrl);
//         // Check if request was successful
//         if (!response.ok) throw new Error("Failed to fetch YouTube data");
//         // Parse JSON
//         const data = await response.json();
//         console.log(data)
//         // Extract what we need 
//         return {
//             title: data.title,
//             thumbnail: data.thumbnail_url,
//             channel: data.author_name
//         };
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// };
// const fetchTweetData = async (url:string) => {
//     const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
//     try {
//         const res = await fetch(apiUrl);
//         if (!res.ok) throw new Error("Failed to fetch tweet");
//         const data = await res.json();
//         console.log(data)
//         return {
//             author: data.author_name,
//             html: data.html
//         };
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// };
// // Example usage
// (async () => {
//     const url = "https://x.com/AnxiousHolly/status/1981705680726925525";
//     const tweetData = await fetchTweetData(url);
//     console.log(tweetData);
// })();
// // // Example usage
// // (async () => {
// //     const url = "https://youtu.be/RO3TGrPilxw?si=6rCZogYCe8i8jBMU";
// //     const videoData = await fetchYouTubeData(url);
// //     console.log(videoData);
// // })();
import got from "got";
import metascraper from "metascraper";
import title from "metascraper-title";
import description from "metascraper-description";
import image from "metascraper-image";
import urlMeta from "metascraper-url";
// metascraper instance
const scraper = metascraper([
    title(),
    description(),
    image(),
    urlMeta(),
]);
export function fetchMetadata(link) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body, url } = yield got(link, { timeout: { request: 10000 } });
            const metadata = yield scraper({ html: body, url }); // use `any` here
            return metadata;
        }
        catch (err) {
            console.error("Failed to fetch metadata:", (err === null || err === void 0 ? void 0 : err.message) || err);
            return {};
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchMetadata("https://dev.to/devteam/we-have-four-dev-challenges-for-you-to-dive-into-this-weekend-6be");
    console.log(data);
}))();
