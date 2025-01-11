import axios from "../axiosConfig/AxiosConfig";

const RegisterAppClientService = (user) => {
    try {
        return axios.post('/register', user)
    } catch (err) {
        let error = "";
        if (err.response) {
            error += err.response;
        }
        return error;
    }
};

export default RegisterAppClientService;