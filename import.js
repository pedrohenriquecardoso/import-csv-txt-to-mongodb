const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CONNECTION = process.env.CONNECTION
const DB_NAME = process.env.DB_NAME
const COLLECTION_NAME = process.env.COLLECTION_NAME

const uri = CONNECTION
const dbName = DB_NAME;
const collectionName = COLLECTION_NAME;

const CHUNK_SIZE = 1000;

async function importData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connecting with MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = [];

    fs.createReadStream(path.join(__dirname, 'path and FileName.csv'))
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          VerseID: row['Verse ID'],
          BookName: row['Book Name'],
          BookNumber: row['Book Number'],
          Chapter: row['Chapter'],
          Verse: row['Verse'],
          Text: row['Text'],
        });
      })
      .on('end', async () => {
        if (data.length > 0) {
          try {
            for (let i = 0; i < data.length; i += CHUNK_SIZE) {
              const chunk = data.slice(i, i + CHUNK_SIZE);
              const result = await collection.insertMany(chunk);
              console.log(`${result.insertedCount} documents inserted in the batch.`);
            }
          } catch (err) {
            console.error('Error when inserting data:', err);
          }
        }
        client.close();
      });
  } catch (err) {
    console.error('Error when connecting with MongoDB:', err);
  }
}

importData();
