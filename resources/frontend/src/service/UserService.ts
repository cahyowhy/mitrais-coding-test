/**
 * Created by cahyo on 17/01/19.
 */

import {Singleton} from "typescript-ioc";
import ProxyService from "./Proxy";

import User from "@/entity/User";
import EntityAware from "@/entity/EntityAware";
import Resources from "@/config/environment/Resources";
import Parameter from "@/service/Parameter";

@Singleton
export default class UserService extends ProxyService {

    public api: string = Resources['USER_API'];

    public serializer: EntityAware = User;

    public login(param: { email?: string; mobile_number?: string }) {
        return super.request(new Parameter(param).setMethod(Parameter.methods.POST)
            .setUrl(this.api + 'login'));
    }
}
