<template>
    <div class="w-full h-full align-middle justify-center text-center">
        <div class="relative top-24">
            <h2 class="text-2xl text-medium mb-6">玩卡必备小工具</h2>
            <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }" v-for="item in listItem" class="m-auto">
                <div :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }">
                    <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                        <a-typography-text>{{ item.title }}</a-typography-text>
                    </span>
                    <a-link @click="go(item.goto)">进入<icon-right /></a-link>
                </div>
            </a-card>
            <p class="text-neutral-500">Powered By Nuxt | ©2025 Crab Studio. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: '玩卡必备小工具' })
const router = useRouter()

const listItem = [
    {
        title: '卡 BIN 检测器',
        goto: '/bin'
    },
    {
        title: '外汇牌价查询',
        goto: '/currency'
    },
    {
        title: '网申&进度查询',
        goto: '/apply'
    },
    {
        title: '加入 QQ 群',
        goto: 'https://qm.qq.com/q/IxE1bcVKAY'
    },
    {
        title: 'Give us a star',
        goto: 'https://github.com/HeyCrab3/BankCardPlayingTools'
    },
]

const go = (url: string) => {
    if(url.includes('http')) {
        Message.info('正在前往外部页面。')
        window.open(url, '_blank')
    }
    else router.push(url)
}
</script>