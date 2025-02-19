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
    private message: MessageService
  ) {}

  hirdetesek: any = [];

  panelOpenState = false;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  imgMessage: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  advertisement: any = {
    title: '',
    category: '',
    description: '',
    price: '',
    image: '',
    date: moment().format('YYYY-MM-DD'),
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
  uploadAd() {
    console.log(this.advertisement);
  }
}
