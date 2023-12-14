import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailurl:string = environment.BACKEND_URL
  constructor(private http: HttpClient) { }

  sendEmail(name:string, email:string,message:string){
    const data = {
      name:name,
      email:email,
      message:message
    }
    return this.http.post(this.emailurl,data)
  }
}
