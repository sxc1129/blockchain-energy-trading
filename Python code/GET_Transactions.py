#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 16:45:52 2020

@author: sanyaponc.
"""

import requests 
import json

url = 'http://localhost:3000/api/CoinsToEnergy'

response = requests.get(url)

#print(response.text)

foo = json.loads(response.text)

for f in foo:
    print(f['energyValue'])
    print(f['transactionId'])
    print(f['timestamp']),"\n"
    