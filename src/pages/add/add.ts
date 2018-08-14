//Title: CSC73010 - Assignment 2B (Add Page)
//
//Author: Harry Robinson (22787039)
//
//Description: This is the Add page for the Pet Database app. Provides a form for the user to 
//input the information for a new Pet record. Displays validation errors, or confirmation of success
//at the top of the page.
//

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pet } from '../../app/pet';
import { PetService } from '../../app/pet.service';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {

	pet: Pet;
	userMsg: string = "";
	
	//variables to contain user input
	newName: string;
	newSpecies: string;
	newAge: string;
	newSex: string;
	newRego: string;
	newPhone: string;

		
	
  constructor(public navCtrl: NavController, public petService: PetService, 
  public alertCtrl: AlertController) {
	  		
		this.pet = new Pet("", "",0,"",0,""); //empty Pet object to bind user-defined variables to
		//on submit.

  }
  
	showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help - Add',
      message: 'All fields must be completed before adding a pet to the database.' +
	  ' Species other than dogs or cats do not need to enter a registration number',
      buttons: ['OK']
    });
    alert.present();
    }
  
  
	//Gathers the user input, adds to the blank Pet object properties and then adds that object
	//to the array in PetService
	submit(){
		
		this.pet.name = this.newName;
		this.pet.species = this.newSpecies;
		this.pet.age = parseInt(this.newAge);
		this.pet.sex = this.newSex;
		this.pet.rego = parseInt(this.newRego);
		this.pet.phone = this.newPhone;
		
		if(this.pet.isValid()){ //Check data entry is valid, report issues if invalid
			if(isNaN(this.pet.rego)){//ensure rego does not show up as NaN when displaying to user
				this.pet.rego = 0;
			}
		this.petService.add(this.pet);
		this.userMsg = this.pet.name + " was added to the database";
		}else{
		this.userMsg = "Entry was not valid." + this.pet.invalidMsg;
		this.pet.invalidMsg = ""; // clear invalidMsg for future validation attempts
		}
	}
}
