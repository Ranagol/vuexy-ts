/**
 * axiosIns is the name of the axios instance in the Vuexy template for some reason.
 */
import axiosIns from '@/plugins/axios';

/**
 * AxiosInstance is the official type for axios instance, provided by axios. Just import it.
 */
import { AxiosInstance } from 'axios';

/**
 * ObjectWithId is a custom type, that has an id certainly. It is in the interfaces.ts file. Need 
 * for the update method.
 */
import { ObjectWithId } from '@/types/interfaces';

/**
 * request is sent here: //request is sent here: https://jsonplaceholder.typicode.com/postsposts. This is our backend.
 */
class ServiceTemplate {

    /**
     * Example: we want this url: https://jsonplaceholder.typicode.com/posts
     * This url contains the base url already in axiosIns, so we just need to add 'posts', if we
     * are working with posts objects.
     * 'posts', without /
     */
    url: String;

    /**
     * Instance of axios, with the base url in it.
     */
    axiosIns: AxiosInstance = axiosIns;

    /**
     * [constructor description]
     *
     * @param   {String}  url       This is the additinal needed url. Example: '/posts'.
     */
    constructor(url: String) {
        this.url = url;
    }

    async getAll(): Promise<[]> {
        const response = await this.axiosIns.get(`/${this.url}`);
        console.log('response arrived', response);
        return response.data;
    }

    /**
     * get() will return an object. An {}. However, we can't say here that the get() will return an
     * ordinary {} object, because TS needs more precise data. Is it a User object? A Product object?
     * 
     * We can't use this: async get(id: Number):Promise<{}>, because it is not precise enough.
     * 
     * We can't use this either: async get(id: Number):Promise<Product>, because this is a reusable
     * function, and it will sometimes return a Product, sometimes a User, etc. So we need to use a
     * generic type here. We will use T, which is a generic type. We will use it like this: 
     * 
     * async get<T>(id: Number):Promise<T>. This way, we can use this function for any type of object.
     * 
     * @param id 
     * @returns 
     */
    async get<T>(id: Number): Promise<T> {
        const response = await this.axiosIns.get(`/${this.url}/${id}`);
        console.log('response arrived', response);
        return response.data;
    }

    //This create post is specific, only for the https://jsonplaceholder.typicode.com/posts
    async create(item: Object): Promise<void> {
        try {
            const response = await this.axiosIns.post(`/${this.url}`, item);
            console.log('response:', response);
        } catch (error) {
            console.log('error:', error)
        }
    }

    //Make sure to use id = 1 with jsonplaceholder backend.
    async update(updatedItem: ObjectWithId): Promise<void> {
        const response = await this.axiosIns.put(`/${this.url}/${updatedItem.id}`, updatedItem);
        console.log('response:', response);
    }

    async delete(id: Number): Promise<void> {
        const response = await this.axiosIns.delete(`/${this.url}/${id}`);
        console.log('response arrived for delete...().', response);
    }
}

/**
 * This is the most important part: we use this universal pattern to create different services that
 * can send axios requests.
 * 
 * Remember, the argument word is plural, because this will be a url, where the request will be sent.
 */
export const productService = new ServiceTemplate('products');
