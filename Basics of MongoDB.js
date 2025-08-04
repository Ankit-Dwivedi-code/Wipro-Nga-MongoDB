// show dbs;  --. To show all databases

// use mydb;  -- To switch to a specific database

// db.dropDatabase();  -- To drop the current database

// db.createCollection("mycollection");  -- To create a new collection

// db.mycollection.insert({ name: "John", age: 30 });  -- To insert a document into a collection

// db.mycollection.find();  -- To find all documents in a collection

// db.mycollection.find({ name: "John" });  -- To find documents with a specific condition
// db.mycollection.update({ name: "John" }, { $set: { age: 31 } });  -- To update a document
// db.mycollection.remove({ name: "John" });  -- To remove documents matching a condition
// db.mycollection.find().sort({ age: 1 });  -- To sort documents by age in ascending order
// db.mycollection.find().sort({ age: -1 });  -- To sort documents by age in descending order
// db.mycollection.find().limit(5);  -- To limit the number of documents returned


//aggregate

// db.mycollection.aggregate([
//   { $match: { age: { $gte: 30 } } },
//   { $group: { _id: "$name", averageAge: { $avg: "$age" } } },
//   { $sort: { averageAge: -1 } },
//   { $limit: 5 }
// ]);

db.testCollection.insertMany([
  { name: "Alice", age: 28, city: "Delhi" },
  { name: "Bob", age: 34, city: "Mumbai" },
  { name: "Charlie", age: 28, city: "Delhi" },
  { name: "David", age: 34, city: "Mumbai" }
]);

// These are sample data entries for testing aggregation queries


db.testCollection.aggregate([
  {
    $group: {
      _id: null,
      averageAge: { $avg: "$age" }
    }
  }
]);


//This query calculates the average age of all documents in the collection
db.testCollection.aggregate([
  {
    $group: {
      _id: "$city",
      averageAge: { $avg: "$age" }
    }
  }
])

