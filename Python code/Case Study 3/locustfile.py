from locust import HttpUser, task, tag
import json

class MyUser(HttpUser):

    
    @tag('tag1')
    @task
    def post_Coins(self):
        coin = 1
        while coin <= 10:
            url = 'http://localhost:3000/api/Coins'
            payload = {
                "$class": "org.blockchain.energy.trading.Coins",
                "coinsID": coin,
                "value": 1000,
                "ownerID": "string",
                "ownerEntity": "Resident"
                } 
            headers = {'content-type':'application/json'}    
            self.client.post(url, data=json.dumps(payload), headers=headers, name="Create Coins")
            coin += 1


    @tag('tag2')
    @task
    def post_Energy(self):
        energy = 1
        while energy <= 10:
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
            self.client.post(url, data=json.dumps(payload), headers=headers, name="Create Energy")
            energy += 1
 
    
    @tag('tag3')   
    @task
    def get_CoinsToEnergy(self):
        url = 'http://localhost:3000/api/Coins'
        self.client.get(url, name="GET Test")
        

