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
  private userId = this.tokenService.decodedToken.jti;

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
    console.log('decoded token:',this.tokenService.decodedToken);
    return this.http.get(`http://localhost:8080/Avatars/GetByUserId?userId=${this.userId}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUserById() {
    console.log(this.userId);
    return this.http.get(`http://localhost:8080/Users/${this.userId}`);
  }

  getUserByUsername() {
    return this.http.get(`http://localhost:8080/Users/${this.userId}`);
  }

  getUserInterests() {
    return this.http.get(`http://localhost:8080/Users/${this.userId}/Interests`);
  }

  linkUserInterest(interest: InterestDto) {
    return this.http.post(`http://localhost:8080/Users/${this.userId}/Interests`, interest);
  }

  unlinkUserInterest(interest: InterestDto) {
    return this.http.delete(`http://localhost:8080/Users/${this.userId}/Interests?name=${interest.name}`);
  }
}