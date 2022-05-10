import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAccommodation } from '../interfaces/addinterface/AddAccommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

interface Imovel {
  value: string;
  viewValue: string;
}

interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css']
})
export class AddAccommodationComponent implements OnInit {

  Imoveis: Imovel[] = [
    {value: 'Apartamento', viewValue: 'Apartamento'},
    {value: 'Casa', viewValue: 'Casa'},
    {value: 'Pousada', viewValue: 'Pousada'},
    {value: 'Hotel', viewValue: 'Hotel'}
  ];
  Estados: Estado[] = [
    {value: 'Acre', viewValue: 'Acre'},
    {value: 'Alagoas', viewValue: 'Alagoas'},
    {value: 'Amapá', viewValue: 'Amapá'},
    {value: 'Amazonas', viewValue: 'Amazonas'},
    {value: 'Bahia', viewValue: 'Bahia'},
    {value: 'Ceará', viewValue: 'Ceará'},
    {value: 'Espírito Santo', viewValue: 'Espírito Santo'},
    {value: 'Goiás', viewValue: 'Goiás'},
    {value: 'Maranhão', viewValue: 'Maranhão'},
    {value: 'Mato Grosso', viewValue: 'Mato Grosso'},
    {value: 'Mato Grosso do Sul', viewValue: 'Mato Grosso do Sul'},
    {value: 'Minas Gerais', viewValue: 'Minas Gerais'},
    {value: 'Pará', viewValue: 'Pará'},
    {value: 'Paraíba', viewValue: 'Paraíba'},
    {value: 'Paraná', viewValue: 'Paraná'},
    {value: 'Pernambuco', viewValue: 'Pernambuco'},
    {value: 'Piauí', viewValue: 'Piauí'},
    {value: 'Rio de Janeiro', viewValue: 'Rio de Janeiro'},
    {value: 'Rio Grande do Norte', viewValue: 'Rio Grande do Norte'},
    {value: 'Rio Grande do Sul', viewValue: 'Rio Grande do Sul'},
    {value: 'Rondônia', viewValue: 'Rondônia'},
    {value: 'Roraima', viewValue: 'Roraima'},
    {value: 'Santa Catarina', viewValue: 'Santa Catarina'},
    {value: 'São Paulo', viewValue: 'São Paulo'},
    {value: 'Sergipe', viewValue: 'Sergipe'},
    {value: 'Tocantins', viewValue: 'Tocantins'},
    {value: 'Distrito Federal', viewValue: 'Distrito Federal'}
  ];

  isLinear = false;
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl("", [Validators.required])
  });

  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl("", [Validators.required]),
    thirdCtrl: new FormControl("", [Validators.required]),
    fourthCtrl: new FormControl("", [Validators.required]),
    fifthCtrl: new FormControl("", [Validators.required]),
    sixthCtrl: new FormControl("", [Validators.required, Validators.pattern("[\\d]{5}\-[\\d]{3}")])
  });

  thirdFormGroup = new FormGroup({
    seventhCtrl: new FormControl("", [Validators.required]),
    eigthCtrl: new FormControl("", [Validators.required]),
    ninethCtrl: new FormControl("", [Validators.required])
  });

  fourthFormGroup = new FormGroup({
    fileCtrl: new FormControl("", [Validators.required]),
  });

  fifthFormGroup = new FormGroup({
    tenthCtrl: new FormControl("", [Validators.required]),
    eleventhCtrl: new FormControl("", [Validators.required]),
    twelvethCtrl: new FormControl("", [Validators.required])
  });
   
  constructor(private router: Router, private accommodationService:AccommodationService) { }
  selectedfile = [];
  base64: string[] = []
  selectedFileNames = []
  onfileselected(event:any){
    
    this.selectedfile = event.target.files;
    if (this.selectedfile && this.selectedfile[0]) {
      const numberOfFiles = this.selectedfile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.base64.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedfile[i]);
      }
    }
  }   
  
  onSubmit() {
    const id_user = window.localStorage.getItem("loggedID");
    if (this.fifthFormGroup.valid && id_user) {
      const accommodation: AddAccommodation = {
        'id_user': id_user,
        'title': this.fifthFormGroup.value['eleventhCtrl'],
        'description': this.fifthFormGroup.value['twelvethCtrl'],
        'type': this.firstFormGroup.value['firstCtrl'],
        'state': this.secondFormGroup.value['fifthCtrl'],
        'city': this.secondFormGroup.value['fourthCtrl'],
        'street': this.secondFormGroup.value['secondCtrl'],
        'number': this.secondFormGroup.value['thirdCtrl'],
        'zipcode': this.secondFormGroup.value['sixthCtrl'],
        'capacity': this.thirdFormGroup.value['seventhCtrl'],
        'rooms': this.thirdFormGroup.value['eigthCtrl'],
        'bathrooms': this.thirdFormGroup.value['ninethCtrl'],
        'images': this.base64,
        'price': this.fifthFormGroup.value['tenthCtrl'],
      }

      this.accommodationService.addAccommodation(accommodation).subscribe({
        next: nxt => this.router.navigate(['/myaccommodations']),
        error: err => console.log(err)
      })
    }
  }
  
  ngOnInit() {
  }
  
}


