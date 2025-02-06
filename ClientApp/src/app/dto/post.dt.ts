export interface AddPostReturnDto {
    id: string;
    contentId: string;
    likes: LikeDto[];
    commentsId: string;
}

export interface PostDto {
    id: string;
    image: string;
    likes: LikeDto[];
    commentsId: string;
}

export interface ReturnPostDto {
    id: string;
    contentId: string;
    likes: LikeDto[];
    commentsId: string;
}
  
export interface LikeDto {
    id: string;
    postId: string;
    userId: string;
}