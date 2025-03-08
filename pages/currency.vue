<template>
    <div class="align-middle justify-center text-center">
        <div class="relative top-16 border-1 border-solid border-gray-200 rounded-lg p-4 w-5/6 m-auto text-center">
            <a-page-header class="w-1/3" title="外汇牌价比较" subtitle="银行和卡组织之间的汇率比较" @back="$router.back()" />
            <a-alert>由于部分银行已经不再区分钞汇户标识，所以这里只会展示现汇买入卖出价（也就是我们外币转账时用的）</a-alert>
            <a-form-item label="选择银行" class="mt-2">
                <a-select @change="getCurrency" :style="{ width: '320px' }" placeholder="请选择" v-model="value">
                    <a-option v-for="bank in bankList" :value="bank.code">{{ bank.name }}</a-option>
                </a-select>
            </a-form-item>
            <a-form-item label="更新时间"><span class="mr-2">{{ curData.time ? `${curData.day} ${curData.time}` : '正在获取中...' }}</span><a-button :loading="loading" class="inline-block ml-2" @click="getCurrency" type="primary">刷新</a-button></a-form-item>
            <a-form-item label="数据单位">100外币兑人民币元</a-form-item>
            <a-skeleton animation v-if="loading"><a-skeleton-line :rows="12"/></a-skeleton>
            <a-card v-else>
                <a-list>
                    <a-list-item v-for="item in curData.codeList" :key="item.code">
                        <a-list-item-meta :title="item.name || '未知货币（API未返回）'"></a-list-item-meta>
                        <template #extra>
                            <a-tag color="blue">买 {{ item.hui_in || '--' }}</a-tag>
                            <a-tag color="red">卖 {{ item.hui_out || '--' }}</a-tag>
                        </template>
                    </a-list-item>
                </a-list>
            </a-card>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({ title: '外汇牌价比较' })

const value = ref('ICBC')
const curData = ref<any>({})
const loading = ref(true)

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