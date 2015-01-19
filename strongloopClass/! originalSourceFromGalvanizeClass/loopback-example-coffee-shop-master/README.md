
Features covered in this app - 

* Model - CoffeeShops, Reviews, Customers.
* Datasources and connectors.
* Model relations - Customers can add Reviews for Coffeeshops.
* ACls - No write access to Reviews.
* Custom method example in common/models/coffee-shop.js. 
* FE map in client/index.html.
* Strong-studio discovery and migration using mysql and the Coffee model.



1. To run the app, you need to have Mongo running.
2. Install dependencies - npm i
3. Run the app - slc run
4. Open the explorer - http://localhost:3000/explorer
5. Open the coffeeshop map - http://localhost:3000/index.html
6. When you run the app for the first time, the database is empty and you dont see any data on the map.
7. Open coffeeshops.json in the root directory of the app and copy the contents of that file.
8. Make a post request to /api/CoffeeShops from the explorer. This will add all the coffee shops to the mongo db.
9. Reload http://localhost:3000/index.html. You should now see the coffeeshops on the map.  


