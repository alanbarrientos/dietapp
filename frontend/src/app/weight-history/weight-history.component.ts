import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Weight} from "../models/weight.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-weight-history',
  templateUrl: './weight-history.component.html',
  styleUrls: ['./weight-history.component.css']
})
export class WeightHistoryComponent implements OnInit, OnDestroy {
  modalAdd=false;
  modalOpen=false;
  weightForSent!:Weight;
  weights: Weight[] = [];
  constructor(private http: UserService, private el:ElementRef, private router:Router) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
    this.http.getWeightHistory().subscribe(weight => this.weights = weight);
  }

  ngOnDestroy(){
    this.el.nativeElement.remove();
  }

  AddOpenOrClose(){
    this.modalAdd=!this.modalAdd;
  }

  openWeight(weight:Weight){
    this.weightForSent=weight;
    this.modalOpen=!this.modalOpen;
  }
  closeWeight(){
    this.modalOpen=!this.modalOpen;
  }
  refresh(){
    window.location.reload()
  }
}
