//Title: CSC73010 - Assignment 2B (Edit Page)
//
//Author: Harry Robinson (22787039)
//
//Description: This is the Edit page for the Pet Database app. Allows selection of an existing
//Pet record, and the option of editing or deleting it. Edit expands a form below the buttons to 
//update a record, and Delete presents an action sheet prompt for the user to confirm they want the 
//record removed.
//


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pet } from '../../app/pet';
import { PetService } from '../../app/pet.service';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
	
	editing: boolean = false; //bool to track if user wants to make an edit
	selectedItem: string;
	selectedPet:Pet; //pet to edit or delete
	editedPet:Pet; //updated version of selected pet that the user wants to commit.
  items : Pet[] = [];

  constructor(public navCtrl: NavController, public petService: PetService,
  public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
  public alertCtrl: AlertController) {
	  
	  this.items = this.petService.getAll(); //Array of list items mirrors the Pet array in PetService
	  this.selectedPet = new Pet("", "",0,"",0,"");
	  this.editedPet = new Pet("", "",0,"",0,"");
	  this.selectedItem = navParams.get('item');
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Help - Edit',
      message: 'Select a pet from the database with the drop-down selection list.' +
	  ' If there is nothing here, go to Add and create a new pet entry.' +
	  ' If changes do not appear immediately, navigate to another page and back.',
      buttons: ['OK']
    });
    alert.present();
  }
  
  //updates selection value when change is made
  onSelectChange(selectedValue: any) {
    this.bindSelected();
  }
  
  //gets new values for selectedPet based on the  the new selected value
  bindSelected(){
	this.selectedPet = this.petService.get(this.selectedItem);
  }

  
  ifSelected() { // Check a selection has been made. Gets the name-matched Pet from the petService.
	  if(this.selectedItem != null){
		  return true;
	  }else{
		  return false;
	  }
  }
  
  submit(){
	if(!(this.ifSelected())){
		console.log("no selection");
		return;
	}
	this.petService.update(this.selectedPet, this.editedPet);
	this.items = this.petService.getAll();
	this.editing = false;
  }
  
 
  
  ifEditing(){
	this.bindSelected();
	//pass the selected Pet's values to a new editable Pet for the update function on submit.
	this.editedPet.name = this.selectedPet.name;
	this.editedPet.species = this.selectedPet.species;
	this.editedPet.age = this.selectedPet.age;
	this.editedPet.sex = this.selectedPet.sex;
	this.editedPet.rego = this.selectedPet.rego;
	this.editedPet.phone = this.selectedPet.phone;
	
	this.editing = true; //use this bool to bring up editing form to make changes
	
	
  }
  
  
  deleteActionSheet() {
	  this.bindSelected();
	  let actionSheet = this.actionSheetCtrl.create({
		 title: 'Are you sure you want to delete ' + this.selectedPet.name +'?',
		 buttons: [
		   {
			 text: 'Delete',
			 role: 'destructive',
			 handler: () => {
			   this.petService.delete(this.selectedPet.name);
			   this.items = this.petService.getAll();
			 }
		   },		   
		   {
			 text: 'Cancel',
			 role: 'cancel',
			 handler: () => {
			   console.log('Cancel clicked');
			 }
		   }
		 ]
	   });	
	actionSheet.present();
	}
}
