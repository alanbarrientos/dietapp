import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Weight} from "../models/weight.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.css']
})
export class AddWeightComponent implements OnInit {
  weightForm!:FormGroup;
  @Output() close = new EventEmitter();
  @Output() added = new EventEmitter();
  constructor(private http:UserService) { }

  ngOnInit(): void {
    this.weightForm = new FormGroup({
      date: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
    });
  }

  onSubmit(){
    let weight: Weight = new Weight(-1, this.weightForm.value.weight, this.weightForm.value.date)
    this.http.addWeight(weight).subscribe(
      data => {console.log('parece que agregamos un registro de peso')},
      error => {console.log('error al intentar agregar un peso')})
    this.added.emit();
    this.onCloseClick();
  }

  onCloseClick(){
    this.close.emit();
  }
}
