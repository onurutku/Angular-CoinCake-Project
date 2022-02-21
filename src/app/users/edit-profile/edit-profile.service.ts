import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  isSubmitted = new Subject<boolean>();
  filePath: string = null;
  fileRef: any = null;
  constructor(private http: HttpClient, private store: AngularFireStorage) {}

  upload(userLoggedIn: User, userInformation: any, selectedFile?: File) {
    //pp seçildiyse
    if (selectedFile != null) {
      //1-resmi storage'a kaydet
      this.filePath = `images/${selectedFile.name}_${new Date().getTime()}`;
      this.fileRef = this.store.ref(this.filePath);
      //realtime'dan imagepath get etmeye ÇALIŞ
      this.http
        .get(
          'https://course-app-onur-default-rtdb.europe-west1.firebasedatabase.app/userData/' +
            userLoggedIn.password +
            '/personalInfo/imagePath.json'
        )
        .subscribe(
          (data) => {
            //Eğer imagepath varsa
            if (data != null || data != undefined) {
              const deleteFileRef = this.store.refFromURL(data.toString());
              deleteFileRef.delete();
            }

            this.store
              .upload(this.filePath, selectedFile)
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  this.fileRef.getDownloadURL().subscribe((url) => {
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
                      .subscribe(
                        () => {
                          this.isSubmitted.next(true);
                        },
                        (error) => {
                          this.isSubmitted.next(false);
                        }
                      );
                  });
                })
              )
              .subscribe();
          },
          (error) => {}
        );
    } else {
      const willSend = {
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
        .subscribe(
          () => {
            this.isSubmitted.next(true);
          },
          (error) => {
            this.isSubmitted.next(false);
          }
        );
    }
  }
}
