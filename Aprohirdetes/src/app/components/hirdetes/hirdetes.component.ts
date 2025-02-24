import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import moment, { Moment } from 'moment';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import {MatSnackBar} from '@angular/material/snack-bar';
//import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-hirdetes',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDatepickerModule,
    FooterComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './hirdetes.component.html',
  styleUrl: './hirdetes.component.scss',
})
export class HirdetesComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private message: MessageService,
    private _snackBar: MatSnackBar
  ) {}

  hirdetesek: any = [];
  messages:any[]= [];


  panelOpenState = false;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  imgMessage: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  advertisement:any={
    title:"",
    category:"",
    description:"",
    price:"",
    image:"",
    date: moment().format('YYYY-MM-DD'),
    userId: null

  };

  ngOnInit(): void {
    this.getAllAds();
  }

  getAllAds() {
    this.api.selectAll('ads').subscribe((res: any) => {
      this.hirdetesek = res.results;
      console.log(res.results);
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
 
    if (file) {
      this.selectedFiles = event.target.files;
     
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.advertisement.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadAd() {
    const formData: FormData = new FormData();
    if (this.selectedFiles) {
     
      const file: File | null = this.selectedFiles[0];
      if (file) {
        console.log('>>>>', file)
        formData.append('file', file);
      }
    }

    formData.append('title', this.advertisement.title);
    formData.append('category', this.advertisement.category);
    formData.append('description', this.advertisement.description);
    formData.append('price', this.advertisement.price.toString());
    formData.append('date', this.advertisement.date);
    formData.append('userId', this.auth.getLoggedInUser().id);

   
    this.saveAd(formData);
  }

  saveAd(formData: FormData) {
    this.api.insert('ads', formData).subscribe((res: any) => {
      console.log(formData);
      // Refresh the advertisement list after successful upload
      this.getAllAds();
    });
  }

  deleteAd(id:string){
    const result = window.confirm("Biztosan törölni szeretnéd ezt a hirdetést?");
    
    if (result) {
      this.api.delete('ads', id).subscribe((res: any)=>{
        console.log(res);
        this.messages=res;
        this.getAllAds();
      })
    } else {
      // Ha a Cancel gombot nyomták meg (false)
      console.log("A hirdetés nem lett törölve");
    }
  }
}