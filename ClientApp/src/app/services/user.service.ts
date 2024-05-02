import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestDto, UpdateUserDto } from '../dto/user.dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  private userId = "8e82ad0d-5e7d-46a8-a254-c7d7ccd7dcfa";

  updateUser(dto: UpdateUserDto) {
    let data = new FormData();
    data.append('id', dto.id);
    data.append('firstname', dto.firstname!);
    data.append('lastname', dto.lastname!);
    data.append('username', dto.username!);
    data.append('bio', dto.bio!);
    data.append('file', dto.file!);
    return this.http.put('http://localhost:8080/Users', data);
  };

  getUserAvatar() : Observable<string> {
    return this.http.get(`http://localhost:8080/Avatars/GetByUserId?userId=${this.userId}`, {responseType: 'blob'}).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  getUserById() {
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