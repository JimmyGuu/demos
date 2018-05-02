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

  public showLoading(content: string): void {
    const CLASS_NAME: string = 'loading-overlay-container';
    const DEFAULT_CONTENT: string = '加载中...';


  }
}

class LoadingOverlay {
  private ID: string = 'loadingOverlayContainer';
  private CLASS_NAME: string = 'loading-overlay-container';
  private DEFAULT_CONTENT: string = '加载中...';
  private content: string;
  private timer: any;
  private time: number = 600;

  constructor() { }

  private create(): HTMLElement {
    const overlay = <HTMLElement>document.querySelector(`#${this.ID}`);

    if(overlay) {
      return overlay;
    }

    let _overlay = document.createElement('div'),
      _inner = document.createElement('div');
    _overlay.id = this.ID;
    _overlay.classList.add(this.CLASS_NAME);
    _overlay.classList.add('animated');
    _inner.classList.add(this.CLASS_NAME.replace(/(.*-)\w*/, '$1inner'));
    _inner.innerHTML = this.content;

    _overlay.appendChild(_inner);
    document.body.appendChild(_overlay);
    return _overlay;
  }

  public show(content: string = '') {
    this.content = content || this.DEFAULT_CONTENT;

    let overlay = this.create();
    overlay.classList.remove('fadeOut');
    overlay.classList.add('fadeIn');
    this.setTimer(overlay, 'block');
  }

  public hide() {
    let overlay = <HTMLElement>document.querySelector(`#${this.ID}`);
    overlay.classList.remove('fadeIn');
    overlay.classList.add('fadeOut');
    this.setTimer(overlay, 'none');
  }

  public remove() {
    let overlay = <HTMLElement>document.querySelector(`#${this.ID}`);
    overlay.parentNode.removeChild(overlay);
  }

  private setTimer(overlay: HTMLElement, display: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      overlay.style.display = display;
    }, this.time);
  }
}

export const Utils = new UtilitiesService();
export const loadingOver = new LoadingOverlay();
