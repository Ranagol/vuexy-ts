<script setup lang="ts">
import type { Invoice } from '@/@fake-db/types';
import { paginationMeta } from '@/@fake-db/utils';
import { VDataTableServer } from 'vuetify/labs/VDataTable';
// Here we want to import the /src/types/interfaces.ts file. Since src = @, we can import it like this:
import { useProductStore } from '@/stores/ProductStore';
import type { Options } from '@core/types';

// 👉 Store
const productStore = useProductStore();

/**
 * For now, the data is stored in this component, not in the store. The store only has the actions.
 */
const searchQuery = ref('')
const dateRange = ref('')
const selectedStatus = ref()
const totalInvoices = ref(0)
const invoices = ref<Invoice[]>([])
const selectedRows = ref<string[]>([])

onMounted(async () => {
    try {

        // Here we want to set the products in the store
        productStore.getAll();
        
    } catch (error) {
        console.error('Error fetching products:', error)
    }
})

// This here is the pagination data
const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const isLoading = ref(false)
const currentPage = ref(1)

currentPage.value = options.value.page

// 👉 headers. More precisely, these are the column names.
const headers = [
  { title: '#ID', key: 'id' },
  { title: 'Title', key: 'title', sortable: false },
  { title: 'Price', key: 'price' },
  { title: 'Category', key: 'category' },
  { title: 'Description', key: 'description' },
  { title: 'Image', key: 'image' },
]





// 👉 Delete Invoice
// const deleteInvoice = (id: number) => {
//   invoiceListStore.deleteInvoice(id)
//     .then(() => {
//       fetchInvoices(
//         searchQuery.value,
//         selectedStatus.value,
//         dateRange.value?.split('to')[0],
//         dateRange.value?.split('to')[1],
//         options.value,
//       )
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

// 👉 watch for data table options like itemsPerPage,page,searchQuery,sortBy etc...
watchEffect(() => {
  const [start, end] = dateRange.value ? dateRange.value.split('to') : ''

//   fetchInvoices(
//     searchQuery.value,
//     selectedStatus.value,
//     start,
//     end,
//     options.value,
//   )
})
</script>

<template>
  <VCard
    v-if="productStore.products"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <div class="me-3 d-flex gap-3">
        <AppSelect
          :model-value="options.itemsPerPage"
          :items="[
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
          ]"
          style="width: 6.25rem;"
          @update:model-value="options.itemsPerPage = parseInt($event, 10)"
        />
        <!-- 👉 Create invoice -->
        <!-- <VBtn
          prepend-icon="tabler-plus"
          :to="{ name: 'apps-invoice-add' }"
        >
          Create invoice
        </VBtn> -->
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div class="invoice-list-filter">
          <AppTextField
            v-model="searchQuery"
            placeholder="Search"
            density="compact"
          />
        </div>

        <!-- 👉 Select status -->
        <div class="invoice-list-filter">
          <AppSelect
            v-model="selectedStatus"
            placeholder="Select something with select"
            clearable
            clear-icon="tabler-x"
            single-line
            :items="['Downloaded', 'Draft', 'Sent', 'Paid', 'Partial Payment', 'Past Due']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- SECTION Datatable -->
    <VDataTableServer
      v-model="selectedRows"
      v-model:items-per-page="options.itemsPerPage"
      v-model:page="options.page"
      :loading="isLoading"
      :items-length="totalInvoices"
      :headers="headers"
      :items="productStore.products"
      class="text-no-wrap"
      @update:options="options = $event"
    >

      <!-- id -->
      <template #item.id="{ item }">
        {{ item }}
        <!-- {{ item.raw.id }} -->
      </template>


      <!-- client -->
      <template #item.title="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex flex-column">
            <h6 class="text-body-1 font-weight-medium mb-0">
              {{ item.raw.title }}
            </h6>
          </div>
        </div>
      </template>

      <!-- Total -->
      <template #item.total="{ item }">
        ${{ item.raw.total }}
      </template>

      <!-- Date -->
      <template #item.date="{ item }">
        {{ item.raw.issuedDate }}
      </template>


      <!-- Actions -->
      <template #item.actions="{ item }">
        <!-- <IconBtn @click="deleteInvoice(item.raw.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn> -->

        <!-- <IconBtn :to="{ name: 'apps-invoice-preview-id', params: { id: item.raw.id } }">
          <VIcon icon="tabler-eye" />
        </IconBtn> -->

        <!-- <MoreBtn
          :menu-list="computedMoreList(item.raw.id)"
          item-props
          color="undefined"
        /> -->
      </template>

      <!-- pagination -->

      <template #bottom>
        <VDivider />
        <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{ paginationMeta(options, totalInvoices) }}
          </p>

          <VPagination
            v-model="options.page"
            :length="Math.ceil(totalInvoices / options.itemsPerPage)"
            :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalInvoices / options.itemsPerPage)"
          >
            <template #prev="slotProps">
              <VBtn
                variant="tonal"
                color="default"
                v-bind="slotProps"
                :icon="false"
              >
                Previous
              </VBtn>
            </template>

            <template #next="slotProps">
              <VBtn
                variant="tonal"
                color="default"
                v-bind="slotProps"
                :icon="false"
              >
                Next
              </VBtn>
            </template>
          </VPagination>
        </div>
      </template>
    </VDataTableServer>
    <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
