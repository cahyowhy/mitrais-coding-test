import "./style/Style.scss";
import 'v-calendar/lib/v-calendar.min.css';

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VueNotification from 'vue-notification';
import environment from 'environment';
import VUnicode from "v-unicode";
import VCalendar from 'v-calendar';

import router from './router';
import englishLocale from './locale/English';
import indonesianLocale from './locale/Indonesian';
import {emailValidation, phoneNumberValidation, previewDate} from "@/filter";

export default class AppConfig {

    private static vm: Vue;

    private static i18n: VueI18n;

    public static init() {
        AppConfig.setVueConfig();
        AppConfig.setPlugin();
        AppConfig.setGlobalComponent();
        AppConfig.setGlobalFilter();

        AppConfig.getVm().$mount("#app");
    }

    public static getI18n(): VueI18n {
        if (!AppConfig.i18n) {
            AppConfig.i18n = new VueI18n({
                locale: environment.LOCALE,
                fallbackLocale: environment.LOCALE,
                messages: {
                    'en': englishLocale,
                    'id': indonesianLocale
                }
            });
        }

        return AppConfig.i18n;
    }

    public static getVm() {
        if (!AppConfig.vm) {
            AppConfig.vm = new Vue({
                i18n: AppConfig.getI18n(),
                router,
            });
        }

        return AppConfig.vm;
    }

    public static setVueConfig() {
        Vue.config.productionTip = false;
        Vue.config.devtools = false;
        Vue.config.silent = true;
    }

    public static setGlobalComponent() {
        const callbackMapFn: Function = (key: string, roots: Function) => {
            let componentName: string | Array<string> = key.match(/\w+/)[0];

            // check has sub folder
            if ((key.match(/\//g) || []).length > 1) {
                componentName = key.split('/');
                componentName = componentName[componentName.length - 1];
                componentName = componentName.match(/\w+/)[0];
            }

            Vue.component(componentName, roots(key).default);
        };

        const commonComponents = require.context('./components', true, /\.(vue)$/i);

        commonComponents.keys().map((key: string) => callbackMapFn(key, commonComponents));
    }

    public static setGlobalFilter() {
        Vue.filter('phoneNumberValid', phoneNumberValidation);
        Vue.filter('emailValid', emailValidation);
        Vue.filter('previewDate', previewDate);
    }

    public static setPlugin() {
        Vue.use(VCalendar, {
            firstDayOfWeek: 2,
            locale: 'id',
            popoverVisibility: 'focus'
        });

        Vue.use(VueRouter);
        Vue.use(VueI18n);
        Vue.use(VueNotification);
        Vue.use(VUnicode);
    }
}
