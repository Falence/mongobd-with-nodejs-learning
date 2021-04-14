const { MongoClient } = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lezon.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
    const client = new MongoClient(uri) // create instance of MongoClient

    try {
        await client.connect() //connect to mongodb cluster

        await findListingsWithMinimumBedroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: 4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResults: 5
        })

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

// read multiple listings based on query
async function findListingsWithMinimumBedroomsAndMostRecentReviews(client,{
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}){
    const cursor = client.db('sample_airbnb').collection('listingsAndReviews')
        .find({
            bedrooms: {$gte: minimumNumberOfBedrooms},
            bathrooms: {$gte: minimumNumberOfBathrooms}
        }).sort({last_review: -1}).limit(maximumNumberOfResults)

    const results = await cursor.toArray()

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`)
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString()

            console.log()
            console.log(`${i + 1}, name: ${result.name}`)
            console.log(`   _id: ${result._id}`)
            console.log(`   bedrooms: ${result.bedrooms}`)
            console.log(`   bathrooms: ${result.bathrooms}`)
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`)
        })
    }
}









