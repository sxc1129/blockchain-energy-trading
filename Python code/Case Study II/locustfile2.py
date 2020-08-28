from locust import HttpUser, constant, task 
import json, random

class MyUser(HttpUser):
    wait_time = constant(4)
    trading_pool = []

    @task(1)
    def post_trade(self):
        self.total_assets = 400
        is_found = False
        while not is_found:
            asset1 = random.randint(1, self.total_assets)
            asset2 = random.randint(1, self.total_assets)
            asset3 = asset1
            asset4 = asset2
            if asset1 != asset2 and asset1 not in self.trading_pool and asset2 not in self.trading_pool:
                is_found = True
                self.trading_pool.append(asset1)
                self.trading_pool.append(asset2)
                url = 'http://localhost:3000/api/CoinsToEnergy'
                payload = {
                    "$class": "org.blockchain.energy.trading.CoinsToEnergy",
                    "energyRate": "1.0",
                    "energyValue": 1,
                    "coinsInc": "org.blockchain.energy.trading.Coins#{}".format(asset1),
                    "coinsDec": "org.blockchain.energy.trading.Coins#{}".format(asset2),
                    "energyInc": "org.blockchain.energy.trading.Energy#{}".format(asset4),
                    "energyDec": "org.blockchain.energy.trading.Energy#{}".format(asset3),
                    }    
                headers = {'content-type':'application/json'}    
                self.client.post(url, data=json.dumps(payload), headers=headers, name="Trade Testing")
                self.trading_pool.remove(asset1)
                self.trading_pool.remove(asset2)

 