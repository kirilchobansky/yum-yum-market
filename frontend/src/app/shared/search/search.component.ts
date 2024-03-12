import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchedFood: string = '';
    constructor(activatedRoute: ActivatedRoute, private router: Router){
        activatedRoute.params.subscribe(params => {
          if(params['search']) {
            this.searchedFood = params['search'];
          }
        })
    }

    search(search: string){
      if(search){
        this.router.navigate(['foods', 'search', search]);
      }
    }
}
