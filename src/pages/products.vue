<template>
    <div>
        <h1>Products</h1>
        <ul>
            <li 
                v-for="product in productStore.products" 
                :key="product.id"
            >{{ product.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
// Here we want to import the /src/types/interfaces.ts file. Since src = @, we can import it like this:
import { useProductStore } from '@/stores/ProductStore';

const productStore = useProductStore();


onMounted(async () => {
    try {

        // Here we want to set the products in the store
        productStore.getAll();
        
    } catch (error) {
        console.error('Error fetching products:', error)
    }
})





</script>

<style></style>
