import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private baseUrl = 'http://localhost:4500/goal';

  constructor(private http: HttpClient) {}

  getGoalsByInterest(interestId: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.baseUrl}/interest/${interestId}`);
  }

  deleteGoal(goalId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${goalId}`);
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.baseUrl, goal);
  }
}
export interface Goal {
    id?: number;
    title: string;
    description: string;
    interest_id: number;
  }
  