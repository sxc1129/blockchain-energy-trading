# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import requests , json , time

d = [100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 95.0, 90.0, 70.0, 40.0, 20.0, 0.0, 0.0, 20.0, 40.0, 70.0, 90.0, 95.0, 100.0, 100.0, 100.0, 100.0, 100.0]

for d in d:
    url = 'http://localhost:3000/api/CoinsToEnergy'
    
    payload = {
      "$class": "org.blockchain.energy.trading.CoinsToEnergy",
      "energyRate": "1.0",
      "energyValue": d,
      "coinsInc": "org.blockchain.energy.trading.Coins#c2",
      "coinsDec": "org.blockchain.energy.trading.Coins#c1",
      "energyInc": "org.blockchain.energy.trading.Energy#e1",
      "energyDec": "org.blockchain.energy.trading.Energy#e2",
    }
    
    headers = {'content-type':'application/json'}
    
    response = requests.post(url, data = json.dumps(payload), headers=headers)
    
    print(response.text)
    time.sleep(1)