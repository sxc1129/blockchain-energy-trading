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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CoinsComponent } from './Coins/Coins.component';
import { ConsumptionComponent } from './Consumption/Consumption.component';
import { EnergyComponent } from './Energy/Energy.component';
import { GenerationComponent } from './Generation/Generation.component';

import { ResidentComponent } from './Resident/Resident.component';
import { UtilityCompanyComponent } from './UtilityCompany/UtilityCompany.component';
import { GenerationCompanyComponent } from './GenerationCompany/GenerationCompany.component';

import { CoinsToEnergyComponent } from './CoinsToEnergy/CoinsToEnergy.component';
import { EnergyToConsumptionComponent } from './EnergyToConsumption/EnergyToConsumption.component';
import { GenerationToEnergyComponent } from './GenerationToEnergy/GenerationToEnergy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Coins', component: CoinsComponent },
  { path: 'Consumption', component: ConsumptionComponent },
  { path: 'Energy', component: EnergyComponent },
  { path: 'Generation', component: GenerationComponent },
  { path: 'Resident', component: ResidentComponent },
  { path: 'UtilityCompany', component: UtilityCompanyComponent },
  { path: 'GenerationCompany', component: GenerationCompanyComponent },
  { path: 'CoinsToEnergy', component: CoinsToEnergyComponent },
  { path: 'EnergyToConsumption', component: EnergyToConsumptionComponent },
  { path: 'GenerationToEnergy', component: GenerationToEnergyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
