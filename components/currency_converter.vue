<template>
    <a-button @click="visible = true" type="primary">货币转换器</a-button>
    <a-drawer title="货币转换" :visible="visible" @cancel="close" :footer="false" :width="isMobile() ? '100%' : '540px'">
        <!-- 汇率类型选择 -->
        <a-select v-model="rateType" :style="{ width: '100%', marginBottom: '20px' }" placeholder="选择汇率类型">
            <a-option value="hui_in">现汇买入价（银行买外币）</a-option>
            <a-option value="hui_out">现汇卖出价（银行卖外币）</a-option>
        </a-select>

        <!-- 货币输入行 -->
        <a-row :gutter="16">
            <a-col :span="8">
                <a-select v-model="sourceCurrency" placeholder="源货币" :style="{ width: '100%' }">
                    <a-option v-for="currency in allCurrencies" :key="currency.code" :value="currency.code">
                        {{ currency.label }}
                    </a-option>
                </a-select>
            </a-col>
            <a-col :span="16">
                <a-input-number v-model="inputAmount" :style="{ width: '100%' }" placeholder="输入金额" :precision="2"
                    mode="button" size="large" />
            </a-col>
        </a-row>

        <a-divider>转换到</a-divider>

        <!-- 目标货币行 -->
        <a-row :gutter="16">
            <a-col :span="8">
                <a-select v-model="targetCurrency" placeholder="目标货币" :style="{ width: '100%' }">
                    <a-option v-for="currency in allCurrencies" :key="currency.code" :value="currency.code">
                        {{ currency.label }}
                    </a-option>
                </a-select>
            </a-col>
            <a-col :span="16">
                <a-statistic :title="targetCurrencyLabel" :value="convertedAmount" :precision="2"
                    :value-style="{ fontSize: '20px', color: '#1890ff' }" />
            </a-col>
        </a-row>

        <!-- 汇率信息 -->
        <div class="rate-info">
            <a-descriptions :column="1" bordered size="small">
                <a-descriptions-item label="更新时间">
                    {{ exchange_rate.day }} {{ exchange_rate.time }}
                </a-descriptions-item>
                <a-descriptions-item label="中间价" v-if="currentRate.mid_price !== '--'">
                    {{ currentRate.mid_price }}
                </a-descriptions-item>
                <a-descriptions-item label="银行">
                    {{ getBank(exchange_rate.name) }}
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </a-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import isMobile from '@/util/is-mobile'

const props = defineProps({
    exchange_rate: {
        type: Object,
        required: true,
        default: () => ({
            codeList: [],
            name: '',
            day: '',
            time: ''
        })
    }
})

const visible = ref(false)
const sourceCurrency = ref('CNY') // 默认源货币为人民币
const targetCurrency = ref('USD') // 默认目标货币为美元
const inputAmount = ref(100)
const rateType = ref('hui_in')

// 添加人民币到货币列表（作为基准货币）
const allCurrencies = computed(() => {
    const baseCurrency = {
        code: 'CNY',
        name: '人民币',
        label: '人民币 (CNY)',
        isBase: true
    }

    const foreignCurrencies = props.exchange_rate.codeList.map((item: { code: any; name: any }) => ({
        code: item.code,
        name: item.name,
        label: `${item.name} (${item.code})`,
        isBase: false
    }))

    return [baseCurrency, ...foreignCurrencies]
})

// 获取当前选择的汇率数据
const currentRate = computed(() => {
    if (sourceCurrency.value === 'CNY') {
        // 源货币是人民币时，查找目标货币的汇率
        return props.exchange_rate.codeList.find((c: { code: string }) => c.code === targetCurrency.value) || {}
    } else {
        // 源货币是外币时，查找该外币的汇率
        return props.exchange_rate.codeList.find((c: { code: string }) => c.code === sourceCurrency.value) || {}
    }
})

// 转换金额计算
const convertedAmount = computed(() => {
    const amount = Number(inputAmount.value)
    if (isNaN(amount)) return 0

    // 转换场景分析
    if (sourceCurrency.value === 'CNY' && targetCurrency.value !== 'CNY') {
        // 人民币 → 外币：使用卖出价（用户用人民币买外币）
        const rate = Number(currentRate.value[rateType.value.replace('in', 'out')]) || 0
        return rate !== 0 ? amount / (rate / 100) : 0 // 处理类似 "100外币=xxx人民币" 的报价
    } else if (sourceCurrency.value !== 'CNY' && targetCurrency.value === 'CNY') {
        // 外币 → 人民币：使用买入价（用户卖外币换人民币）
        const rate = Number(currentRate.value[rateType.value]) || 0
        return (amount * rate) / 100 // 假设汇率是每100外币对应的人民币
    } else if (sourceCurrency.value !== 'CNY' && targetCurrency.value !== 'CNY') {
        // 外币 → 外币：通过人民币中间价进行交叉计算
        const sourceRate = Number(currentRate.value.mid_price) || 0
        const targetRate =
            props.exchange_rate.codeList.find((c: { code: string }) => c.code === targetCurrency.value)?.mid_price || 0
        return sourceRate && targetRate ? (amount * sourceRate) / targetRate : 0
    }

    return amount // CNY → CNY
})

// 目标货币显示标签
const targetCurrencyLabel = computed(() => {
    return allCurrencies.value.find(c => c.code === targetCurrency.value)?.label || '选择货币'
})

const close = () => {
    visible.value = false
    // 重置为默认值
    sourceCurrency.value = 'CNY'
    targetCurrency.value = 'USD'
    inputAmount.value = 100
}

const getBank = (bankCode: string) => {
    const bankList = [
        { name: '工商银行', code: 'ICBC' },
        { name: '中国银行', code: 'BOC' },
        { name: '农业银行', code: 'ABCHINA' },
        { name: '交通银行', code: 'BANKCOMM' },
        { name: '建设银行', code: 'CCB' },
        { name: '招商银行', code: 'CMBCHINA' },
        { name: '光大银行', code: 'CEBBANK' },
        { name: '浦发银行', code: 'SPDB' },
        { name: '兴业银行', code: 'CIB' },
        { name: '中信银行', code: 'ECITIC' }
    ]
    return bankList.find(bank => bank.code === bankCode)?.name || '未知银行'
}
</script>

<style scoped>
.rate-info {
    margin-top: 24px;
    padding: 12px;
    background: var(--color-fill-2);
    border-radius: 4px;
}
</style>