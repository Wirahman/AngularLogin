import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PenggunaService } from '../pengguna/service/pengguna.service';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  show = false;
  id: any;
  judulModal: any;
  bodyMessage: any;
  statusButton: boolean | undefined;
  gambarModal: any;
  statusGambar: boolean | undefined;
  jenisFunction: any;

  constructor(
    private penggunaService: PenggunaService,
    private _snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    
  }

  open(id:any, judulModal: any, bodyMessage: any, gambarModal: any, statusButton: boolean, statusGambar: boolean, jenisFunction: any) {
    this.id = id;
    this.judulModal = judulModal;
    this.bodyMessage = bodyMessage;
    this.gambarModal = gambarModal;
    this.statusButton = statusButton;
    this.statusGambar = statusGambar;
    this.statusButton = statusButton;
    this.jenisFunction = jenisFunction;

    this.show = true;
  }

  close() {
    this.show = false;
  }
  
  functionHapus(jenisFunction: any, id:any){
    if(jenisFunction == 'pengguna'){
      this.hapusPengguna(id);
    }else{

    }
  }

  hapusPengguna(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.penggunaService.hapusPengguna(id).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.close();
        this.pesanSnackBar('Data dengan ID ' + id + " sudah dihapus");
      },(error: any) => console.log(error)
    );
  }

  pesanSnackBar(pesan: any){
    this._snackBar.open(pesan, '', {
      duration: 3000
    });
  }





}
