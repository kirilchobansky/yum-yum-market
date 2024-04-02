import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent {

  @Input()
  type: 'submit' | 'button' = 'submit';

  @Input()
  text: string = 'submit';

  @Input()
  bgColor = '#eb6f50';

  @Input()
  fontSizeRem = 1.3;

  @Input()
  widthRem = 12;

  @Input()
  heightRem = 3.5;

  @Output()
  onClick= new EventEmitter();
}
