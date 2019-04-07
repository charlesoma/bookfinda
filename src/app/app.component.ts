import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookfinda';
  book: Object;
  value: string;
  error: any;
  constructor(private apiService: ApiService) {}

  onKey(event: { target: { value: string; }; }) {
    this.value = event.target.value;
  }

  getBook() {
    this.book = undefined;
    this.error = undefined;

    if (localStorage.getItem(this.value)) {
      this.book = JSON.parse(localStorage.getItem(this.value));
    } else {
      this.apiService.getBook(this.value).subscribe((res)=> {
        this.book = res;
        localStorage.setItem(this.value, JSON.stringify(res));
      }, (err) => {
        this.error = err;
      });
    }
  }

  trimText(str: { split: (arg0: string) => Array<string>; }) {
    let strArr = str.split(" ");
    if(strArr.length > 10){
     strArr = strArr.slice(0, 10);
     return strArr.join(" ") + "…";
    }
    return str;
  }
}
