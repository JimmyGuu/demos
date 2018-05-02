import {ApiData, SiteData} from "./model/config.model";

export const apiData: ApiData = {
  ServiceUrl: 'http://wfe_tl.hphr.com/Api/',
  //ServiceUrl: 'http://192.168.10.8:8003/Api/',
  ClientType: '6',
  Source: '4',
  TokenAndTime: 'tokenAndTime',
  IsShowLoading: 'showLoading',
  ContentType: 'application/x-www-form-urlencoded;charset=UTF-8'
};

export const siteData: SiteData = {
  TelPhone: '400-178-1158',
  SiteStarTime: '2017-06-01'
};
