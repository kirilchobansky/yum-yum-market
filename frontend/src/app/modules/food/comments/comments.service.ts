import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COMMENTS_ALL_BY_FOOD_URL, COMMENTS_LATEST_BY_FOOD_URL, COMMENTS_URL } from 'src/app/core/constans/urls';
import { Comment } from 'src/app/core/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  postComment(foodId: string, comment: string){
    const userJson = localStorage.getItem('User');
    let userId = '';

    if (userJson) {
      const user = JSON.parse(userJson);
      userId = user.id;
    }

    return this.http.post<Comment>(`${COMMENTS_URL}/${foodId}`, { comment, userId });
  }

  getAllCommentsByFood(foodId: string){
    return this.http.get<Comment[]>(COMMENTS_ALL_BY_FOOD_URL + foodId);
  };

  getLatestThreeCommentsByFood(foodId: string){
    return this.http.get<Comment[]>(COMMENTS_LATEST_BY_FOOD_URL + foodId);
  }

  editComment(commentId: string, updatedComment: string): Observable<string> {
    return this.http.put<string>(COMMENTS_URL + '/' + commentId, { comment: updatedComment });
  }

  deleteComment(commentId: string, userId: string, foodId: string): Observable<string> {
    const params = new HttpParams()
    .set('userId', userId)
    .set('foodId', foodId);
    return this.http.delete<string>(COMMENTS_URL + '/' + commentId, { params });
  }
}
