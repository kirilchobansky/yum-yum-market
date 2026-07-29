import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: false
})
export class SearchComponent implements OnDestroy {
    searchedText: string = '';
    @Input()
    type!: 'orders' | 'foods';

    private searchInput = new Subject<string>();
    private searchInputSubscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private router: Router){
        activatedRoute.queryParams.subscribe(queryParams => {
          this.searchedText = queryParams['search'] || '';
        })

        this.searchInputSubscription = this.searchInput
          .pipe(debounceTime(300), distinctUntilChanged())
          .subscribe((search) => this.search(search));
    }

    ngOnDestroy(): void {
      this.searchInputSubscription.unsubscribe();
    }

    onInput(search: string){
      this.searchInput.next(search);
    }

    search(search: string){
      // Same route, query-param only navigation: the router reuses the
      // current component instance instead of destroying/recreating it,
      // so the search input never loses focus while typing.
      this.router.navigate([this.type, 'dashboard'], {
        queryParams: { search: search || null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
}
