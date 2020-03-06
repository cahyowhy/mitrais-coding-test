import {Serialize} from 'cerialize';
import EntityAware from "../entity/EntityAware";

export default class Parameter {

  private data = null;

  private header = {
    'Content-Type': 'application/json'
  };

  private url = '';

  public static methods = {
    DELETE: 'DELETE',
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
  };

  public method = Parameter.methods.GET;

  public showNotification = true;

  constructor(data = null) {
    const valid: boolean = ['number', 'string', 'object']
        .some((item: string) => typeof data === item);

    if (valid) {
      this.data = data;
    }
  }

  public setMethod(value) {
    this.method = value;

    return this;
  }

  public setEnableNotif(param: boolean) {
    this.showNotification = param;

    return this;
  }

  public setHeader(header = null) {
    if (header) {
      this.header = Object.assign({}, this.header, header);
    }

    return this;
  }

  public setUrl(value: string, suffix = null) {
    const valid = value && value.length;

    if (valid) {
      this.url = value;
    }

    const validStringSuffix: boolean = Boolean(suffix) && typeof suffix === 'string' || typeof suffix === 'number';
    const validObjectSuffix: boolean = Boolean(suffix) && Object.keys(suffix).length > 0;

    if (validStringSuffix) {
      this.url = this.url + suffix;
    } else if (validObjectSuffix) {
      const stringSuffix = Object.keys(suffix).reduce((accu: string, item: string, index: number) => {
        return accu + `${(index === 0) ? '?' : '&'}${item}=${suffix[item]}`;
      }, '');

      this.url = this.url + stringSuffix;
    }

    return this;
  }

  public getUrl() {
    return this.url;
  }

  public getHeader() {
    if (this.data && this.data instanceof FormData && this.header['Content-Type']) {
      this.header['Content-Type'] = 'false';
    }

    return this.header;
  }

  public getMethod() {
    return this.method;
  }

  public getData() {
    return this.data;
  }

  public serializeData(serializer: EntityAware) {
    if (serializer) {
      this.data = Serialize(this.data, serializer);
    }

    return this;
  }
}
