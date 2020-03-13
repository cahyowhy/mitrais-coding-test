/**
 * Created by cahyo on 09/01/2019.
 */

import {deserialize, serialize, deserializeAs, inheritSerialization} from "cerialize";
import {format} from 'date-fns';
import BaseEntity from "./BaseEntity";
import {emailValidation, phoneNumberValidation} from "@/filter";
import AppConfig from "@/AppConfig";
import Constant from "@/config/Constant";

@inheritSerialization(BaseEntity)
export default class User extends BaseEntity {

    @serialize
    @deserialize
    public name = "";

    @serialize
    @deserialize
    public gender = "L";

    @serialize
    @deserialize
    public firstname = "";

    @serialize
    @deserialize
    public lastname = "";

    @serialize
    @deserializeAs(Date)
    public birthdate: Date = new Date();

    @serialize
    @deserialize
    public email = "";

    @serialize
    @deserialize
    public mobile_number = "";

    public firstnameFeedback() {
        const valid = Boolean(this.firstname);
        const message: string = valid ? '' : AppConfig.getVm().$t('text.must_not_empty').toString();

        return this.defaultPropertyFeedback('firstname', valid, message);
    }

    public lastnameFeedback() {
        const valid = Boolean(this.lastname);
        const message: string = valid ? '' : AppConfig.getVm().$t('text.must_not_empty').toString();

        return this.defaultPropertyFeedback('lastname', valid, message);
    }

    public emailFeedback() {
        const valid: boolean = emailValidation(this.email);
        const message: string = valid ? '' : AppConfig.getVm().$t('text.valid_email').toString();

        return this.defaultPropertyFeedback('email', valid, message);
    }

    public mobileNumberFeedback() {
        const valid: boolean = phoneNumberValidation(this.mobile_number);
        const message: string = valid ? '' : AppConfig.getVm().$t('text.valid_phone_number').toString();

        return this.defaultPropertyFeedback('mobile_number', valid, message);
    }

    public hasValid() {
        return this.firstnameFeedback().valid && this.lastnameFeedback().valid &&
            this.emailFeedback().valid && this.mobileNumberFeedback().valid;
    }

    public hasValidLogin() {
        return this.emailFeedback().valid && this.mobileNumberFeedback().valid;
    }

    public get errorMessagesRegister(): Array<string> {
        return ['firstnameFeedback', 'lastnameFeedback', 'emailFeedback', 'mobileNumberFeedback']
            .filter((key) => !this[key]()['valid'])
            .map((key: string) => `${AppConfig.getVm().$t('label.' + this[key]()['key'])} : ${this[key]()['message']}`);
    }

    public get errorMessagesLogin(): Array<string> {
        return ['emailFeedback', 'mobileNumberFeedback']
            .filter((key) => !this[key]()['valid'])
            .map((key: string) => `${AppConfig.getVm().$t('label.' + this[key]()['key'])} : ${this[key]()['message']}`);
    }

    public static OnSerialized(instance: User, json): void {
        if (parseInt(json.id) === 0) {
            delete json.id;
        }

        json.birthdate = format(instance.birthdate, Constant.POST_PUT_FORMAT_DATE);
    }
}
