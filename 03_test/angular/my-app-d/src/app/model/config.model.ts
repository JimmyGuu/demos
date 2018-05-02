export interface ApiData {
  ClientType: string;
  ServiceUrl: string;
  Source: string;
  TokenAndTime: string;
  IsShowLoading: string;
  ContentType: string;
}

export interface SiteData {
  TelPhone: string;
  SiteStarTime: string;
}

export class TokenData {
  constructor(
    public DiffTime: number,
    public Token: string,
    public Time: string
  ) { }
}

