
import { productService } from '@/services/serviceTemplate';
import type { Product } from '@/types/interfaces';
import { defineStore } from 'pinia';


export const useProductStore = defineStore('product', {

    state: () => ({
        products: [] as Product[],
        product: {} as Product
    }),

    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {

        async getAll() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            }
        },

        async get(id: Number) {
            try {
                this.product = await productService.get(id);
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            }
        },

        async create(item: Object) {
            try {
                const response = await productService.create(item);
                this.getAll();//getting all products from db, with the newly created product
                alert('Success!');
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            }
        },

        async update(updatedPost: Product) {
            try {
                const response = await productService.update(updatedPost);//updating the db
                this.product = updatedPost;//replace in store product

                /**
                 * replace in store products
                 * 1-get the index of the note that we want to update
                 * 2-we use the index to find our note, and update it ot the new content
                 */
                let index = this.products.findIndex(product => product.id === updatedPost.id)//1
                this.products[index] = updatedPost;//2

                alert('Success!');
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            }
        },

        async delete(id: Number) {
            try {
                const response = await productService.delete(id);//delete from backend

                /**
                 * delete from store
                 * 1-find the index of the product that we want to delete
                 * 2 - delete it
                 */
                let index = this.products.findIndex(product => product.id === id);//1
                this.products.splice(index, 1);//2

                alert('Success!');
            } catch (error) {
                console.log('Something went wrong. Please try again.', error);
            }
        },
    },
})
