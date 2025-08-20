import { fetchWithRetry } from "@/app/services/data-service";
import { FetchWithRetryOptions } from "../interfaces";

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
  opt?: FetchWithRetryOptions
): Promise<T> {
  opt = createOptionIfNotExist(opt);
  try {
    const response = await fetchWithRetry(url, opt);
    const { data: { Page: { media } } } = await response.json();
    return media as T;
} catch (error) {
    return { error: String(error) } as T;
  }
}
