import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PhrasalVerb } from '../interfaces/phrasal-verb.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhrasalVerbsService {

  private baseUrl = 'http://localhost:3000/api/phrasal-verbs';
  constructor(private http: HttpClient) { }

  getAllPhrasalVerbs(): Observable<PhrasalVerb[]> {
    return this.http.get<PhrasalVerb[]>(this.baseUrl);
  }

  getPhrasalVerbById(phrasalVerbId: string, definitionId: string): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${phrasalVerbId}/definition/${definitionId}`;
    return this.http.get<PhrasalVerb>(url);
  }

  addPhrasalVerb(phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    return this.http.post<PhrasalVerb>(this.baseUrl, phrasalVerb);
  }

  updatePhrasalVerb(phrasalVerbId: string, definitionId: string, phrasalVerb: PhrasalVerb): Observable<PhrasalVerb> {
    const url = `${this.baseUrl}/${phrasalVerbId}/definition/${definitionId}`;
    return this.http.patch<PhrasalVerb>(url, phrasalVerb);
  }

  deletePhrasalVerb(phrasalVerbId: string, definitionId: string): Observable<void> {
    const url = `${this.baseUrl}/${phrasalVerbId}/definition/${definitionId}`;
    return this.http.delete<void>(url);
  }

}
