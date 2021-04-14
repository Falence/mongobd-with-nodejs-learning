const { MongoClient } = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.lezon.mongodb.net/sample_airbnb?retryWrites=true&w=majority'
    const client = new MongoClient(uri) // create instance of MongoClient

    try {
        await client.connect() //connect to mongodb cluster
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)












