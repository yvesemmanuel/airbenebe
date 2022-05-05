
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  isLinear = false;
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl("", [Validators.required])
  });

  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl("", [Validators.required])
  });

  constructor() {}

  ngOnInit() {

  }
  
}
