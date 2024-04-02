import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from './comments.service';
import { Comment } from 'src/app/core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
    commentForm!: FormGroup;
    isSubmitted = false;
    returnUrl = '';
    foodId!: string;
    comments: Comment[] = [];
    showAllComments: boolean = false;
    userId = '';
    isEditing = false;
    editingCommentId: string | null = null;
    showOptions: boolean = false;
    commentOptionsVisibility: { [commentId: string]: boolean } = {};

    commentControl!: FormControl;

    constructor(
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private commentsService: CommentsService,
      private router: Router,
      private toastrService: ToastrService){}

    @ViewChild('editableComment') editableComment!: ElementRef;
    
    ngOnInit(): void {
      this.commentForm = this.formBuilder.group({
        comment: ['', Validators.required]
      });

      this.activatedRoute.params.subscribe(params => {
        this.foodId = params['id']; 
        this.getLatestThreeCommentsByFood();
        this.getUserId();
      });

      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
      this.commentControl = this.commentForm.get('comment') as FormControl;
    }

    get fc(){
      return this.commentForm.controls;
    }

    getUserId(): void {
      const userJson = localStorage.getItem('User');
      if (userJson) {
        const user = JSON.parse(userJson);
        this.userId = user.id;
      }
    }

    getAllCommentByFood(): void {
      this.commentsService.getAllCommentsByFood(this.foodId)
        .subscribe(comments => {
          this.comments = comments;
      });
    }

    getLatestThreeCommentsByFood(): void {
      this.commentsService.getLatestThreeCommentsByFood(this.foodId)
        .subscribe(comments => {
          this.comments = comments;
      });
    }

    toggleCommentsVisibility() {
      this.showAllComments = !this.showAllComments;
      if (this.showAllComments) {
        this.getAllCommentByFood();
    } else {
        this.getLatestThreeCommentsByFood();
    }}

    toggleOptions(commentId: string) {
      this.commentOptionsVisibility[commentId] = !this.commentOptionsVisibility[commentId];
    }

    startEditing(commentId: string) {
      this.isEditing = true;
      this.editingCommentId = commentId;
      setTimeout(() => {
        this.editableComment.nativeElement.focus();
        this.moveCursorToEnd();
      });
    }

    moveCursorToEnd() {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(this.editableComment.nativeElement);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }

    saveEditedComment(commentId: string, comment: string) {
      this.commentsService.editComment(commentId, comment).subscribe((response) => {
        this.toastrService.success(response);
        this.commentOptionsVisibility[commentId] = false;
        this.getLatestThreeCommentsByFood();
      })
      this.isEditing = false;
    }

    cancelEditing(commentId: string) {
      this.isEditing = false;
      this.commentOptionsVisibility[commentId] = false;
    }

    delete(commentId: string){
      this.commentsService.deleteComment(commentId, this.userId, this.foodId).subscribe((response) => {
        this.toastrService.success(response);
        this.getLatestThreeCommentsByFood();
      });
    }

    submit(){
      this.isSubmitted = true;
      if(!this.commentForm.valid) {
          return;
      }
      
      this.commentsService.postComment(this.foodId, this.fc.comment.value).subscribe(() => {
        this.router.navigate([...this.returnUrl]);
    });
  }
}
