import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import * as firebase  from 'firebase/app'; 
import 'firebase/firestore';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  myForm: FormGroup;
  message: string= "";
  userError: any;

  
  constructor(public fb : FormBuilder, public authService: AuthService, public router: Router) {  
    
    this.myForm = this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : ['',[Validators.required]],
      password : ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword : ['',[Validators.required]]
    },{
      validator : this.matchPasswords("password","confirmPassword")
    })
  }

  matchPasswords(passKey : string, confirmPassKey : string){
    return(group : FormGroup) => {
      let password = group.controls[passKey];
      let confirmPassword = group.controls[confirmPassKey];

      if(password.value == confirmPassword.value){
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword : true
        })
      }
    } 

  }
  
  whenSubmit(signupform){
    let email:     string = signupform.value.email;
    let password:  string = signupform.value.password ;
    let firstName: string = signupform.value.firstName;
    let lastName:  string = signupform.value.lastName;


    this.authService.signup(email, password, firstName, lastName).then((user: any) => {

      firebase.firestore().collection('users').doc(user.uid).set({
        firstName: signupform.value.firstName,
        lastName: signupform.value.lastName,
        email: signupform.value.email,
        photoURL: user.photoURL,
        interests: "",
        bio: "",
        hobbies: "",
      }).then(() =>{
        this.message = "You have been signed up successfully. Please login."
        this.userError = null;
        this.router.navigate(['/myblogs'])
      })
       
    }).catch((error) => {
      console.log(error);
      this.userError = error;
    })
  }

  ngOnInit(): void {
  }

}
