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
        const result = await getAsync(id + lastOne.href);
        return result !== null;
    }

    async add(id, result) {
        const status = await setAsync(id + result.href, result.text);
        return status;
    }

}

const db = new DB();

module.exports = {
    db
}