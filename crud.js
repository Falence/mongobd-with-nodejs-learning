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











