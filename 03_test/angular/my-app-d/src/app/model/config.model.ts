export interface ApiData {
  ServiceUrl: string,
  ClientType: string,
  Source: string,
  TokenAndTime: string,
  ContentType: string
}

export interface SiteData {
  TelPhone: string,
  SiteStarTime: string
}

export class TokenData {
  constructor(
    public DiffTime: number,
    public Token: string,
    public Time: string
  ) { }
}

