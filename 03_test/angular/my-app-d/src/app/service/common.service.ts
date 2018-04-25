import {Ajax} from "./ajax.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Datas} from "../model/datas.model";

@Injectable()
export class CommonService {
  constructor(private ajax: Ajax) { }

  /**
   * Get token and server-datetime
   * @return {Observable}
   */
  public TokenApplyAndTime() {
    const data: Datas = {};
    Object.assign(data, {
      Token: undefined,
      Timespan: undefined
    });
    return this.ajax.post('Token/ApplyAndTime', data, 1);
  }

  /**
   * Image code
   * @return {Observable}
   */
  public ImageCode() {
    return this.ajax.post('Code/Image', {}, 1);
  }

  /**
   * Mobile phone code
   * @param  {string}     data.ImageCode Image code
   * @param  {string}     data.Phone     User phone
   * @param  {string}     data.IsVoice   Voice code whether
   * @param  {string}     data.Type      Phone code type
   * @return {Observable}
   */
  public PhoneCode(data?: Datas) {
    data.IsVoice = data.IsVoice === true ? true : false;
    return this.ajax.post('Code/Phone', data, 0);
  }

  /**
   * Mobile phone code by logon user
   * @param  {string}     data.IsVoice   Voice code whether
   * @return {Observable}
   */
  public PhoneNeedLoginCode(data?: Datas) {
    data.IsVoice = data.IsVoice === true ? true : false;
    return this.ajax.post('Code/PhoneNeedLogin', data, 0);
  }
}
