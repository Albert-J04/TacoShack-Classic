const redis = require('redis')
const { redisPath } = require('./util/settings.json')

module.exports = async () => {
    return await new Promise((resolve, reject) => {
        const client = redis.createClient({
            url: redisPath
    })
    client.on('error', err =>{
        console.error('Redis error:', err)
        client.quit()
        reject(err)
    })

    client.on('ready', () => {
        console.log('Redis connection opened!')
        resolve(client)
    })

    client.on('reconnecting', () => {
        console.log('Redis connection reconnecting.')
    })

    client.on('end', () => {
        console.log('Redis connection closed!')
    })
 })
}