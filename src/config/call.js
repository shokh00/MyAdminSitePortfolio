import axios from "axios";
import history from '../history';

const call = axios.create({
    baseURL: 'https://f-07-backend.vercel.app/api/v1',
    headers: {
        apiKey: '2ap7JQwe9l58hUtfGsHT',
        "x-auth-token": localStorage.getItem("x-auth-token")
    },
    timeout: 6000
});


call.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 400 || error.response.status === 403 || error.response.status === 401) {
        history.push('/sign');
        window.location.reload();
    }
});

export default call;