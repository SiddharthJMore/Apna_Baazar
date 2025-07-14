import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { MailRequest } from '../classes/mail-request';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${this.baseURL}/allProducts`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProduct(id: number){
    return this.http.get<any>(`${this.baseURL}/getProduct/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/delProduct/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.baseURL}/updateProduct`, product).subscribe();
  }

  sendEmail(mailRequest: MailRequest){
    return this.http.post(`${this.baseURL}/sendEmail`, mailRequest);
  }

  sendOTPEmail(email: String){
    return this.http.post(`${this.baseURL}/sendOTPEmail`, email);
  }
}
