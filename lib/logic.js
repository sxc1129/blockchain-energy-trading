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


/**
 * Coins to Energy transaction
 * @param {org.blockchain.energy.trading.CoinsToEnergy} UpdateValues 
 * @transaction
 */
function CoinsToEnergy(UpdateValues) {

    //determine change in coins value from the rate
    var coinsChange = (UpdateValues.energyRate * UpdateValues.energyValue);

    //check the amount of energy and coins
  	if (coinsChange < 0 ) {
    	throw new Error("Energy rate or energy value could not be negative"); 
  	};
  	if (UpdateValues.coinsDec.value - coinsChange < 0) {
    	throw new Error("Insufficient coins"); 
  	};
  	if (UpdateValues.energyDec.value - UpdateValues.energyValue < 0) {
    	throw new Error("Insufficient energy"); 
  	};

    //update values of the assets
    UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + coinsChange;
    UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - coinsChange;
    UpdateValues.energyInc.value = UpdateValues.energyInc.value + UpdateValues.energyValue;
    UpdateValues.energyDec.value = UpdateValues.energyDec.value - UpdateValues.energyValue;
                
    //get asset registry for Coins and Energy, and update on the ledger
    return getAssetRegistry('org.blockchain.energy.trading.Coins')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.coinsInc,UpdateValues.coinsDec]);
        })
        .then(function () {
            return getAssetRegistry('org.blockchain.energy.trading.Energy')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.energyInc,UpdateValues.energyDec]);
            });
        });
    }


/**
 * Energy consumption in Resident transaction
 * @param {org.blockchain.energy.trading.EnergyToConsumption} UpdateValues
 * @transaction
 */
function EnergyToConsumption(UpdateValues) {

    //determine change in available energy to consumption
    var energyChange = UpdateValues.energyValue;

    //check the amount of energy 
    if (energyChange <= 0 ) {
    	throw new Error("Energy value must be more than zero"); 
  	};
    if (UpdateValues.energyDec.value - UpdateValues.energyValue < 0) {
    	throw new Error("Insufficient energy"); 
  	};

    //update values of the assets
    UpdateValues.energyDec.value = UpdateValues.energyDec.value - energyChange;
    UpdateValues.consumptionInc.value = UpdateValues.consumptionInc.value + energyChange;

    //get asset registry for Energy and Consumption, and update the ledger
    return getAssetRegistry('org.blockchain.energy.trading.Energy')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.energyDec]);
        }) 

        .then(function () {
            return  getAssetRegistry('org.blockchain.energy.trading.Consumption')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.consumptionInc]);
            });            
        }); 
    }


/**
 * Generation to Energy transaction
 * @param {org.blockchain.energy.trading.GenerationToEnergy} UpdateValues
 * @transaction
 */
function GenerationToEnergy(UpdateValues) {

    //determine change in available generation to energy
    var energyChange = UpdateValues.energyValue;

    //check the amount of energy 
    if (energyChange <= 0 ) {
    	throw new Error("Generation value must be more than zero"); 
  	};

    //update values of the assets
    UpdateValues.energyInc.value = UpdateValues.energyInc.value + energyChange;
    UpdateValues.generationInc.value = UpdateValues.generationInc.value + energyChange;

    //get asset registry for Energy, and update the ledger
    return getAssetRegistry('org.blockchain.energy.trading.Energy')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.energyInc]);
        })
        
        .then(function () {
            return  getAssetRegistry('org.blockchain.energy.trading.Generation')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.generationInc]);
            });            
        }); 
    }