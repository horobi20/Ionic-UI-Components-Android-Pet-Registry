import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Pet } from '../../app/pet';
import { PetService } from '../../app/pet.service';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
	pet:Pet;
	petName: string;
	testMsg: string= "test";
  constructor(public navCtrl: NavController, public petService: PetService) {

  }
  
	addPet(name: string){
		this.pet.name = name;
		this.testMsg = this.pet.name;
	}
}
