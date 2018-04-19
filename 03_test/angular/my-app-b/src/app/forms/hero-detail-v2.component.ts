import {Component, Input, OnChanges} from "@angular/core";
import {Address, Hero, states} from "./data-model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HeroService} from "./hero.service";

@Component({
  selector: 'app-hero-detail-v2',
  template: `
    <h4>name: {{ hero.name }}</h4>
    <form [formGroup]="heroForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input type="text" class="form-control" formControlName="name">
      </div>
      <div formArrayName="secretLairs" class="well well-lg">
        <!--<div class="form-group">-->
          <!--<input type="text" class="form-control" formControlName="street">-->
        <!--</div>-->
        <div *ngFor="let address of secretLairs.controls; let i=index" [formGroupName]="i">
          <h4>Address #{{ i + 1 }}</h4>
          <div>
            <div class="form-group">
              Street:
              <input type="text" class="form-group" formControlName="street">
            </div>
            <div class="form-group">
              <label class="center-block">City:
                <input class="form-control" formControlName="city">
              </label>
            </div>
            <div class="form-group">
              <label class="center-block">State:
                <select class="form-control" formControlName="state">
                  <option *ngFor="let state of states" [value]="state">{{state}}</option>
                </select>
              </label>
            </div>
            <div class="form-group">
              <label class="center-block">Zip Code:
                <input class="form-control" formControlName="zip">
              </label>
            </div>
          </div>
        </div><!-- secretLairs-->
        <button type="button" (click)="addLair()" class="btn btn-primary">addLair</button>
        <button type="button" (click)="removeLair()" class="btn btn-primary">removeLair</button>
        <button type="button" (click)="revert()" [disabled]="heroForm.pristine" class="btn btn-primary">revert</button>
        <button type="submit" [disabled]="heroForm.pristine" class="btn btn-success">save</button>
      </div>
    </form>
    <hr>
    <h4>Name change log:</h4>
    <p *ngFor="let log of nameChangeLog">{{ log }}</p>
  `
})

export class HeroDetailV2Component implements OnChanges{
  @Input() hero: Hero;

  public states = states;
  public heroForm: FormGroup;
  public nameChangeLog: string[] = [];

  constructor(private formBuilder: FormBuilder, private heroService: HeroService)  {
    this.createForm();
    this.logNameChange();
  }

  ngOnChanges() {
    this.reBuildForm();
  }

  private reBuildForm() {
    this.heroForm.reset({
      name: this.hero.name,
      // address: this.hero.addresses[0] || new Address()
    });

    this.setAddress(this.hero.addresses);
  }

  private createForm() {
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      secretLairs: this.formBuilder.array([]),
      power: '',
      sidekick: ''
    })
  }

  private setAddress(address: Address[]) {
    const addressFGs = address.map(address => this.formBuilder.group(address));
    const addressFormArray = this.formBuilder.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  private addLair() {
    this.secretLairs.push(this.formBuilder.group(new Address()));
  }

  private removeLair() {
    this.secretLairs.removeAt(this.secretLairs.length - 1);
    this.hero = this.prepareSaveHero();
  }

  private logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach((value: string) => this.nameChangeLog.push(value));
  }

  public onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe();
    this.reBuildForm();
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  private prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    )

    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      addresses: secretLairsDeepCopy
    }

    return saveHero;
  }

  private revert() {
    this.reBuildForm();
  }
}
