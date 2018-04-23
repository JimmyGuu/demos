import {Component, OnInit} from "@angular/core";
import {ConfigService} from "./service/config.service";
import {Config, IConfig} from "./model/config.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-config',
  template: `
    <h3>Config</h3>
    <p>{{ config | json }}</p>
  `,
  providers: [ConfigService]
})

export class ConfigComponent implements OnInit{
  public config: object;
  public headers: object;
  public error: HttpErrorResponse;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    // this.configService.getConfig()
    //   .subscribe((data: IConfig) => {
    //     this.config = {
    //       ...data
    //     }
    //     console.log(data);
    //   })

    this.configService.getConfigRes()
      .subscribe(
        res => {
          const keys = res.headers.keys();
          this.headers = keys.map(key => `${key}: ${res.headers.get(key)}`);

          this.config = { ...res.body };
          console.log(res.body, this.headers);
        },
        error => {
          this.error = error;
          console.log(this.error);
        }
      )
  }
}
