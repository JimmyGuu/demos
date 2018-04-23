export class Config {
  constructor(
    public heroUrl: string,
    public textfile: string
  ) { }
}

export interface IConfig {
  heroesUrl: string,
  textfile: string
}
