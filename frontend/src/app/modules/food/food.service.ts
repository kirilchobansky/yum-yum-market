import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from 'src/app/core/constans/urls';
import { Food, Tag } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodBySearch(search: string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + search);  
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);  
  }

  getAllFoodsByTag(tag: string): Observable<Food[]>{
    return tag == 'All' 
    ? this.getAll()
    : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(id: string): Observable<Food>{
      return this.http.get<Food>(FOODS_BY_ID_URL + id);
  }
}
