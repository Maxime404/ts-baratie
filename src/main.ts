const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
    console.log('Hello from Matser !')
    const nbCpus = os.cpus().length
    const processChilds = {}

    for(let i = 0; i < nbCpus; i++) {
        const childrenId = (i + 1).toString().padStart(4, '0')
        const child = cluster.fork({ childrenId })

        processChilds[childrenId] = child

        child.on('message', payload => {
            console.log(`Message from child ${child.id}`)
            console.log(payload)
        })
    }
} else {
    console.log(`[${process.env.childrenId} I'm here !]`)
    process.send({ message: 'hello' })
}