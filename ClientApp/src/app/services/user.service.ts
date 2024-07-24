import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestDto, UpdateUserDto } from '../dto/user.dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  private get userId() { return this.tokenService.decodedToken.jti }

  updateUser(dto: UpdateUserDto) {
    let data = new FormData();
    data.append('id', this.userId!);
    data.append('firstname', dto.firstname!);
    data.append('lastname', dto.lastname!);
    data.append('username', dto.username!);
    data.append('bio', dto.bio!);
    data.append('file', dto.file!);
    return this.http.put('http://localhost:8080/Users', data);
  };

  getUserAvatar() : Observable<string> {
    console.log('decoded token: dddd',this.tokenService.decodedToken);
    console.log('token: dddd',this.tokenService.token);
    return this.http.get(`http://localhost:8080/Avatars/GetByUserId?userId=${this.userId}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUserAvatarById(id: string) : Observable<string> {
    return this.http.get(`http://localhost:8080/Avatars/GetByUserId?userId=${id}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUser() {
    console.log(this.userId);
    return this.http.get(`http://localhost:8080/Users/${this.userId}`);
  }

  getUserById(id: string) {
    console.log('user id: ', id);
    return this.http.get(`http://localhost:8080/Users/${id}`);
  }

  getUserInterests() {
    console.log(`get user interests id: ${this.userId}`);
    return this.http.get(`http://localhost:8080/Users/${this.userId}/Interests`);
  }

  getUserInterestsById(id: string) {
    return this.http.get(`http://localhost:8080/Users/${id}/Interests`);
  }

  linkUserInterest(interest: InterestDto) {
    return this.http.post(`http://localhost:8080/Users/${this.userId}/Interests`, interest);
  }

  unlinkUserInterest(interest: InterestDto) {
    return this.http.delete(`http://localhost:8080/Users/${this.userId}/Interests?name=${interest.name}`);
  }
}