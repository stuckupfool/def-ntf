import jsonFetch, { retriers } from "json-fetch";
import * as _ from "lodash";

function retry(response: any) {
    return retriers.isNetworkError(); // || retriers.isSxx(response);
}

const staticOptions = {
    credentials: "omit",
    shouldRetry: retry,
    retry: {
        retries: 3,
    },
};

export default async function fetch<T>(url: string, options?: any) {
    const usOptions = _.assign({}, options, staticOptions);
    const response = await jsonFetch(url, usOptions);
    if(response.status === 401) {
        return {} as T;
    }
    return response.body as T;
}