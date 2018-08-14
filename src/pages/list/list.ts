//Title: CSC73010 - Assignment 2B (List Page)
//
//Author: Harry Robinson (22787039)
//
//Description: This is the List page for the Pet Database app. Displays all pet's in the database
//and tapping one will display it's details below the list.
//



import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pet } from '../../app/pet';
import { PetService } from '../../app/pet.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items : Pet[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public petService: PetService, public alertCtrl: AlertController) {
	  
	this.items = this.petService.getAll(); //Array of list items mirrors the Pet array in PetService
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

  }
  
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help - List',
      message: 'All pets in the database will appear here.' +
	  ' Tap on the name of a pet you would like to see' +
	  ' and its details will appear below the list.' +
	  ' If there is nothing here, go to Add and create' +
	  ' a new entry.',
      buttons: ['OK']
    });
    alert.present();
    }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
