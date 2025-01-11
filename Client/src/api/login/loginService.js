import axios from "../axiosConfig/AxiosConfig";

const LoginService = (username, password) => {
    try {
        return axios.post('/login', { username, password})
    } catch (err) {
        let error = "";
        if (err.response) {
            error += err.response;
        }
        return error;
    }
};

export default LoginService;