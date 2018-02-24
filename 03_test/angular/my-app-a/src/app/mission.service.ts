import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MissionService {
  // 可观察的字符串来源
  private missionAnnounceSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // 可观察的字符串流
  missionAnnounced$ = this.missionAnnounceSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // 服务消息命令
  announceMission(mission: string) {
    this.missionAnnounceSource.next(mission);
  }
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
