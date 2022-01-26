import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input() message: string;
  @Input() willDelete: string;
  @Output() newItemEvent = new EventEmitter<{ cond: boolean; id: string }>();
  constructor() {}

  ngOnInit(): void {}
  modalSubmit() {
    this.newItemEvent.emit({ cond: true, id: this.willDelete });
  }
  modalCancel() {
    this.newItemEvent.emit({ cond: false, id: this.willDelete });
  }
}
