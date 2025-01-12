import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((config) => {
    config.headers
        ? (config.headers["Authorization"] = "Bearer " + localStorage.getItem("qiyin-token"))
        : (config.headers = new axios.AxiosHeaders({ Authorization: "Bearer " + localStorage.getItem("qiyin-token") }));
    return config;
}
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("qiyin-token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const get = (url: any, params?: Object) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export const post = (url: any, data: Object) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export const setToken = (token: string) => {
    localStorage.setItem("qiyin-token", token);
}

export const removeToken = () => {
    localStorage.removeItem("qiyin-token");
}

export const getToken = () => {
    return localStorage.getItem("qiyin-token");
}

export const isAuthenticated = () => {
    return !!localStorage.getItem("qiyin-token");
}

export const logout = () => {
    removeToken();
    window.location.href = "/login";
}

