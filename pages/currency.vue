<template>
    <div class="align-middle justify-center text-center" id="container">
        <a-page-header class="fixed bg-white/50 border-b-1 border-gray-200 border-solid w-full z-1000 blue backdrop-blur-md" title="外汇牌价比较" subtitle="银行和卡组织之间的汇率比较" @back="$router.back()" />
        <div class="m-auto text-center p-4 relative top-12">
            <a-alert class="max-w-full">由于部分银行已经不再区分钞汇户标识，所以这里只会展示现汇买入卖出价（也就是我们外币转账时用的）</a-alert>
            <a-form-item label="选择银行" class="mt-2">
                <a-select @change="getCurrency" :style="{ width: '320px' }" placeholder="请选择" v-model="value">
                    <a-option v-for="bank in bankList" :value="bank.code">{{ bank.name }}</a-option>
                </a-select>
                <ClientOnly><CurrencyConverter v-if="!loading" :exchange_rate="curData"/></ClientOnly>
            </a-form-item>
            <a-form-item label="更新时间"><span class="mr-2">{{ curData.time ? `${curData.day} ${curData.time}` : '正在获取中...'
                    }}</span><a-button :loading="loading" class="inline-block ml-2" @click="getCurrency"
                    type="primary" shape="round">刷新</a-button></a-form-item>
            <a-form-item label="展示中间价（不推荐）"><a-switch v-model="showMidPrice"/></a-form-item>
            <a-form-item label="展示汇损"><a-switch v-model="showPriceLoss"/></a-form-item>
            <a-collapse class="text-left" accordion>
                <a-collapse-item header="数据说明" name="1">
                    现汇买入价：银行用人民币买入外币的价格<br/>
                    现汇卖出价：银行用外币卖出人民币的价格<br/>
                    汇差：银行现汇卖出价减去银行现汇买入价即为汇差<br/>
                    预估汇损：汇差除以现汇买入价即为预估汇损<br/>
                    显示NaN？银行可能不交易这种币种（类型）或者没返回对应价格<br/>
                    测算的汇差汇损准吗？不一定准，以你买卖时间的牌价为准。
                </a-collapse-item>
            </a-collapse>
            <a-skeleton animation v-if="loading"><a-skeleton-line :rows="12" /></a-skeleton>
            <a-card v-else class="p-0">
                <a-list>
                    <a-list-item v-for="item in curData.codeList" :key="item.code">
                        <a-list-item-meta :title="item.name || '未知货币（API未返回）'"></a-list-item-meta>
                        <template #extra>
                            <a-tag color="blue">买 {{ processFixed(processNumber(item.hui_in) / 100) || '--'
                                }}￥/{{ item.code }}</a-tag>
                            <a-tag color="magenta" v-if="showMidPrice">中 {{ processFixed(processNumber(item.mid_price) / 100) || '--'
                                }}￥/{{ item.code }}</a-tag>
                            <a-tag color="red">卖 {{ processFixed(processNumber(item.hui_out) / 100) || '--'
                                }}￥/{{ item.code }}</a-tag>
                            <template v-if="showPriceLoss">
                                <a-tag color="orange">汇差（每百） {{ processFixed(processNumber(item.hui_out) -
                                    processNumber(item.hui_in)) }}</a-tag>
                                <a-tag color="orangered">汇差 {{ processFixed((processNumber(item.hui_out) -
                                    processNumber(item.hui_in)) / 100) }}</a-tag>
                                <a-tag color="green">预估汇损 {{ processFixed((processNumber(item.hui_out) -
                                    processNumber(item.hui_in)) * 100 / processNumber(item.hui_in)) }}%</a-tag>
                            </template>
                        </template>
                    </a-list-item>
                </a-list>
            </a-card>
        </div>
        <a-back-top target-container="#container" :style="{position:'absolute'}" />
    </div>
</template>

<script setup lang="ts">
useHead({ title: '外汇牌价比较' })

const value = ref('ICBC')
const curData = ref<any>({ codeList: [] })
const loading = ref(true)

const showMidPrice = ref(false)
const showPriceLoss = ref(true)

const processNumber = (num: string) => {
    return num ? Number(parseFloat(num).toFixed(2)) : 0
}

const processFixed = (num: Number) => {
    return Number(num.toFixed(2))
}

// 银行列表
// 工商银行 ：ICBC ，中国银行：BOC ，农业银行：ABCHINA ，交通银行：BANKCOMM ，建设银行：CCB ，招商银行：CMBCHINA ，光大银行：CEBBANK 浦发银行：SPDB ，兴业银行：CIB ，中信银行：ECITIC
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

const getCurrency = () => {
    loading.value = true
    /** 数据返回格式
     * {
        "orderNo": "bir3wt2yw744zhi1cr",//订单号
        "ret_code": "0",    //0为成功，其他失败
        "name": "ICBC",//银行编码
        "time": "16:32:50",//发布时间
        "day": "2022-10-20",//发布日期
        "listSize": "23",//返回数据列表长度
        "codeList": [
            {
                "name": "瑞士法郎",//货币名称
                "code": "CHF",//货币简码
                "hui_in": "100",//现汇买入价
                "chao_in": "100",//现钞买入价
                "hui_out": "100",//现汇卖出价
                "chao_out": "100",//现钞卖出价
                "mid_price": "--"//中间价
            }
        ]
    }
     */
    $fetch('/api/getCur', {
        method: 'POST',
        body: { bank: value.value }
    }).then((data: any) => {
        if (data.statusCode == 200) {
            // @ts-ignore
            curData.value = data.data
            loading.value = false
        }
        else {
            // @ts-ignore
            Message.error(data.message || '未知错误')
        }
    })
}

onMounted(() => getCurrency())
</script>