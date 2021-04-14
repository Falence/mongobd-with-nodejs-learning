const { MongoClient } = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lezon.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
    const client = new MongoClient(uri) // create instance of MongoClient

    try {
        await client.connect() //connect to mongodb cluster

        await readOneListingByName(client, 'Lovely Software Program')

    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

// insert a listing
async function createListing(client, newListing) {
    const result = await client.db('sample_airbnb')
        .collection('listingsAndReviews')
        .insertOne(newListing)
    console.log(`New listing created with the  following id: ${result.insertedId}`)
}

// insert multiple listings
async function createMultipleListings(client, newListings) {
    const result = await client.db('sample_airbnb')
        .collection('listingsAndReviews')
        .insertMany(newListings)
    console.log(`${result.insertedCount} new listing(s) created with the following id(s): `)
    console.log(result.insertedIds)
}

// read one listing by name
async function readOneListingByName(client, nameOfListing) {
    const result = await client.db('sample_airbnb')
        .collection('listingsAndReviews')
        .findOne({name: nameOfListing})
    if (result) {
        console.log(`Found a listing in the collection with the name ${nameOfListing}: `)
        console.log(result)
    } else {
        console.log(`No listings found with the name ${nameOfListing}`)
    }
}










