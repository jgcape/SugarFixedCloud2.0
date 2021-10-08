# About SugarFixed

SugarFixed uses Optical Character Recognition (OCR) throug the Google Vision API to identify how many of the 50+ different types of sugar are hiding in your food!

# Dependencies
* nodemon

## Run
1. Clone repo 
    
    https://github.com/athletedecoded/sugarfixed.git

2. Open locally and copy .env file to root path

3. Install package.json dependencies

    npm install    

4. Serve app at with node using

    npm start

    Alternatively, serve with nodemon using 
    
    npm run dev

    NB: In the case the defaut port is in use, update the .env PORT variable (line 4) to an available port (eg 3030,5000,5050 etc)

5. Successful connection is indicated by the following terminal messages:

    Listening on port  8080

    Database connection successful!

6. Navigate to 

    [http://localhost:8080](localhost:8080)

## Use deployed version for mobile testing

Run this app on your mobile browser and utilise your mobile camera using the following link:

   https://sugarfixed.herokuapp.com

## How to use SugarFixed

1. Log in or sign up. You must be logged in to use sugarfixed. 

2. Press the OPEN CAMERA button.

3. Take a photo of a label you would like to analyse.

4. If you're happy with the photo press PROCESS LABEL, otherwise press RETAKE PHOTO. 

    **Note** if the image is not high enough quality the optical character recognition will not work.

5. You will be redirected to http://localhost:8080/result to view the sugars present in your product.

6. Change the name of an entry or delete it by clicking on the edit button.

7. Return to the home page to scan another label.

8. Eat less sugar!

## Authors
Julian Cape | Kahlia Hogg | Rahul Samanta

## Licence
MIT 2021
