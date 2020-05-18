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
import { UtilityCompanyService } from './UtilityCompany.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-utilitycompany',
  templateUrl: './UtilityCompany.component.html',
  styleUrls: ['./UtilityCompany.component.css'],
  providers: [UtilityCompanyService]
})
export class UtilityCompanyComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  utilityID = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  coins = new FormControl('', Validators.required);
  energy = new FormControl('', Validators.required);


  constructor(public serviceUtilityCompany: UtilityCompanyService, fb: FormBuilder) {
    this.myForm = fb.group({
      utilityID: this.utilityID,
      name: this.name,
      coins: this.coins,
      energy: this.energy
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUtilityCompany.getAll()
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
      $class: 'org.blockchain.energy.trading.UtilityCompany',
      'utilityID': this.utilityID.value,
      'name': this.name.value,
      'coins': this.coins.value,
      'energy': this.energy.value
    };

    this.myForm.setValue({
      'utilityID': null,
      'name': null,
      'coins': null,
      'energy': null
    });

    return this.serviceUtilityCompany.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'utilityID': null,
        'name': null,
        'coins': null,
        'energy': null
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
      $class: 'org.blockchain.energy.trading.UtilityCompany',
      'name': this.name.value,
      'coins': this.coins.value,
      'energy': this.energy.value
    };

    return this.serviceUtilityCompany.updateParticipant(form.get('utilityID').value, this.participant)
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

    return this.serviceUtilityCompany.deleteParticipant(this.currentId)
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

    return this.serviceUtilityCompany.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'utilityID': null,
        'name': null,
        'coins': null,
        'energy': null
      };

      if (result.utilityID) {
        formObject.utilityID = result.utilityID;
      } else {
        formObject.utilityID = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.coins) {
        formObject.coins = result.coins;
      } else {
        formObject.coins = null;
      }

      if (result.energy) {
        formObject.energy = result.energy;
      } else {
        formObject.energy = null;
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
      'utilityID': null,
      'name': null,
      'coins': null,
      'energy': null
    });
  }
}
