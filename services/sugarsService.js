let client = require("../mongoConnect");

let sugarsCollection;
setTimeout(() => {
    sugarsCollection = client.mongodbClient.db("sit725").collection("sugarsDB");
}, 2000)