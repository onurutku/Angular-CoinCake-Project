import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient, private store: AngularFireStorage) {}
  upload(userLoggedIn: User, selectedFile: File, userInformation: any) {
    const filePath = `images/${selectedFile.name}_${new Date().getTime()}`;
    const fileRef = this.store.ref(filePath);
    this.http
      .get(
        'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
          userLoggedIn.password +
          '/personalInfo/imagePath.json'
      )
      .subscribe(
        (data) => {
          if (data != null) {
            const deleteFileRef = this.store.refFromURL(data.toString());
            deleteFileRef.delete();
          }
          this.store
            .upload(filePath, selectedFile)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  const willSend = {
                    imagePath: url,
                    name: userInformation.name,
                    surname: userInformation.surname,
                    birthday: userInformation.birthday,
                    gender: userInformation.gender,
                    about: userInformation.about,
                  };
                  this.http
                    .patch(
                      'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
                        userLoggedIn.password +
                        '/personalInfo.json',
                      willSend
                    )
                    .subscribe(() => {});
                });
              })
            )
            .subscribe();
        },
        (error) => {
          console.log('hello madafaka');
        }
      );
  }
}
