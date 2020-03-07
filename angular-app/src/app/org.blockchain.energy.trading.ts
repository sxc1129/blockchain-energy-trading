import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.blockchain.energy.trading{
   export class Resident extends Participant {
      residentID: string;
      firstName: string;
      lastName: string;
      coins: Coins;
      generation: Generation[];
      energy: Energy[];
      consumption: Consumption[];
   }
   export class UtilityCompany extends Participant {
      utilityID: string;
      name: string;
      coins: Coins;
      energy: Energy[];
   }
   export class GenerationCompany extends Participant {
      companyID: string;
      name: string;
      coins: Coins;
      generation: Generation[];
      energy: Energy[];
   }
   export enum OwnerEntity {
      Resident,
      UtilityCompany,
      GenerationCompany,
   }
   export enum EnergySource {
      Solar,
      Wind,
      Hydro,
      Coal,
      GasFired,
   }
   export class Coins extends Asset {
      coinsID: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Consumption extends Asset {
      consumptionID: string;
      energySource: EnergySource;
      latitude: string;
      longitude: string;
      units: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Energy extends Asset {
      energyID: string;
      energySource: EnergySource;
      latitude: string;
      longitude: string;
      units: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class Generation extends Asset {
      generationID: string;
      energySource: EnergySource;
      latitude: string;
      longitude: string;
      units: string;
      value: number;
      ownerID: string;
      ownerEntity: OwnerEntity;
   }
   export class CoinsToEnergy extends Transaction {
      energyRate: number;
      energyValue: number;
      coinsInc: Coins;
      coinsDec: Coins;
      energyInc: Energy;
      energyDec: Energy;
   }
   export class EnergyToConsumption extends Transaction {
      energyValue: number;
      consumptionInc: Consumption;
      energyDec: Energy;
   }
   export class GenerationToEnergy extends Transaction {
      energyValue: number;
      energyInc: Energy;
      generationInc: Generation;
   }
// }
