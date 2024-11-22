<template>
    <div>
        <h1>Products</h1>
        <ul>
            <li v-for="product in products" :key="product.id">{{ product.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import axiosIns from '@/plugins/axios';

const products = ref([])

onMounted(async () => {
    try {
        const response = await axiosIns('products')
        products.value = response.data
    } catch (error) {
        console.error('Error fetching products:', error)
    }
})

// onMounted(async () => {
//   console.log('mounted')
//   const { data, error } = await useFetch('https://fakestoreapi.com/products').json()

//   if (error.value) {
//     console.error('Error fetching products:', error.value)
//   } else {
//     products.value = data.value
//     console.log(data.value)
//   }
// })




</script>

<style></style>
