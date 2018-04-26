import {Datas} from "../model/datas.model";
import {apiData} from "../app.config";
import {Observable} from "rxjs/Observable";

class UtilitiesService {
  public datetimeFormat(dateIn: Date, format: string = 'yyyy-MM-dd'): string {
    var date = {
      "M+": dateIn.getMonth() + 1,
      "d+": dateIn.getDate(),
      "h+": dateIn.getHours(),
      "m+": dateIn.getMinutes(),
      "s+": dateIn.getSeconds(),
      "q+": Math.floor((dateIn.getMonth() + 3) / 3),
      "S+": dateIn.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (dateIn.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return format;
  }

  public xmlHttpRequest(url: string, data: Datas = {}, type: string = 'POST', async: boolean = true): Observable<any> {
    let xhr = new XMLHttpRequest();
    data.ClientType = '6';
    let _data = JSON.stringify(data);
    xhr.open(type, url, async);
    if (async) xhr.timeout = 10000;
    xhr.setRequestHeader('Content-Type', apiData.ContentType);

    return Observable.create(observer => {
      xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          observer.next(xhr.response, xhr);
        } else {
          observer.error(xhr.response, xhr.status, xhr);
        }
        observer.complete();
      };

      xhr.ontimeout = function () {
        observer.error('Request timeout!');
      };

      xhr.onerror = function (e) {
        observer.error('A network error occurred!');
      };

      xhr.send(_data);
    });

  }
}

export const Utils = new UtilitiesService();
