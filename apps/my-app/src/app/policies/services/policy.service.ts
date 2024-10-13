import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PolicyInterface } from '../types/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  getPolicies(): Observable<PolicyInterface[]> {
    const posts = [
      { id: '1', title: 'First policy' },
      { id: '2', title: 'Second policy' },
      { id: '3', title: 'Third policy' },
    ];
    return of(posts).pipe(delay(2000));
  }
}
