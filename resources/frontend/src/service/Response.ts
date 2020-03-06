import Constant from '../config/Constant';
import {Deserialize} from 'cerialize';
import {isNil, get} from 'lodash';

export default class Response {

  private data;

  private readonly rows;

  private readonly response;

  private readonly status;

  private readonly serializer;

  private statusSuccess: Array<string> = [
    Constant.STATUS.API.SAVE_SUCCESS,
    Constant.STATUS.API.UPDATE_SUCCESS,
    Constant.STATUS.API.DELETE_SUCCESS,
    Constant.STATUS.API.UPLOAD_SUCCESS,
    Constant.STATUS.API.LOGIN_SUCCESS,
    Constant.STATUS.API.OPERATION_COMPLETE,
    Constant.STATUS.API.VALID_CODE,
  ];

  constructor(param = null) {
    const valid: boolean = typeof param === 'object' && Object.keys(param).length > 0;

    if (valid) {
      const {data, status, rows, serializer} = param;

      this.response = param;

      this.status = typeof status === 'string' && Boolean(status) ? status : null;

      this.data = data ? data : null;

      this.rows = typeof rows === 'number' && Boolean(rows) ? rows : null;

      this.serializer = typeof serializer === 'function' && Boolean(serializer) ? serializer : null;
    }
  }

  public setData(param = null) {
    this.data = param;

    return this;
  }

  /**
   * cek either response contain status or data
   * usually on get response.status is empty
   */
  public get isSuccess() {
    return this.statusSuccess.indexOf(this.status) !== -1 || this.hasValidData;
  }

  public get statusResponse() {
    return this.status;
  }

  public get hasValidData(): boolean {
    return Boolean(this.data) && (typeof this.data === 'object' || Array.isArray(this.data));
  }

  public getResponse(defaultValue = {}) {
    return this.response ? this.response : defaultValue;
  }

  public getData(defaultValue = null) {
    return this.hasValidData ? this.data : defaultValue;
  }

  public getOriginalData(defaultValue = null) {
    return this.data || defaultValue;
  }

  public getRows(defaultValue = 0) {
    return this.rows ? this.rows : defaultValue;
  }

  public getDeserializeResponse(defaultValue = null, serializer = null) {
    const containSerializer = [serializer, this.serializer].some((item) =>
      typeof item === 'function');

    if (!this.hasValidData || !containSerializer) {
      return defaultValue;
    }

    const fixedSerializer = serializer ? serializer : this.serializer ? this.serializer : null;

    return Deserialize(this.data, fixedSerializer);
  }

  public sortData(key = 'id', isDecrement = false, customFnSort = null) {
    if (Array.isArray(this.data) && this.data[0] && !isNil(get(this.data[0], key, null))) {
      const fnSort = (a, b) => {
        if (isDecrement) {
          return (b && get(b, key, 0) || 0) - (a && get(a, key, 0) || 0);
        }

        return (a && get(a, key, 0) || 0) - (b && get(b, key, 0) || 0);
      };

      this.data = this.data.sort(customFnSort ? customFnSort : fnSort);
    }

    return this;
  }
}
