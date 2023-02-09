import { DOCUMENT } from '@angular/common';
import { Component, Output, EventEmitter, Input, Inject} from '@angular/core';
import {INote} from './../interface';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  isShowNote: boolean = false;
  noteData: INote = {
    id: 0,
    title: '',
    content: ''
  }
  @Input() set ShowNote(data:  boolean) {
    if(data) {
      this.document.body.classList.add('overflow-hidden');
    }
    this.isShowNote = data;
  }

  @Input() set setNoteData(data: INote) {
    this.noteData = data;
  };

  @Output() noteDetail = new EventEmitter<INote>();
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  onSubmit() {
    if(this.noteData.title != '' && this.noteData.content != '') {
      this.noteDetail.emit(this.noteData);
      this.toggleNote()
    }
  }

  toggleNote() {
    this.isShowNote = false;
    this.closeEvent.emit(false);
    this.document.body.classList.remove('overflow-hidden');
  }
}
