class ValidCardNumber{

    static separar4Bytes(bytes) {
        bytesParaConversao = []
        for (let i = 0; i <= 3; i++) {
          bytesParaConversao.push(bytes[i])
        }
        return bytesParaConversao
    }

    static convertToHexa(values) {
        let hexaStr = []
        for(let item of values){
          let hexa = item.toString(16)
          hexaStr.push(hexa)
        }
    
        return hexaStr.reverse()
    }

    static getCardNumber(hexa) {
        let number = ''
        for(let item of hexa){
          
          number = number + item
        }
        return parseInt(number, 16)
    }
}

function serialNumberCard(bytes) {
    const getSerialNumber = ValidCardNumber.separar4Bytes(bytes)
    const serialNumberInHexa = ValidCardNumber.convertToHexa(getSerialNumber)
    const finallySerialNumber = ValidCardNumber.getCardNumber(serialNumberInHexa)

    return finallySerialNumber
}

export default serialNumberCard