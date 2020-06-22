import csv , requests , json , time 


### Function to trade energy
def trade():
    with open("Load_M.csv") as load, open("Solar_M.csv") as solar, open("Wind_M.csv") as wind: 
        loadReader = csv.reader(load)
        solarReader = csv.reader(solar)
        windReader = csv.reader(wind)
        
        for L, S, W in zip(loadReader, solarReader, windReader):
            deficit = float(L[1]) - float(S[1]) - float(W[1])
            
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
            time.sleep(3601)


trade()


    
