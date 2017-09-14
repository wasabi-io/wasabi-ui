import {ResourceResponse} from './Resource';
import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import Objects from 'wasabi-common/lib/types/Objects';
import urlJoin from 'url-join';

export interface ResourceProps extends AxiosRequestConfig {
    path?: string;
}

export interface ResourceResponse<E = any> extends AxiosResponse {
    data: E;
}

export interface ResourcePromise<E = any> extends AxiosPromise {
}

export default class Resource {
    private instance: AxiosInstance;
    private path: string;

    public constructor(props: ResourceProps) {
        this.path = props.path;
        this.instance = axios.create(props)
    }

    public static setup(options: ResourceProps) {
        Objects.mergeDefaults(axios.defaults, options);
    }

    public post<E>(data: E, url?: string, config?: AxiosRequestConfig): ResourcePromise<E> {
        return this
            .instance
            .post(this.getUrl(url), data, config);
    }

    public put<E>(data: E, url?: string, config?: AxiosRequestConfig): ResourcePromise<E> {
        return this
            .instance
            .put(this.getUrl(url), data, config);
    }

    public delete<E>(url?: string, config?: AxiosRequestConfig): ResourcePromise<E> {
        return this
            .instance
            .delete(this.getUrl(url), config);
    }

    public get<E>(url?: string, config?: AxiosRequestConfig): ResourcePromise<E> {
        return this
            .instance
            .get(this.getUrl(url), config);
    }

    protected getUrl(url?: string) {
        if (url) {
            return urlJoin(this.path, url);
        }
        return this.path;
    }
}

export {AxiosRequestConfig};