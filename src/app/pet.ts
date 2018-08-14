//
// The Pet class contains data about individual pets.  It is best to create
// a pet with the constructor.
//
// Note that the data in a Pet object may be invalid to allow incremental updates.
// However, the isValid() method may be called to check if the data is valid.
//

export class Pet {
	
	// class attributes are public to allow JavaScript objects to be assigned
	name:string;
	species: string;
	age:number;
	sex: string;
	rego: number;
	phone:string;
	invalidMsg: string = "";
	
	constructor(name:string, species:string, age:number,
                sex:string, rego:number, phone:string) {
		this.name=name;
		this.species=species;
		this.age=age;
		this.sex = sex;
		this.rego = rego;
		this.phone = phone;
	}
	
	//
	// isValid() - validates all data fields
	//
	isValid():boolean {
		if (this.name==null || this.name=="") {
			this.invalidMsg += " Pet must have a name. ";
			return false;
		}
		if (!(  this.species=="dog" ||this.species=="cat" 
		      ||this.species=="fish" ||this.species=="bird" 
			  ||this.species=="snake" || this.species=="other" )) {
				  this.invalidMsg += " Pet must have a species selected. ";
			  return false;
		}
		if (this.age<0) {	// age can be any positive number
			return false;
		}
		if (!(this.sex=="male" || this.sex=="female")) {
			this.invalidMsg += " Pet must have a sex selected. ";
			return false;
		}
		if (this.species=="dog" ||this.species=="cat"){
			if (this.rego == 0 || isNaN(this.rego) || this.rego == null){
				this.invalidMsg += " Registration number is required for dogs and cats. ";
			return false;
			}
		}
		if (this.phone == null) {
			this.invalidMsg += " Contact phone number for owner is required.";
			return false;
		}
		
		return true;
	}
}
