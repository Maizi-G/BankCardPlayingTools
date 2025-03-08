<template>
    <div class="w-full h-full align-middle justify-center text-center">
        <div class="relative top-16 border-1 border-solid border-gray-200 rounded-lg p-4 w-1/3 m-auto text-left">
            <a-page-header class="m-auto" title="网申&进度查询" subtitle="链接可能不全，欢迎补充。" @back="$router.back()" />
            <h2 class="text-xl font-medium">网申链接</h2>
            <a-divider/>
            <h2 class="text-xl font-medium">进度查询</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: '网申&进度查询' })
</script>