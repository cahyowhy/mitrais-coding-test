/**
 * Created by cahyo on 01/26/2018.
 */

import {deserialize, serialize} from 'cerialize';

import EntityAware from "./EntityAware";
import AppConfig from "@/AppConfig";

export default class BaseEntity implements EntityAware {

    @serialize
    @deserialize
    public id = 0;

    /*
      * default feedback on some false value on property
      * make sure the property is number or string
      * */
    public defaultPropertyFeedback(property, validProp, paramMessage = ''):
        { valid: boolean; type: string; message: string } {
        const propertyValue = this[property];
        const valid = typeof validProp === 'boolean' ? validProp : Boolean(propertyValue);
        let message = '';
        const type = valid ? 'success' : 'danger';

        if (paramMessage) {
            message = paramMessage;
        } else {
            message = valid ? '' : AppConfig.getVm().$t('text.must_not_empty').toString();
        }

        return {valid, type, message};
    }

    public static OnSerialized(instance: BaseEntity, json): void {
        if (parseInt(json.id) === 0) {
            delete json.id;
        }
    }
}
