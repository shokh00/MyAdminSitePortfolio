import axios from "axios";

export default axios.create({
    baseURL: 'https://f-07-backend.vercel.app/api/v1',
    headers: {
        apiKey: '2ap7JQwe9l58hUtfGsHT',
        "x-auth-token": localStorage.getItem("token")
    },
    timeout: 6000
});