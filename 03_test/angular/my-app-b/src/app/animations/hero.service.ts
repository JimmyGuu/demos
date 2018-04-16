export class Hero {
  constructor(public name: string, public state: string = 'inactve') {}

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
