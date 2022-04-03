export default function verify(address, signature) {
    const bitcoinMessage = require('bitcoinjs-message')

    console.log(bitcoinMessage.verify(address, address, signature))
}