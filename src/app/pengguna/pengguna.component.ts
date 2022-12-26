// Angular Library
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, plusIcon, pencilIcon, trashIcon } from '@cds/core/icon';

// Component Library
import { AppComponent } from '../app.component';
import { PopupComponent } from '../popup/popup.component';
import { PenggunaModule } from './model/pengguna.module';
import { PenggunaService } from './service/pengguna.service';

import { ModalsComponent } from '../modals/modals.component';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.css']
})
export class PenggunaComponent implements OnInit, AfterViewInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  
  pengguna: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  
  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman'
  ]
  closeResult: string | undefined;
  
  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private penggunaService: PenggunaService,
    private _snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Pengguna';
    this.getSemuaPengguna();
    ClarityIcons.addIcons(plusIcon, pencilIcon, trashIcon);
  }
  
  public ngAfterViewInit(): void {
    if(this.popupComponent == undefined){
      console.log('Pop Up Component Undefined');
    }
    // this.popupComponent!.passEntry.subscribe(() => {
    //   this.popupComponent.close();
    // });
    if(this.modal == undefined){
      console.log('Modal Component Undefined');
    }
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getSemuaPengguna();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`offset`] = page;
    }

    if (pageSize) {
      params[`limit`] = pageSize;
    }

    return params;
  }

  getSemuaPengguna() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.penggunaService.getAll(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.pengguna = data.data;
        this.count = data.total;
        console.log("Pengguna");
        console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }

  // Navigate
  tambahPengguna(){
    this.router.navigate(['/CreatePengguna']);
  }
  
  updatePengguna(id: any){
    this.router.navigate(['/UpdatePengguna/'+id]);
  }  
  
  detailPengguna(id: any,nama_pengguna: any, password: any, nama_lengkap: any, kota: any, status: any){
    const judulModal = 'Detail Pengguna ' + nama_pengguna;
    const bodyMessage = 'Nama Pengguna = ' + nama_pengguna + '\Password = ' + password + 
    '\nNama Lengkap = ' + nama_lengkap + '\nKota = ' + kota + '\nStatus = ' + status;
    const gambar = '';
    const statusButton = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusGambar, jenisFunction);
  }

  hapusPengguna(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.penggunaService.hapusPengguna(id).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.pesanSnackBar('Data dengan ID ' + id + " sudah dihapus");
        this.ngOnInit();
      },(error: any) => console.log(error)
    );
  }

  pesanSnackBar(pesan: any){
    this._snackBar.open(pesan, '', {
      duration: 3000
    });
  }

  popupHapusPengguna(id: any){
    const judulModal = 'Hapus Pengguna';
    const bodyMessage = 'Apakah Anda yakin menghapus data dengan id ' + id + '?';
    const gambar = '';
    const statusButton = false;
    const statusGambar = true;
    const jenisFunction = 'pengguna';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusGambar, jenisFunction);
    
  }

  // popupHapusPengguna1(id: any){
  //   const judulModal = 'Hapus Pengguna';
  //   const bodyMessage = 'Apakah Anda yakin menghapus data dengan id ' + id + '?';
  //   const statusButton = false;

  //   const modalRef = this.modalService.open(PopupComponent);
  //   modalRef.componentInstance.judulModal = judulModal;
  //   modalRef.componentInstance.bodyMessage = bodyMessage;
  //   modalRef.componentInstance.statusButton = statusButton;

  //   const button = document.getElementById('btnDelete');
  //   this.renderer.listen(button, 'click', () => {this.hapusPengguna(id)});

  //   modalRef.result.then((result) => {
  //     if (result) {
  //       console.log(result);
  //     }
  //   });
  // }






}
