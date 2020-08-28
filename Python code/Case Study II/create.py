import requests , json , time 

coin = 1
while coin <= 400:
    url = 'http://localhost:3000/api/Coins'
    payload = {
        "$class": "org.blockchain.energy.trading.Coins",
        "coinsID": coin,
        "value": 1000,
        "ownerID": "string",
        "ownerEntity": "Resident"
        } 
    headers = {'content-type':'application/json'}    
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    coin += 1
    time.sleep(1)
    print(response)
    
energy = 1
while energy <= 400:
    url = 'http://localhost:3000/api/Energy'
    payload = {
        "$class":"org.blockchain.energy.trading.Energy",
        "energyID": energy,
        "energySource": "Solar",
        "latitude": "xx.xxxx",
        "longitude": "yy.yyyy",
        "units": "kWh",
        "value": 1000,
        "ownerID": "string",
        "ownerEntity": "Resident"
        } 
    headers = {'content-type':'application/json'}    
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    energy += 1
    time.sleep(1)
    print(response)
    
