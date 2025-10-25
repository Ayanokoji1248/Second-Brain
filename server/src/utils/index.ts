import got from "got";
import metascraper from "metascraper";

import description from "metascraper-description";
import image from "metascraper-image";
import iframe from "metascraper-iframe";
import publisher from "metascraper-publisher";
import title from "metascraper-title";
import urlMeta from "metascraper-url";


export interface Metadata {
    title?: string;
    description?: string;
    image?: string;
    iframe?: string;
    publisher?: string;
}

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

export async function fetchMetadata(link: string): Promise<Metadata> {
    try {
        const { body, url } = await got(link, { timeout: { request: 10000 } });
        const metadata = await scraper({ html: body, url });
        return metadata as Metadata;
    } catch (err: any) {
        console.error("Failed to fetch metadata:", err?.message || err);
        return {};
    }
}
