const { promisify } = require('util');
var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

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
        const status = await setAsync(id + result.href, result.text);
        return status;
    }

}

const db = new DB();

module.exports = {
    db
}