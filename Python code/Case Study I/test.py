import csv

with open("Load_M.csv") as load, open("Solar_M.csv") as solar, open("Wind_M.csv") as wind: 

    loadReader = csv.reader(load)
    solarReader = csv.reader(solar)
    windReader = csv.reader(wind)
    
    for L, S, W in zip(loadReader, solarReader, windReader):
        d = float(L[1]) - float(S[1]) - float(W[1])
        
        
        #print(L[1])
        #print(S)
        #print(W)
        print(d)
