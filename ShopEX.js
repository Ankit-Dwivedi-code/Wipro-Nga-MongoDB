

// Create a product collection 
// use ShopExDB;
db.products.insertMany([
  {
    productName: "Wireless Mouse",
    category: "Electronics",
    price: 899,
    stock: 120,
    rating: 4.5
  },
  {
    productName: "Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    stock: 60,
    rating: 4.2
  }
])

//Output
// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId('68909bca23cb52484eeec4a9'),
//     '1': ObjectId('68909bca23cb52484eeec4aa')
//   }
// }


//Create a customer collection 
db.customers.insertOne({
  name: "Ravi Kumar",
  email: "ravi@example.com",
  city: "Mumbai",
  registeredOn: new Date("2022-01-01")
})

//Output
// {
//   acknowledged: true,
//   insertedId: ObjectId('68909ce1feab00f4efeec4a9')
// }


//Create an order collection 
db.orders.insertOne({
  customerId: ObjectId("68909ce1feab00f4efeec4a9"),
  orderDate: new Date("2023-08-01"),
  items: [
    { productId: ObjectId("68909bca23cb52484eeec4a9"), quantity: 2, price: 899 }
  ],
  totalAmount: 1798,
  shippingCity: "Mumbai",
  status: "Delivered"
})

 //Output
// {
//   acknowledged: true,
//   insertedId: ObjectId('68909d26feab00f4efeec4aa')
// }


//Step 3: Performing CRUD operations 

//Updating product stock
// Updating Stock After Order
db.products.updateOne(
  { _id: ObjectId("68909bca23cb52484eeec4a9") },
  { $inc: { stock: -2 } }
)

// output
// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }


//Read orders 
db.orders.find({ customerId: ObjectId("68909ce1feab00f4efeec4a9") })

//Output
// [
//   {
//     _id: ObjectId('68909d26feab00f4efeec4aa'),
//     customerId: ObjectId('68909ce1feab00f4efeec4a9'),
//     orderDate: ISODate('2023-08-01T00:00:00.000Z'),
//     items: [
//       {
//         productId: ObjectId('68909bca23cb52484eeec4a9'),
//         quantity: 2,
//         price: 899
//       }
//     ],
//     totalAmount: 1798,
//     shippingCity: 'Mumbai',
//     status: 'Delivered'
//   }
// ]

//Delete inactive customer 
db.customers.deleteMany({
  registeredOn: { $lt: new Date("2021-01-01") }
})


//Step 4: INdexing and Query optimisation 

//Create an index on product category 
db.products.createIndex({category : 1})
// Query with explain Plan
db.products.find({category: "Electronics"}).explain("executionStats")

//Output

// {
//   explainVersion: '1',
//   queryPlanner: {
//     namespace: 'shopExDB.products',
//     parsedQuery: { category: { '$eq': 'Electronics' } },
//     indexFilterSet: false,
//     queryHash: '421A7F3B',
//     planCacheShapeHash: '421A7F3B',
//     planCacheKey: 'E8986359',
//     optimizationTimeMillis: 7,
//     maxIndexedOrSolutionsReached: false,
//     maxIndexedAndSolutionsReached: false,
//     maxScansToExplodeReached: false,
//     prunedSimilarIndexes: false,
//     winningPlan: {
//       isCached: false,
//       stage: 'FETCH',
//       inputStage: {
//         stage: 'IXSCAN',
//         keyPattern: { category: 1 },
//         indexName: 'category_1',
//         isMultiKey: false,
//         multiKeyPaths: { category: [] },
//         isUnique: false,
//         isSparse: false,
//         isPartial: false,
//         indexVersion: 2,
//         direction: 'forward',
//         indexBounds: { category: [ '["Electronics", "Electronics"]' ] }
//       }
//     },
//     rejectedPlans: []
//   },
//   executionStats: {
//     executionSuccess: true,
//     nReturned: 1,
//     executionTimeMillis: 29,
//     totalKeysExamined: 1,
//     totalDocsExamined: 1,
//     executionStages: {
//       isCached: false,
//       stage: 'FETCH',
//       nReturned: 1,
//       executionTimeMillisEstimate: 21,
//       works: 2,
//       advanced: 1,
//       needTime: 0,
//       needYield: 0,
//       saveState: 1,
//       restoreState: 1,
//       isEOF: 1,
//       docsExamined: 1,
//       alreadyHasObj: 0,
//       inputStage: {
//         stage: 'IXSCAN',
//         nReturned: 1,
//         executionTimeMillisEstimate: 21,
//         works: 2,
//         advanced: 1,
//         needTime: 0,
//         needYield: 0,
//         saveState: 1,
//         restoreState: 1,
//         isEOF: 1,
//         keyPattern: { category: 1 },
//         indexName: 'category_1',
//         isMultiKey: false,
//         multiKeyPaths: { category: [] },
//         isUnique: false,
//         isSparse: false,
//         isPartial: false,
//         indexVersion: 2,
//         direction: 'forward',
//         indexBounds: { category: [ '["Electronics", "Electronics"]' ] },
//         keysExamined: 1,
//         seeks: 1,
//         dupsTested: 0,
//         dupsDropped: 0
//       }
//     }
//   },
//   queryShapeHash: 'A8A4BAA5CA0A3EED8932AA6F2F72B9EB47C5786D4529134BD65863674F0E70E3',
//   command: {
//     find: 'products',
//     filter: { category: 'Electronics' },
//     '$db': 'shopExDB'
//   },
//   serverInfo: {
//     host: 'HP',
//     port: 27017,
//     version: '8.0.12',
//     gitVersion: 'b60fc6875b5fb4b63cc0dbbd8dda0d6d6277921a'
//   },
//   serverParameters: {
//     internalQueryFacetBufferSizeBytes: 104857600,
//     internalQueryFacetMaxOutputDocSizeBytes: 104857600,
//     internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
//     internalDocumentSourceGroupMaxMemoryBytes: 104857600,
//     internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
//     internalQueryProhibitBlockingMergeOnMongoS: 0,
//     internalQueryMaxAddToSetBytes: 104857600,
//     internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
//     internalQueryFrameworkControl: 'trySbeRestricted',
//     internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
//   },
//   ok: 1
// }
//Step 5:  Aggregation queries 

//Average Order Value by City
db.orders.aggregate([ 
{ $group: { _id: "$shippingCity", avgOrder: { $avg: "$totalAmount" } } }
])

//Output
// [ { _id: 'Mumbai', avgOrder: 1798 } ]

//Top 3 Products by quantity sold 
db.orders.aggregate([ 
{ $unwind: "$items" },
{ $group: { _id: "$items.productId", totalSold: { $sum: "$items.quantity" } } },
  { $sort: { totalSold: -1 } },
 { $limit: 3 }
])

//Output
// [ { _id: ObjectId('68909bca23cb52484eeec4a9'), totalSold: 2 } ]
