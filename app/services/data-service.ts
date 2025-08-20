/**
 * Fetch data from a URL.
 * @param input The URL to fetch.
 * @param init Optional fetch options.
 * @returns A promise that resolves to the response data.
 * usage:
 * fetchData('https://api.example.com/data')
 * .then(result => console.log(result))
 * .catch(error => console.error(error));
 */
export function fetchData(
    input: string | URL | globalThis.Request,
    init?: RequestInit
): Promise<Response> {
    return new Promise((resolve, reject) => {
        fetch(input, init)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

/**
 * Fetch data from a URL with retry logic.
 * @param input The URL to fetch.
 * @param opt Optional parameters for the fetch request.
 * @returns A promise that resolves to the response data.
 * usage:
 * fetchWithRetry('https://api.example.com/data')
 * .then(response => response.json())
 * .then(data => console.log('Fetched data:', data))
 * .catch(error => console.error('Fetch failed:', error));
 */
export async function fetchWithRetry(
    input: string | URL | globalThis.Request,
    opt?: {
        init?: RequestInit,
        retries?: number,
        delay?: number
    }
): Promise<Response> 
{
    const { init, retries = 3, delay = 1750 } = opt || {};
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(input, init);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (attempt < retries) {
                console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.log(`All ${retries} attempts failed.`);
                throw error;
            }
        }
    }

    throw new Error("Unexpected error in fetchWithRetry");
}

