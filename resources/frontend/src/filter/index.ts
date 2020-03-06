import {format} from 'date-fns';
import Constant from "@/config/Constant";

export const emailValidation = function (email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
};

export const phoneNumberValidation = function (phoneNumber: string): boolean {
    const re = /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/;

    return re.test(phoneNumber);
};

export const previewDate = function (date: Date, formatDate?: string) {
    return format(date, Constant.PREVIEW_FORMAT_DATE || formatDate);
};
