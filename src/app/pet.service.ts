//
//  This is the pet injectable service.
//
//  This service uses the Pet class and saves an array of pets.
//  There are various methods for updating the pet collection.
//
import { Pet } from './pet';
import { Injectable } from '@angular/core';

@Injectable()

export class PetService {
	
	private pets:[Pet] = <[Pet]>[];  // array of Pet objects
	
	//
	//  add(p) - add a pet objects
	//  returns true is successful or false if pet invalid or already exists
	//
	//  the pet array is maintained in alphabetical order by the pet's name
	//  the name attribute must be unique
	//
	add(p:Pet):boolean {
		if (p.isValid() && this.getIndex(p.name)<0) {
			let inserted:boolean = false;
			for (let i:number = 0; i< this.pets.length; i++) {
				if (this.pets[i].name > p.name) {
					console.log("i = "+i);
					this.pets.splice(i,0,p);
					inserted = true;
					break;
				}
			}
			if (!inserted) { // if not inserted then add to end of array
				this.pets[this.pets.length] = p;
			}
			return true;	// pet has been added to array
		} else {
			return false;  // we do not store invalid data or duplicat data
		}
	}
	
	// 
	// getAll() - returns all pets as array
	//
	//  Note: the returned array should not be updated by components
	//  because data will not be validated.
	//
	get(name:string): Pet {
		let index:number = this.getIndex(name);
		if (index<0) {
			return null;
		} else {
			return this.pets[index];
		}
	}
	
	// 
	// getAll() - returns all pets as array
	//
	//  Note: the returned array should not be updated by components
	//  because data will not be validated.
	//
	getAll(): Pet[] {
		return this.pets;
	}
	
	// 
	// update(pet) - update the data in the pet element
	// returns true if success or false if data invalid or pet name not in data
	// MODIFIED to take a second argument. Original pet is the first, the pet object
	// with the edited details second.
	update(selected:Pet, edited: Pet) {
		let index:number = this.getIndex(selected.name);
		if (!(selected.isValid() && index>=0)) {  // check data is valid and pet exists
			return false;
		}
		if (!(edited.isValid())) {  // check data is valid and pet exists
			return false;
		}
		
		this.pets[index]= edited;
		return true;
	}
	
	//
	// delete(name) - removes this pet with name from data
	// returns true if success or false if pet does not exist
	//
	delete(name:string) {
		let index:number = this.getIndex(name);
		if (index < 0) {		//not in data
			return false;
		} else {
			this.pets.splice(index,1);
			return true;
		}
	}
	
	//
	// exists(p) = return true if pet in data, false otherwise
	//
	exists(name:string):boolean {
		return (this.getIndex(name) > 0);
	}
	
	//
	// getIndex(name) - return index of name or -1 if not found
	//
	private getIndex(name:string) {
		for (let i:number=0; i<this.pets.length; i++) {
			if (this.pets[i].name == name) return i;
		}
		return -1;
	}
	
}