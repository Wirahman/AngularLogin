// Angular Library
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons } from "@clr/icons";
// import '@clr/icons';
// import '@clr/icons/shapes/essential-shapes';

// Component Library
import { PenggunaModule } from '../model/pengguna.module';
import { PenggunaService } from '../service/pengguna.service';

@Component({
  selector: 'app-create-pengguna',
  templateUrl: './create-pengguna.component.html',
  styleUrls: ['./create-pengguna.component.css']
})
export class CreatePenggunaComponent implements OnInit {
  pengguna: PenggunaModule = new PenggunaModule();

  formPengguna = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    first_name: new FormControl('',Validators.required,),
    last_name: new FormControl('',Validators.required,),
    avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });
  
  buttonSave = true;
  
  get email() {
    return this.formPengguna.controls['email'];
  }

  get first_name() {
    return this.formPengguna.controls['first_name'];
  }

  get last_name() {
    return this.formPengguna.controls['last_name'];
  }

  get avatar() {
    return this.formPengguna.controls['avatar'];
  }

  constructor(
    private router: Router,
    private penggunaService: PenggunaService,
    private formBuilder: FormBuilder,
    
  ) { }

  ngOnInit(): void {

  }

  onCreatePengguna() {
    // console.log("On Create Pengguna");
    // console.log(this.pengguna);
    this.penggunaService.createPenggunaBaru(this.pengguna).subscribe(
      (data: any) => {
         console.log(data);
         this.router.navigate(['/Pengguna']);
      }
    );
    console.log('ok');
  }

  periksaAlert(event: any): void{
    console.log("Periksa alert");
    console.log('this.formPengguna = ' + this.formPengguna.invalid);
    if(this.formPengguna.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Pengguna']);
  }

}
