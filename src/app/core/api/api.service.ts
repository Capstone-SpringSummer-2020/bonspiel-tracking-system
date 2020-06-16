import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const apiURL: string = environment.apiURL;
// const apiURL = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private eventIdSource = new BehaviorSubject(1);  // Default to event ID 1
  currentEventId = this.eventIdSource.asObservable();

  constructor(private httpClient: HttpClient) {
    console.log(`apiURL  ==>  ${apiURL}`);
  }

  changeEventId(newEventId: number) {
    this.eventIdSource.next(newEventId);
  }

  public createCurlingEvent(name, eventType, info, completed, beginDate, endDate) {
    const body = {
      name: name,
      eventType: eventType,
      info: info,
      completed: completed,
      beginDate: beginDate,
      endDate: endDate
    }
    return this.httpClient.post(`${apiURL}/api/v1/create-curling-event`, body);
  }

  /********************************************************************/

  public adHocQuery(query) {
    const body = {
      sql: query
    }
    return this.httpClient.post(`${apiURL}/api/v1/DANGEROUSADHOC`, body);
  }

  /********************************************************************/

  public getEvents() {
    return this.httpClient.get(`${apiURL}/api/v1/events`);
  }

  public getTeams(eventId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/teams`);
  }

  public getGames(eventId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/games`);
  }

  public getDraws(eventId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/draws`);
  }

  public getGamesByTeam(eventId, teamId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/teams/${teamId}/games`);
  }

  public getScoresByTeam(eventId, teamId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/teams/${teamId}/scores`);
  }

  public getScoresByEvent(eventId) {
    return this.httpClient.get(`${apiURL}/api/v1/events/${eventId}/scores`);
  }
}
