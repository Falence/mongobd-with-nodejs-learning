const { MongoClient } = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lezon.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
    const client = new MongoClient(uri) // create instance of MongoClient

    try {
        await client.connect() //connect to mongodb cluster

        await createListing(client,{
            name: 'Lovely Software Program',
            summary: 'Once upon some lines of code',
            bedrooms: 1,
            bathrooms: 1
        })

        await createMultipleListings(client,[
            {
                name: "Infinite Views",
                summary: "Modern home with infinite views from the infinity pool",
                property_type: "House",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Private room in London",
                property_type: "Apartment",
                bedrooms: 1,
                bathroom: 1
            },
            {
                name: "Beautiful Beach House",
                summary: "Enjoy relaxed beach living in this house with a private beach",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ])

    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

async function createListing(client, newListing) {
    const result = await client.db('sample_airbnb')
        .collection('listingsAndReviews')
        .insertOne(newListing)
    console.log(`New listing created with the  following id: ${result.insertedId}`)
}

async function createMultipleListings(client, newListings) {
    const result = await client.db('sample_airbnb')
        .collection('listingsAndReviews')
        .insertMany(newListings)
    console.log(`${result.insertedCount} new listing(s) created with the following id(s): `)
    console.log(result.insertedIds)
}











