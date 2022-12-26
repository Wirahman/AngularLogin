// Angular Library
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-pengguna',
  templateUrl: './update-pengguna.component.html',
  styleUrls: ['./update-pengguna.component.css']
})
export class UpdatePenggunaComponent implements OnInit {
  id: any;
  private sub: any;
  pengguna: PenggunaModule = new PenggunaModule();
  buttonSave = false;
  
  formPengguna = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    first_name: new FormControl('',Validators.required,),
    last_name: new FormControl('',Validators.required,),
    avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });
  
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
    private route: ActivatedRoute,
    private router: Router,
    private penggunaService: PenggunaService,
    private formBuilder: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   console.log("ID = " + this.id);
   console.log("Sub = " + this.sub);
   this.getDaftarPenggunaById(this.id);
  }

  getDaftarPenggunaById(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.penggunaService.getDaftarPenggunaById(id).subscribe(
      (data: any) => {
        console.log("Get Pengguna By ID");
        console.log("data");
        console.log(data);
        console.log("json");
        console.log(JSON.stringify(data));
        this.pengguna = data;
        console.log("Pengguna");
        console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }

  onUpdatePengguna() {
    console.log("On Update Pengguna");
    console.log(this.pengguna);
    this.penggunaService.updatePengguna(this.pengguna.id, this.pengguna).subscribe(
      (data: any) => {
         console.log(data);
         // console.log(JSON.stringify(data['Pengguna']['email']));

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
