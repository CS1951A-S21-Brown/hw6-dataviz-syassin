import pandas as pd


data = pd.read_csv(r"C:\Users\Shady\Documents\hw6-dataviz-syassin-main\data\video_games.csv")

#Q1 dataset n data
data1 = data.sort_values(by=['Rank'])
data1 = data[data['Rank'] <= 10]
data1.to_csv(r"C:\Users\Shady\Documents\hw6-dataviz-syassin-main\data\q1data.csv", index = False)


#Q2 dataset n data

genreNA = data.groupby(['Genre'])['NA_Sales'].sum().nlargest(1).to_frame()

genreEU = data.groupby(['Genre'])['EU_Sales'].sum().nlargest(1).to_frame()
ddf = genreNA.append(genreEU)

genreJP = data.groupby(['Genre'])['JP_Sales'].sum().nlargest(1).to_frame()
ddf = ddf.append(genreJP)
genreOT = data.groupby(['Genre'])['Other_Sales'].sum().nlargest(1).to_frame()
ddf = ddf.append(genreOT)

longitude = [-130, 5, 133 ,40]
ddf['longitude'] = longitude
latitude = [54, 54, 54, 0]
ddf['latitude'] = latitude


ddf.to_csv(r"C:\Users\Shady\Documents\hw6-dataviz-syassin-main\data\q2df.csv")



#Q3 dataset n data
NA = data.groupby(['Publisher'])['NA_Sales'].sum().nlargest(1).to_frame()

EU = data.groupby(['Publisher'])['EU_Sales'].sum().nlargest(1).to_frame()
df = NA.append(EU)

JP = data.groupby(['Publisher'])['JP_Sales'].sum().nlargest(1).to_frame()

df = df.append(JP)

Other = data.groupby(['Publisher'])['Other_Sales'].sum().nlargest(1).to_frame()

df = df.append(Other)

longitude = [-130, 5, 133 ,40]
df['longitude'] = longitude
latitude = [54, 54, 54, 0]
df['latitude'] = latitude


df.to_csv(r"C:\Users\Shady\Documents\hw6-dataviz-syassin-main\data\q3df.csv")




