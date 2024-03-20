import { Component, Input } from '@angular/core';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {

    @Input()
    visible = false;

    @Input()
    notFoundMessage = 'Nothing Found!';

    @Input()
    resetLinkText = 'Reset';

    @Input()
    resetLinkRoute = '/foods/dashboard';

}
