const { promisify } = require('util');
var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hgetAsync = promisify(client.hget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

class DB {
    constructor() {

    }

    async has(id, lastOne) {
        console.log(id)
        const result = await getAsync(id + lastOne.href);
        return result !== null;
    }

    async add(id, result) {
        let status = await this.has(id, result);
        if (status) {
            return false
        }
        status = await setAsync(id + result.href, result.text);
        return status;
    }

    async hasService(name) {
        return null !== await this.getSubscribers(name)
    }

    async setService(name) {
        return await hsetAsync('services', name, JSON.stringify([]))
    }

    async getSubscribers(name) {
        let services = Object.keys(await hgetallAsync('services'));
        if (services.indexOf(name) !== -1) {
            let subscribers = await hgetAsync('services', name)
            return JSON.parse(subscribers)
        }
        return null
    }

    async setSubscriber(name, value) {
        let currentSubsciber = JSON.parse(await this.getService(name));
        currentSubsciber.push(value)
        return await hsetAsync('services', name, JSON.stringify(currentSubsciber))
    }

}

const db = new DB();

module.exports = {
    db
}