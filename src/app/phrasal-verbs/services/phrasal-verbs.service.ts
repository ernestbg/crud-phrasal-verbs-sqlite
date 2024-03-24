import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class PhrasalVerbsService {

  private baseUrl = 'http://localhost:3000/api/phrasal-verbs'; // Ajusta la URL según corresponda

  constructor(private http: HttpClient) { }


  getAllPhrasalVerbs(): Observable<{ phrasalVerbs: PhrasalVerb[], total: number }> {
    return this.http.get<{ phrasalVerbs: PhrasalVerb[], total: number }>(this.baseUrl);
  }


  getPhrasalVerbById(id: string): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PhrasalVerb>(url);
  }


  addPhrasalVerb(phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    return this.http.post<PhrasalVerb>(this.baseUrl, phrasalVerb);
  }


  updatePhrasalVerb(id: string, phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<PhrasalVerb>(url, phrasalVerb);
  }

  deletePhrasalVerb(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
