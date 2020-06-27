const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const dbname = "conFusion";
const url = `mongodb+srv://Ekenzy:27april2001@confusion-cesrh.mongodb.net/${dbname}?retryWrites=true&w=majority`;

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connection correctly to server");
  const db = client.db(dbname);
  dboper.insertDocument(
    db,
    { name: "Vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops);
      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);
        dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);
            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);
              db.dropCollection("dishes", (err, result) => {
                console.log("Dropped Collection:\n", result);
                client.close();
              });
            });
          }
        );
      });
    }
  );
});
