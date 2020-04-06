#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 25 22:37:49 2020

@author: sanyaponc.
"""

import csv , requests , json , time 

with open('load.csv', 'r') as csv_file:
    load_reader = csv.reader(csv_file)       
    for rowL in load_reader:
        x = float(rowL[1])         

with open('solar.csv', 'r') as csv_file:
    solar_reader = csv.reader(csv_file)           
    for rowS in solar_reader:
        y = float(rowS[1])
        
        deficit = x-y
        
 
    
        url = 'http://localhost:3000/api/CoinsToEnergy'    
        payload = {
                "$class": "org.blockchain.energy.trading.CoinsToEnergy",
                "energyRate": "1.0",
                "energyValue": deficit,
                "coinsInc": "org.blockchain.energy.trading.Coins#c2",
                "coinsDec": "org.blockchain.energy.trading.Coins#c1",
                "energyInc": "org.blockchain.energy.trading.Energy#e1",
                "energyDec": "org.blockchain.energy.trading.Energy#e2",
                }    
        headers = {'content-type':'application/json'}    
        response = requests.post(url, data = json.dumps(payload), headers=headers)  
        print(response.text,'\n'),
        time.sleep(1)
        
        

url = 'http://localhost:3000/api/CoinsToEnergy'
response = requests.get(url)
foo = json.loads(response.text)
for f in foo:
    print(f['energyValue'])
    print(f['transactionId'])
    print(f['timestamp'],'\n'),