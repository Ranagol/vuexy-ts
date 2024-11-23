<template>
    <div>
        <h1>Products</h1>
        <ul>
            <li 
                v-for="product in products" 
                :key="product.id"
            >{{ product.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import axiosIns from '@/plugins/axios';
import type { Product } from '../types/interfaces';

const products = ref<Product[]>([]);

onMounted(async () => {
    try {
        const response = await axiosIns<Product[]>('products')
        products.value = response.data
    } catch (error) {
        console.error('Error fetching products:', error)
    }
})





</script>

<style></style>
