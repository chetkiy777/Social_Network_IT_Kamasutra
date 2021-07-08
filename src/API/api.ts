import axios, {AxiosResponse} from 'axios';
import {ProfileType} from "../types/types";

const instance = axios.create ({
    withCredentials: true ,
    headers: {"API-KEY": "db3d1e63-29ad-4786-a53c-8baa55aeae42" } ,
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const userAPI = {
    getUsers(userPage = 1, pageSize = 10) {
        return instance.get(`users?page=${userPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    onPageChange(pageNumber = 1, pageSize = 10) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
};

export const profileAPI = {
    getProfile (userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus (userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put(`profile/status` , {status: status});
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append("image" , photoFile);
        return instance.put(`/profile/photo` ,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile` , profile)
    }
};

type meResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeWithCaptcha
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptcha {
    RequiredCaptcha = 10
}

export const authAPI = {
    me() {
        return instance.get<meResponseType>(`auth/me`).then(res => res.data)
    },
    login (email: string , password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email , password , rememberMe, captcha})
            .then(res => res.data)
    },
    logout () {
        return instance.delete('auth/login');
    }

};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
    getStarWars() {
        return axios.get(`http://swapi.dev/api/people/`).then(response => {
            return (response.data.results)
        })
    }

};
