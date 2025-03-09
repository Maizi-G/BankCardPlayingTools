<template>
    <div class="w-full h-full align-middle justify-center text-center @container">
        <div class="@lg:relative @lg:top-16 @lg:border-1 @lg:border-solid @lg:border-gray-200 rounded-lg @lg:p-4 @lg:w-1/3 @lg:m-auto text-center">
            <a-page-header class="m-auto" title="网申&进度查询" subtitle="链接可能不全，欢迎补充。" @back="$router.back()" />
            <!-- <h2 class="text-xl font-medium">网申链接</h2>
            <a-skeleton animation v-if="loading"><a-skeleton-line :rows="4"/></a-skeleton>
            <a-divider/>
            <h2 class="text-xl font-medium">进度查询</h2>
            <a-skeleton animation v-if="loading"><a-skeleton-line :rows="4"/></a-skeleton> -->
            TODO，请在GitHub上开issue提交链接
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: '网申&进度查询' })

const loading = ref(true)
</script>