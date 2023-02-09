import { Component, OnInit} from '@angular/core';
import { INote } from './interface';
import { Note } from './note';

const uniqueId = (length=16) => {
  return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swiftNotes';
  noteData: INote = new Note();
  isShowNote: boolean = false;
  notesList: INote[] = [];
  originalData: INote[] = [];
  constructor() {
    const data = [{
      id: uniqueId(),
      title: "title one",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in lorem sit amet felis aliquam facilisis. Curabitur sapien mauris, feugiat sit amet quam vel, blandit sodales arcu. Phasellus vestibulum, mi id molestie viverra, nulla augue sodales erat, ac laoreet dolor nibh vel ipsum."
    }];
    localStorage.setItem('notelist', JSON.stringify(data));
  }

  ngOnInit() {
    let data: any = localStorage.getItem('notelist');
    this.notesList = JSON.parse(data);
    this.originalData = JSON.parse(data);
  }

  noteDatafn(event: INote ) {
   if(event.id == 0) {
    event.id = uniqueId();
    this.notesList.push(event);
   } else {
    this.notesList.forEach(ele => {
      if(ele.id == event.id) {
        ele = event;
      }
    })
   }
   localStorage.setItem('notelist', JSON.stringify(this.notesList));
   this.originalData = [...this.notesList];
   this.notesList = [...this.notesList];
  }

  onEdit(data: INote) {
    this.isShowNote = true;
    this.noteData = data;
  }

  closeEvent(event: boolean) {
    this.isShowNote = event;
    this.noteData = new Note();
  }

  onDelete(data: INote) {
    const index = this.notesList.map(function(x) {return x.id; }).indexOf(data.id);
    this.notesList.splice(index, 1);
    this.originalData = [...this.notesList];
    this.notesList = [...this.notesList];
    localStorage.setItem('notelist', JSON.stringify(this.notesList));
  }

  onSearch(event: any) {
    let searchVal = event.target.value;
    if(event.target.value != '') {
      const filterData  = this.notesList.filter((ele: INote) => { return ele.title.indexOf(searchVal) > -1});
      this.notesList = filterData;
    } else {
      this.notesList = [...this.originalData]
    }
  }

  clear() {
    this.notesList = [...this.originalData]
  }
}
