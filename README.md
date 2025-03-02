# Introduction 📜

This is a script in Node.js to import txt or csv file containing data to MongoDB. The file must contain columns separated by commas, this script transforms the data from your file into a collection in the target database. 

## Installation ☕️

1. Clone the repository.

    ```sh
    git clone https://github.com/pedrohenriquecardoso/import-csv-txt-to-mongodb.git
    ```
2. Navigate to the project directory.

    ```sh
    cd import-csv-txt-to-mongodb
    ```
    
3. Use npm install to install all necessary frameworks and libraries.

    ```sh
    npm i
    ```

4. Create a .env file with your CONNECTION, DB_NAME and COLLECTION_NAME.

5. On line 27 switch "path and FileName.csv" to your file path.

6. On line 30 change to the fields of the object you want to create in the collection.

7. Run the application.

    ```sh
    npm run dev
    ```