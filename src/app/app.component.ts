import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) {}

  title = 'bookfinda';
  book: Object | undefined;
  error: any;
  isbn = new FormControl('');

  getBook() {
    if (!this.isbn.value) {
      return alert('Oops.. No ISBN number entered')
    }
    this.book = undefined;
    this.error = undefined;
    
    if (localStorage.getItem(this.isbn.value)) {
      this.book = JSON.parse(localStorage.getItem(this.isbn.value));
    } else {
      this.apiService.getBook(this.isbn.value).subscribe((res)=> {
        this.book = res;
        localStorage.setItem(this.isbn.value, JSON.stringify(res));
      }, (err) => {
        this.error = err;
      });
    }
  }

  trimText(str: { split: (arg0: string) => Array<string>; }) {
    const strArr = str.split(' ');
	  return strArr.length > 10 
	  ? `${strArr.slice(0, 10).join(' ')}…`
	  : str;
  }

  close() {
    this.book = undefined;
    this.error = undefined;
    this.isbn.setValue('');
  }
}
