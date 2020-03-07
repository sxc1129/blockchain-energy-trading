/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResidentService } from './Resident.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-resident',
  templateUrl: './Resident.component.html',
  styleUrls: ['./Resident.component.css'],
  providers: [ResidentService]
})
export class ResidentComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  residentID = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  coins = new FormControl('', Validators.required);
  generation = new FormControl('', Validators.required);
  energy = new FormControl('', Validators.required);
  consumption = new FormControl('', Validators.required);


  constructor(public serviceResident: ResidentService, fb: FormBuilder) {
    this.myForm = fb.group({
      residentID: this.residentID,
      firstName: this.firstName,
      lastName: this.lastName,
      coins: this.coins,
      generation: this.generation,
      energy: this.energy,
      consumption: this.consumption
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceResident.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.blockchain.energy.trading.Resident',
      'residentID': this.residentID.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'coins': this.coins.value,
      'generation': this.generation.value,
      'energy': this.energy.value,
      'consumption': this.consumption.value
    };

    this.myForm.setValue({
      'residentID': null,
      'firstName': null,
      'lastName': null,
      'coins': null,
      'generation': null,
      'energy': null,
      'consumption': null
    });

    return this.serviceResident.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'residentID': null,
        'firstName': null,
        'lastName': null,
        'coins': null,
        'generation': null,
        'energy': null,
        'consumption': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.blockchain.energy.trading.Resident',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'coins': this.coins.value,
      'generation': this.generation.value,
      'energy': this.energy.value,
      'consumption': this.consumption.value
    };

    return this.serviceResident.updateParticipant(form.get('residentID').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceResident.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceResident.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'residentID': null,
        'firstName': null,
        'lastName': null,
        'coins': null,
        'generation': null,
        'energy': null,
        'consumption': null
      };

      if (result.residentID) {
        formObject.residentID = result.residentID;
      } else {
        formObject.residentID = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.coins) {
        formObject.coins = result.coins;
      } else {
        formObject.coins = null;
      }

      if (result.generation) {
        formObject.generation = result.generation;
      } else {
        formObject.generation = null;
      }

      if (result.energy) {
        formObject.energy = result.energy;
      } else {
        formObject.energy = null;
      }

      if (result.consumption) {
        formObject.consumption = result.consumption;
      } else {
        formObject.consumption = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'residentID': null,
      'firstName': null,
      'lastName': null,
      'coins': null,
      'generation': null,
      'energy': null,
      'consumption': null
    });
  }
}
