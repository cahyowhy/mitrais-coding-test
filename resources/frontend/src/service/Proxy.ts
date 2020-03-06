/**
 * Created by cahyo on 20/02/19
 */

import axios, {AxiosResponse, AxiosError} from 'axios';
import environment from 'environment';
import Notification from "../Notification";
import Parameter from './Parameter';
import Response from './Response';

import EntityAware from '../entity/EntityAware';
import Constant from "../config/Constant";

interface BaseProxy {

    serializer: EntityAware;

    api: string;

    find(parameter): Promise<Response>;

    save(parameter): Promise<Response>;

    delete(id: string | number): Promise<Response>;

    update(parameter, id: string | number): Promise<Response>;

    request(parameter): Promise<Response>;
}

export default class Proxy implements BaseProxy {

    public api: string;

    public serializer: EntityAware;

    public find(param): Promise<Response> {
        const parameter = new Parameter().setUrl(this.api, param);

        return this.request(parameter);
    }

    public save(param): Promise<Response> {
        const parameter = new Parameter(param).setMethod(Parameter.methods.POST)
            .setUrl(this.api).serializeData(this.serializer);

        return this.request(parameter);
    }

    public delete(id: string | number = ''): Promise<Response> {
        const parameter = new Parameter().setMethod(Parameter.methods.DELETE)
            .setUrl(this.api, id);

        return this.request(parameter);
    }

    public update(param, id: string | number = ''): Promise<Response> {
        const parameter = new Parameter(param).setMethod(Parameter.methods.PUT)
            .setUrl(this.api + id).serializeData(this.serializer);

        return this.request(parameter);
    }

    public request(parameter: Parameter): Promise<Response> {
        const config = {
            timeout: environment['MAX_TIMEOUT'],
            method: parameter.getMethod(),
            url: parameter.getUrl(),
            headers: parameter.getHeader(),
            data: parameter.getData()
        };

        return axios(config).then((response: AxiosResponse) => {
            const hasStatusData = response.data && response.data.status;
            const fixedResponse = response.data && typeof response.data === 'object' ? response.data : {};
            const responseParameter = Object.assign({}, fixedResponse, {serializer: this.serializer});

            if (parameter.showNotification && hasStatusData && config.method !== Parameter.methods.GET) {
                Notification.showNotification({status: response.data.status});
            }

            return new Response(responseParameter);
        }).catch((err: AxiosError) => {
            if (err.response && err.response.status) {
                Notification.showNotification({
                    text: 'Jaringan bermasalah',
                    title: err.response.status.toString()
                }, true);
            }

            return new Response({status: Constant.STATUS.API.DEFAULT_ERROR});
        });
    }
}
