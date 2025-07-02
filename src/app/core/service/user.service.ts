import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl="http://localhost:8085/v1/api/user";
  constructor(private http:HttpClient) { }

  findAll():Observable<user[]>{
    return this.http.get<user[]>(`${this.apiUrl}`)
  }

  findByStatus(status:boolean):Observable<user[]>{
    return this.http.get<user[]>(`${this.apiUrl}/status/${status}`)
  }

  findById(id:number):Observable<user[]>{
    return this.http.get<user[]>(`${this.apiUrl}/${id}`)
  }

  save(user:user):Observable<user>{
    return this.http.post<user>(`${this.apiUrl}/save`,user)
  }

  update(user:user):Observable<user>{
    return this.http.put<user>(`${this.apiUrl}/update`,user)
  }

  delete(id:number):Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/delete`,{})
  }

  restore(id:number):Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${id}/restore`,{})
  }
}
