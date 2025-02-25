import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddPostReturnDto, PostDto, ReturnPostDto } from '../../dto/post.dt';
import { TokenService } from "./token.service";
import { catchError, forkJoin, map, Observable, of, switchMap } from "rxjs";
import { FileService } from "./file.service";

@Injectable({
  providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient, 
        private tokenService: TokenService,
        private fileService: FileService
    ) {}

    public addPost(file: any): Observable<PostDto> {
        const userId = this.tokenService.decodedToken.jti!;
        let data = new FormData();
        data.append('userId', userId);
        data.append('file', file);
        console.log('file:', file)
        return this.http.post<AddPostReturnDto>(`http://localhost:8080/Posts`, data)
        .pipe(
            switchMap(post => 
              this.fileService.getFile(post.contentId).pipe(
                map(imageSrc => ({
                  id: post.id,
                  image: imageSrc, 
                  likes: post.likes,
                  commentsId: post.commentsId
                } as PostDto))
              )
            )
          );
    }

    public deletePost(postId: string) {
        return this.http.delete(`http://localhost:8080/Posts/${postId}`);
    }

    public getPosts() : Observable<PostDto[]> {
      var userId = this.tokenService.decodedToken.jti;
      return this.http.get<ReturnPostDto[]>(`http://localhost:8080/Posts?userId=${userId}`)
      .pipe(
        switchMap(posts => 
          forkJoin(
            posts.map(post => 
              this.fileService.getFile(post.contentId).pipe(
                map(imageSrc => ({
                  id: post.id,
                  image: imageSrc, 
                  likes: post.likes,
                  commentsId: post.commentsId
                } as PostDto))
              )
            )
          )
        )
      );
    }

    public getPostsByUserId(userId: string) : Observable<PostDto[]> {
      return this.http.get<ReturnPostDto[]>(`http://localhost:8080/Posts?userId=${userId}`)
      .pipe(
        switchMap(posts => 
          forkJoin(
            posts.map(post => 
              this.fileService.getFile(post.contentId).pipe(
                map(imageSrc => ({
                  id: post.id,
                  image: imageSrc, 
                  likes: post.likes,
                  commentsId: post.commentsId
                } as PostDto))
              )
            )
          )
        )
      );
    }

    public likePost(postId: string) {
      var userId = this.tokenService.decodedToken.jti;
      
      return this.http.post<string>(`http://localhost:8080/Posts/${postId}/Like`, JSON.stringify(userId), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    public unlikePost(postId: string) {
      var userId = this.tokenService.decodedToken.jti;
      return this.http.delete<string>(`http://localhost:8080/Posts/${postId}/Like?userId=${userId}`);
    }

    public isLiked(postId: string): Observable<boolean> {
      const userId = this.tokenService.decodedToken.jti;
      return this.http.get(`http://localhost:8080/Posts/${postId}/Like?userId=${userId}`)
        .pipe(
          map(_ => true),
          catchError(async _ => false)
        );
    }
}