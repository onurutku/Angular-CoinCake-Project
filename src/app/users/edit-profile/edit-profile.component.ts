import { Component, OnInit } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { EditProfileService } from './edit-profile.service';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  faCamera = faCamera;
  imageSrc: File = null;
  selectedFile: File = null;
  userLoggedIn: User;
  userPersonalInfo: FormGroup;
  isDisabled: string = null;
  isSubmit: boolean = null;
  constructor(
    private editProfileService: EditProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.userLoggedIn = data;
    });
    this.userPersonalInfo = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      surName: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      about: new FormControl(null, Validators.required),
    });
  }
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = <File>e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSubmit() {
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    const userInformation = {
      name: this.userPersonalInfo.get('firstName').value,
      surname: this.userPersonalInfo.get('surName').value,
      birthday: this.userPersonalInfo.get('birthDate').value,
      gender: this.userPersonalInfo.get('gender').value,
      about: this.userPersonalInfo.get('about').value,
    };
    this.editProfileService.upload(
      this.userLoggedIn,
      userInformation,
      this.selectedFile
    );
    this.editProfileService.isSubmitted.subscribe((isSubmitted) => {
      if (isSubmitted) {
        this.isSubmit = isSubmitted;
        this.isDisabled = 'disabled';
        this.selectedFile = null;
        this.helperTimer(3000);
      }
    });
  }
  onEdit() {
    this.isDisabled = null;
  }
  helperTimer(time: number) {
    setTimeout(() => {
      this.isSubmit = null;
    }, time);
  }
}
