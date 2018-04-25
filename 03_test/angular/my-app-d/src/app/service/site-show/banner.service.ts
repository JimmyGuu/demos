import {Injectable} from "@angular/core";
import {Ajax} from "../ajax.service";

@Injectable()
export class BannerService {
  constructor(private ajax: Ajax) { }

  /**
   * Get index banner info
   * @return {Observable}
   */
  public banner() {
    return this.ajax.get('Banner/Get', {}, 1);
  }
}
