import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService{
    constructor(private http: HttpClient, private tokenService: TokenService) { }
    private get userId() { return this.tokenService.decodedToken.jti }

    recommend(index: number) {
        return this.http.get(`http://localhost:8080/Recommendations?userId=${this.userId}&index=${index}`);
    }
}