import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Weight} from "../models/weight.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-weight-history',
  templateUrl: './weight-history.component.html',
  styleUrls: ['./weight-history.component.css']
})
export class WeightHistoryComponent implements OnInit {
  weights: Weight[] = [];
  constructor(private http: UserService) { }

  ngOnInit(): void {
    this.http.getWeightHistory().subscribe(weight => this.weights = weight);
  }

}
