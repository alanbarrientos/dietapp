import {Component, ElementRef, OnDestroy, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Weight} from "../../models/weight.model";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() weight!:Weight;

  @Output() close = new EventEmitter();
  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(){
    this.el.nativeElement.remove();
  }

  onCloseClick(){
    this.close.emit();
  }
}
