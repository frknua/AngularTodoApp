import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = {
    pending: ['Get to work', 'Pick up groceries', 'Go home'],
    inProgress: ['Get up', 'Brush teeth', 'Take a shower'],
    done: ['Get up', 'Brush teeth', 'Take a shower'],
  };

  constructor(public _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setItems();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      localStorage.setItem('pending', JSON.stringify(this.data.pending));
      localStorage.setItem('inProgress', JSON.stringify(this.data.inProgress));
      localStorage.setItem('done', JSON.stringify(this.data.done));
    }
  }

  addTodo(todo: any) {
    if (todo.value.trim() != '') {
      this.data.pending.push(todo.value);
      todo.value = '';
      localStorage.setItem('pending', JSON.stringify(this.data.pending));
      this._snackBar.open('Eklendi', 'Tamam', {
        duration: 2000,
      });
    }
  }

  removeItem(type: number, item: string) {
    if (type == 1) {
      this.data.pending = this.data.pending.filter((s) => s != item);
      localStorage.setItem('pending', JSON.stringify(this.data.pending));
    } else if (type == 2) {
      this.data.inProgress = this.data.inProgress.filter((s) => s != item);
      localStorage.setItem('inProgress', JSON.stringify(this.data.inProgress));
    } else {
      this.data.done = this.data.done.filter((s) => s != item);
      localStorage.setItem('done', JSON.stringify(this.data.done));
    }

    this._snackBar.open('Silindi', 'Tamam', {
      duration: 2000,
    });
  }

  setItems() {
    if (!localStorage.getItem('pending')) {
      localStorage.setItem('pending', JSON.stringify(this.data.pending));
    } else {
      this.data.pending = JSON.parse(localStorage.getItem('pending') || '{}');
    }

    if (!localStorage.getItem('inProgress')) {
      localStorage.setItem('inProgress', JSON.stringify(this.data.inProgress));
    } else {
      this.data.inProgress = JSON.parse(
        localStorage.getItem('inProgress') || '{}'
      );
    }

    if (!localStorage.getItem('done')) {
      localStorage.setItem('done', JSON.stringify(this.data.done));
    } else {
      this.data.done = JSON.parse(localStorage.getItem('done') || '{}');
    }
  }
}
