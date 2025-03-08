import Axios, { AxiosRequestConfig } from "axios";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.bank) {
    const options: AxiosRequestConfig = {
        url: 'https://tysjhlcx.market.alicloudapi.com/exchange_rate/top10',
        params: {
            bankCode: body.bank
        },
        headers: {
            Authorization: `APPCODE ${process.env.ALIYUN_APPCODE}`
        }
    };
    try{
        const response = await Axios.request(options);
        return { statusCode: 200, data: response.data.data };
    }
    catch(error){
        return { statusCode: 500, data: error };
    }
  } else {
    return { statusCode: 400, data: "No issuer provided" };
  }
});
