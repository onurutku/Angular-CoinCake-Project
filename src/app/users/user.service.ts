import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user = new Subject<any>();
  constructor(private http: HttpClient) {}
  // getAllUsersData() {
  //   return this.http
  //     .get(
  //       'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  //     )
  //     .pipe(
  //       map((responseData) => {
  //         const allUsers = [];
  //         for (let key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             allUsers.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return allUsers;
  //       })
  //     );
}
// getUserById(id: string) {
//   return this.http
//     .get(
//       'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/users/' +
//         id +
//         '.json'
//     )
//     .pipe(
//       map((responseData) => {
//         let userById: any;
//         for (let key in responseData) {
//           if (responseData.hasOwnProperty(key)) {
//             userById = responseData;
//           }
//         }
//         return userById;
//       })
//     );
// }
// }
