// const fetchYouTubeData = async (url: string) => {
//     // Build the oEmbed API URL
//     const apiUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;

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

export interface Metadata {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

// metascraper instance
const scraper = metascraper([
    title(),
    description(),
    image(),
    urlMeta(),
]);

export async function fetchMetadata(link: string): Promise<Metadata> {
    try {
        const { body, url } = await got(link, { timeout: { request: 10000 } });
        const metadata: any = await scraper({ html: body, url }); // use `any` here
        return metadata as Metadata;
    } catch (err: any) {
        console.error("Failed to fetch metadata:", err?.message || err);
        return {};
    }
}

(async () => {
    const data = await fetchMetadata("https://dev.to/devteam/we-have-four-dev-challenges-for-you-to-dive-into-this-weekend-6be");
    console.log(data);
})();
