<template>
    <div class="w-full h-full align-middle justify-center text-center">
        <div class="relative top-16 border-1 border-solid border-gray-200 rounded-lg p-4 w-1/3 m-auto text-center">
            <a-page-header class="m-auto" title="卡 BIN 检测器" subtitle="不保证准确度。" @back="$router.back()" />
            <p class="text-gray-500">在下方输入六位数的卡BIN</p>
            <a-verification-code size="large" v-model="value" style="width: 300px" @finish="onFinish" class="m-auto mt-6" />
            <a-empty v-if="!binData.valid"/>
            <template v-else>
                <a-card title="检测结果" class="m-auto text-center mt-2">
                    <a-list>
                        <a-list-item>
                            <a-list-item-meta title="卡类型"></a-list-item-meta><template #extra>{{ getCardType(binData.type) }}</template>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="卡组织"></a-list-item-meta><template #extra>{{ getCardBrand(binData.brand) }}</template>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="卡等级"></a-list-item-meta><template #extra>{{ getCardLevel(binData.level) }}</template>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="发卡行"></a-list-item-meta><template #extra>{{ binData.issuer.name }}</template>
                        </a-list-item>
                        <a-list-item>
                            <a-list-item-meta title="国家"></a-list-item-meta><template #extra>{{ binData.country.name }}</template>
                        </a-list-item>
                    </a-list>
                </a-card>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: '卡 BIN 检测器' })

const value = ref('')
const binData = ref<any>({})
const onFinish = async() => {
    const data = await $fetch('/api/getBin', {
        method: 'POST',
        body: { bin: value.value }
    })
    if (data.statusCode == 200){
        // @ts-ignore
        binData.value = data.data.BIN
    }
    else{
        // @ts-ignore
        Message.error(data.message || '未知错误')
    }
}

/**
 * 
 * @param level 卡等级
 * @returns 卡等级的中文名称
 */
const getCardLevel = (level: string) => {
    switch(level){
        case 'STANDARD':
            return '普卡'
        case 'GOLD':
            return '金卡'
        case 'PLATINUM':
            return '白金卡'
        case 'DIAMOND':
            return '钻石卡'
        case 'PERSONAL':
            return '私人银行卡（部分银行可能滥发此卡段，不准确）'
        case 'WORLD':
            return 'MC 世界卡'
        case 'WORLD ELITE':
            return 'MC 世界之极卡'
        case 'SIGNATURE':
            return 'VISA 御玺卡'
        case 'INFINITE':
            return 'VISA 无限卡'
        case 'BUSINESS':
            return '商务卡'
        case 'CORPORATE':
            return '公司卡'
        case 'PREMIER':
            return '高端卡'
        case 'PREMIER WORLD':
            return '高端世界卡'
        default:
            return '未知（欢迎补充）'
    }
}

/**
 * 
 * @param brand 卡组织
 * @returns 卡组织的中文名称
 */
const getCardBrand = (brand: string) => {
    switch(brand){
        case 'VISA':
            return 'VISA'
        case 'MASTERCARD':
            return 'MasterCard'
        case 'AMERICAN EXPRESS':
            return '美国运通'
        case 'DISCOVER':
            return 'Discover'
        case 'JCB':
            return 'JCB'
        case 'DINERS CLUB':
            return 'Diners Club'
        case 'CHINA UNION PAY':
            return '银联'
        default:
            return '未知（欢迎补充）'
    }
}

/**
 * 
 * @param type 卡类型
 * @returns 卡类型的中文名称
 */
const getCardType = (type: string) => {
    switch(type){
        case 'DEBIT':
            return '借记卡'
        case 'CREDIT':
            return '信用卡'
        case 'CHARGE':
            return '充值卡'
        case 'PREPAID':
            return '预付卡'
        case 'UNKNOWN':
            return '未知（API未知）'
        default:
            return '未知（欢迎补充）'
    }
}
</script>