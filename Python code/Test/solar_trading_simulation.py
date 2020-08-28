import csv , requests , json , time 

### Function to create coins
def create_coin(coin):   
    for c in coin:
        url = 'http://localhost:3000/api/Coins'
        payload = {
            "$class": "org.blockchain.energy.trading.Coins",
            "coinsID": c,
            "value": 3000,
            "ownerID": "string",
            "ownerEntity": "Resident"
            }
        headers = {'content-type':'application/json'} 
        response = requests.post(url, data = json.dumps(payload), headers=headers)     
        print(response.text,'\n'),
        
### Function to create energy
def create_energy(energy):
    for e in energy:
        url = 'http://localhost:3000/api/Energy'
        payload = {
            "$class": "org.blockchain.energy.trading.Energy",
            "energyID": e,
            "energySource": "Solar",
            "latitude": "xx.xxxx",
            "longitude": "yy.yyyy",
            "units": "kWh",
            "value": 3000,
            "ownerID": "string",
            "ownerEntity": "Resident"
            }
        headers = {'content-type':'application/json'} 
        response = requests.post(url, data = json.dumps(payload), headers=headers)     
        print(response.text,'\n'),

### Function to trade energy
def trade():
    with open('load.csv', 'r') as csv_file:
        load_reader = csv.reader(csv_file)       
        for rowL in load_reader:
            x = float(rowL[1])         

    with open('solar.csv', 'r') as csv_file:
        solar_reader = csv.reader(csv_file)           
        for rowS in solar_reader:
            y = float(rowS[1])
        
            deficit = x-y
            print(deficit)
            url = 'http://localhost:3000/api/CoinsToEnergy'    
            payload = {
                "$class": "org.blockchain.energy.trading.CoinsToEnergy",
                "energyRate": "1.0",
                "energyValue": deficit,
                "coinsInc": "org.blockchain.energy.trading.Coins#coin_U1",
                "coinsDec": "org.blockchain.energy.trading.Coins#coin_R1",
                "energyInc": "org.blockchain.energy.trading.Energy#energy_R1",
                "energyDec": "org.blockchain.energy.trading.Energy#energy_U1",
                }    
            headers = {'content-type':'application/json'}    
            response = requests.post(url, data = json.dumps(payload), headers=headers)  
            print(response.text,'\n'),
            time.sleep(0.1)


#coin = ('coin_R1','coin_U1')      
#create_coin(coin)
        
#energy = ('energy_R1','energy_U1')
#create_energy(energy)

trade()


    
