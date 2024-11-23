import axiosIns from '@/plugins/axios';
import { AxiosInstance } from 'axios';
import { ObjectWithId } from '../types/interfaces';

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
  url:String;

  /**
   * Instance of axios, with the base url in it.
   */
  axiosIns:AxiosInstance = axiosIns;

  /**
   * [constructor description]
   *
   * @param   {String}  url       This is the additinal needed url. Example: '/posts'.
   */
  constructor(url:String) {
    this.url = url;
  }

  async getAll():Promise<[]>
  {
    const response = await this.axiosIns.get(`/${this.url}`);
    console.log('response arrived', response);
    return response.data;
  }

  async get(id: Number):Promise<{}>
  {
    const response = await this.axiosIns.get(`/${this.url}/${id}`);
    console.log('response arrived', response);
    return response.data;
  }

  //This create post is specific, only for the https://jsonplaceholder.typicode.com/posts
  async create(item:Object):Promise<void>
  {
    try {
      const response = await this.axiosIns.post(`/${this.url}`, item);
      console.log('response:', response);
    } catch (error) {
      console.log('error:', error)
    }
  }

  //Make sure to use id = 1 with jsonplaceholder backend.
  async update(updatedItem: ObjectWithId):Promise<void>
  {
    const response = await this.axiosIns.put(`/${this.url}/${updatedItem.id}`,updatedItem);
    console.log('response:', response);
  }
  
  async delete(id: Number):Promise<void>
  {
    const response = await this.axiosIns.delete(`/${this.url}/${id}`);
    console.log('response arrived for deletePost().', response);
  }

}

/**
 * This is the most important part: we use this universal pattern to create different services that
 * can send axios requests.
 */
export const productService = new ServiceTemplate('products');
