/**
 * Created by cahyo on 20/02/19
 */

import AppConfig from './AppConfig';

export default class Notification {

    public static showNotification(params: {
        status?: string; duration?: number; text?;
        group?: string; type?: string; title?: string;
    }, error = false) {
        try {
            const vm = AppConfig.getVm();

            if (vm && vm.$notify !== undefined && params) {
                const status: string = params.status ? params.status : '0000';
                let {text, duration, group, type, title} = params;

                text = text || vm.$t('notification.' + status);
                duration = duration || 3000;
                group = group || 'default';
                type = error ? 'error' : (type || 'info');
                title = title || vm.$t('label.info').toString();

                vm.$notify({text, duration, group, type, title});
            }
        } catch (e) {
            console.log(e.toString());
        }
    }
}
