import { fetchWithRetry } from "@/app/services/data-service";
import { AnilistResponse, FetchWithRetryOptions } from "../interfaces";

export const imgsizes = {
    extraLarge: {
        width: 460,
        height: 717
    },
    large: {
        width: 230,
        height: 359
    },
    medium: {
        width: 100,
        height: 156
    }
};

const url = "https://graphql.anilist.co";
let defaultErrorHandler = (error: string) => console.log('Fetch failed:', error);

// https://docs.anilist.co/guide/graphql/
// https://docs.anilist.co/guide/graphql/queries/media
const query = `
query ($page: Int = 1, $perPage: Int = 1, $isAdult: Boolean = false, $type: MediaType = MANGA, $genre_in: [String], $genre_not_in: [String]) {
    Page(page: $page, perPage: $perPage) {
        pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
        }
        media(isAdult: $isAdult, type: $type, genre_in: $genre_in, genre_not_in: $genre_not_in, sort: SCORE_DESC) {
        id
        title {
            english
        }
        averageScore
        type
        format
        status
        description(asHtml: false)
        genres
        coverImage {
            extraLarge
            large
            medium
            color
        }
      }
    }
}`;

const variables = {
    page: 1,
    perPage: 40,
    isAdult: false,
    type: "MANGA", // MANGA or ANIME
    genre_in: ["Fantasy"],
    genre_not_in: ["Ecchi", "Hentai"]
};

const createOptionIfNotExist = (opt?: FetchWithRetryOptions):
    FetchWithRetryOptions => {
    (opt = opt || {}) && !opt.init && Object.assign(opt, {
        init: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            }),
        }
    });
    return opt;
}

export async function fetchAllMedia<T>(
    opt?: FetchWithRetryOptions,
    CustomErrorHandler: Function = defaultErrorHandler
): Promise<T[]> {
    opt = createOptionIfNotExist(opt);
    const results: T[] = await fetchWithRetry(url, opt)
        .then(response => response.json())
        .then(({ data: { Page: { media } } }: AnilistResponse) => media) // parameter destructuring, return by media ...
        .catch(error => CustomErrorHandler(error));

    return results || [] as T[];
}

export async function fetchAllMediaResult<T>(
    success: Function,
    fail: Function,
    opt?: FetchWithRetryOptions
): Promise<T[]> {

    let err = "";
    const data: T[] = await fetchAllMedia<T>(opt, (error: string) => err = String(error));
    return !err ? success(data) : fail(err);
}
