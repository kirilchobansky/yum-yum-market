import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'It is required',
  email: 'Email is not valid',
  minlength: 'Too short',
  notMatch: 'Password does not match'
}
@Component({
  selector: 'input-validations',
  templateUrl: './input-validations.component.html',
  styleUrls: ['./input-validations.component.css']
})
export class InputValidationsComponent implements OnInit, OnChanges{
  
  @Input()
  control!: AbstractControl;
  
  @Input()
  showErrors: boolean = true;
  
  errorMessages: string[] = [];
  
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.chechValidation();
    })
    this.control.valueChanges.subscribe(() => {
      this.chechValidation();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chechValidation();
  }

  chechValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATOR_MESSAGES[key]);
  }
}
