import requests , time 

coin = 1
while coin <= 10:
    url = 'http://localhost:3000/api/Coins/{}'.format(coin)
    #headers = {'content-type':'application/json'}    
    response = requests.delete(url)
    coin += 1
    time.sleep(1)
    print(response)
    
energy = 1
while energy <= 10:
    url = 'http://localhost:3000/api/Energy/{}'.format(energy)
    #headers = {'content-type':'application/json'}    
    response = requests.delete(url)
    energy += 1
    time.sleep(1)
    print(response)
    
