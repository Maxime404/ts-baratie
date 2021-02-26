const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
    console.log('Hello from Matser !')
    const nbCpus = os.cpus().length
    console.log(nbCpus)
}