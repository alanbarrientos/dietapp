import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Weight} from "../models/weight.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-weight-history',
  templateUrl: './weight-history.component.html',
  styleUrls: ['./weight-history.component.css']
})
export class WeightHistoryComponent implements OnInit, OnDestroy {
  modalOpen=false;
  weightForSent!:Weight;
  weights: Weight[] = [];
  constructor(private http: UserService, private el:ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
    this.http.getWeightHistory().subscribe(weight => this.weights = weight);
  }

  ngOnDestroy(){
    this.el.nativeElement.remove();
  }

  onClick(weight:Weight){
    this.weightForSent=weight;
    this.modalOpen=!this.modalOpen;
  }
  close(){
    this.modalOpen=!this.modalOpen;
  }
}
