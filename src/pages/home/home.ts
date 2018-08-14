//Title: CSC73010 - Assignment 2B (Home Page)
//
//Author: Harry Robinson (22787039)
//
//Description: This is the Home page for the Pet Database app. Displays app title, author and 
//description.
//

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pet } from '../../app/pet';
import { PetService } from '../../app/pet.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  testPet: Pet;
	
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  public petService: PetService, ) {
	  
		//Adds a pet to the database to test edit/list/delete
		this.testPet = new Pet("Fido", "dog", 2, "male", 123456, "0753 247 632");
		this.petService.add(this.testPet);
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'This is the Help Button',
      message: 'If you get stuck while using this app, click here for more' +
	  ' information',
      buttons: ['OK']
    });
    alert.present();
  }
}
