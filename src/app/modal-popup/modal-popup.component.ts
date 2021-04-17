import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent implements OnInit {
  message;
  updateFlag = false;
  @Output() valueChange = new EventEmitter();
  @Input() set updateValue(val) {
    this.message = val.message;
    this.updateFlag = true;
  }
  constructor() { }

  ngOnInit() {
  }

  onClickOfClose() {
    this.valueChange.emit(true);
  }

  onSubmit(formValue) {
    const event = {formValue, updateFlag: this.updateFlag};
    this.valueChange.emit(event);
  }

}
