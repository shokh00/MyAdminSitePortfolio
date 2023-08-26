import axios from "axios";

export default axios.create({
    baseURL: 'https://f-07-backend.vercel.app/api/v1',
    headers: {
        apiKey: '2ap7JQwe9l58hUtfGsHT'
    },
    timeout: 6000,
    timeoutErrorMessage: "Your network speed is too weak"
});