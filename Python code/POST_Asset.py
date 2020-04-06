# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import requests , json

url = 'http://localhost:3000/api/Energy'

payload = {
"$class": "org.blockchain.energy.trading.Energy",
  "energyID": "e3",
  "energySource": "Solar",
  "latitude": "string",
  "longitude": "string",
  "units": "kWh",
  "value": 200,
  "ownerID": "r3",
  "ownerEntity": "Resident"
}

headers = {'content-type':'application/json'}

response = requests.post(url, data = json.dumps(payload), headers=headers)

print(response.text)