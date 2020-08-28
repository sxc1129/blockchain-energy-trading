from locust import HttpUser, task


class MyUser(HttpUser):
 
    @task
    def get_CoinsToEnergy(self):
        url = 'http://localhost:3000/api/Coins'
        self.client.get(url, name="GET Test")
        

