import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserData } from './user-data.model';

interface UserDataResponse {
  id: string;
  coinName: string;
  coinId: string;
  boughtDate: Date;
  bought: number;
  amount: number;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  dataChanged = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  saveUsersData(userData: UserData) {
    return this.http.post<UserDataResponse>(
      'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
        userData.id +
        '.json',
      userData.coin
    );
  }
  getUserData(id: string) {
    return this.http
      .get<UserDataResponse>(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
          id +
          '.json'
      )
      .pipe(
        map((responseData) => {
          const newArray: UserDataResponse[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              newArray.push({ ...responseData[key], id: key });
            }
          }
          return newArray;
        })
      );
  }
  deleteData(userId: string, id: string) {
    return this.http.delete(
      'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
        userId +
        '/' +
        id +
        '.json'
    );
  }
}
