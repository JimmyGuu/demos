import {ApiData} from "../app.config";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError, retry} from "rxjs/operators";
import {ResponseModel} from "../model/response.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Datas} from "../model/datas.model";

/**
 * Init request url & params
 */
class AjaxOptions {
  public url: string;
  public datas: Datas;

  constructor(
    private path: string,
    private _datas: Datas,
    private isGet: boolean = false
  ) {
    this.init();
  }

  private init() {
    this.url = new ApiData().ServiceUrl + this.path;
    this.datas = {
      ClientType: new ApiData().ClientType,
      Token: 'token'
    };
    if (!this.isGet) {
      this.datas.Timespan = 'timespan';
    }
    Object.assign(this.datas, this._datas);
  }
}

/**
 * Initiate http request
 */
@Injectable()
export class Ajax {
  private httpOptions: object;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  public get(path: string, datas: Datas = {}, retries: number = 0): Observable<any> {
    const options = new AjaxOptions(path, datas, true);
    return Observable.create(observer => {
      Object.assign(options.datas, this.httpOptions);
      this.http.get<ResponseModel>(options.url, options.datas)
        .pipe(
          retry(retries),
          catchError(this.handleError)
        )
        .subscribe(
          (response: ResponseModel) => {
            this.next(observer, response);
          },
          error => {
            observer.error(error);  // request error
          },
          () => {
            observer.complete('Completed');
          }
        )
    });
  }

  public post(path: string = '', datas: Datas = {}, retries: number = 0): Observable<any> {
    const options = new AjaxOptions(path, datas, false);
    return Observable.create(observer => {
      this.http.post<ResponseModel>(options.url, options.datas, this.httpOptions)
        .pipe(
          retry(retries),
          catchError(this.handleError)
        )
        .subscribe(
          (response: ResponseModel) => {
            this.next(observer, response);
          },
          error => {
            observer.error(error);  // request error
          },
          () => {
            observer.complete('Completed');
          }
        )
    });
  }

  private handleSuccess(result: ResponseModel) {
    let isSuccess: boolean = false;

    switch (result.ResultCode) {
      case '-3':
        // 谓词
        break;
      case '-2':
        // 资源未发现
        break;
      case '-1':
        // 未知异常
        break;
      case '2':
        // 仅支持https请求
        break;
      case '3':
        // 时间戳错误
        // TODO window.location.href = '/Error/Error';
        alert('时间戳错误');
        break;
      case '4':
        // 未登录
        // TODO window.location.href = '/Account/Login';
        alert('未登录');
        break;
      case '0':
        // 成功
        isSuccess = true;
        break;
      case '1':
        // 失败
        // TODO $.GetErrorMessage('request', result.Message);
        alert('失败');
        break;
      case '5':
        // 参数错误
        // TODO self.parameterError(result.Data);
        alert('参数错误');
        break;
      case '6':
        // 图片验证码错误
        // self.parameterError([{ Key: 'ImageCode', Message: '图片验证码错误' }]);
        alert('图片验证码错误');
        break;
      case '7':
        // 手机验证码错误
        // TODO self.parameterError([{ Key: 'PhoneCode', Message: '手机验证码错误' }]);
        alert('手机验证码错误');
        break;
      case '8':
        // 频率过快
        // self.parameterError([{ Key: 'PhoneCode', Message: '频率过快' }]);
        alert('频率过快');
        break;
      case '9':
        // token错误
        // 正常情况cookie之中值只在加载页面是使用一次。只要页面加载时存在就可以
        // TODO apidata.Clear();
        // apidata.Init();
        // if (typeof self.other !== 'function') {
        //   // 刷新本页，没有框架情况下
        //   location.reload();
        // } else {
        //   self.other('请重新尝试');
        // }
        alert('token错误');
        break;
      case '10':
        // 资金账号不存在
        // TODO window.location.href = '/UserCenter/Bind'
        alert('token错误');
        break;
      default:
        break;
    }

    return isSuccess;
  }

  private handleError(error: HttpErrorResponse): ErrorObservable {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    return new ErrorObservable(`Something bad happend, please try again later.`);
  }

  private next(observer: any, res: ResponseModel) {
    const handleResult = this.handleSuccess(res);
    if (handleResult) // ResultCode: 0
      observer.next(res.Data);
    else
      observer.error(res.Message, res.ResultCode); // service error
  }
}

