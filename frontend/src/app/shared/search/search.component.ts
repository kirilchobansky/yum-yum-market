import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchedText: string = '';
    @Input()
    type!: 'orders' | 'foods';

    constructor(activatedRoute: ActivatedRoute, private router: Router){
        activatedRoute.params.subscribe(params => {
          if(params['search']) {
            this.searchedText = params['search'];
          }
        })
    }

    search(search: string){
      if(search){
        this.router.navigate([this.type, 'search', search]);
      }else{
        this.router.navigate([this.type, 'dashboard']);
      }
    }
}
