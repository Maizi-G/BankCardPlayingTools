import Axios from "axios";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.bin) {
    const options = {
        method: "POST",
        url: "https://bin-ip-checker.p.rapidapi.com/",
        params: { bin: body.bin },
        headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_API_KEY,
        "x-rapidapi-host": "bin-ip-checker.p.rapidapi.com",
        "Content-Type": "application/json",
        },
        data: { bin: body.bin },
    };
    try{
        const response = await Axios.request(options);
        return { statusCode: 200, data: response.data };
    }
    catch(error){
        return { statusCode: 500, data: error };
    }
  } else {
    return { statusCode: 400, data: "No bin provided" };
  }
});
