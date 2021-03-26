const fs = require('fs')
const { calc } = require('./calc')

// check command line length
if (process.argv.length !== 6) {
  console.log(
    'usage: node file-calc.js operator.txt op1.txt op2.txt output.txt'
  )
  process.exit(1)
}

// check if files exists
if (
  !fs.existsSync(process.argv[2]) ||
  !fs.existsSync(process.argv[3]) ||
  !fs.existsSync(process.argv[4])
) {
  console.log('Error: file does not exist')
  process.exit(1)
}

// check if isFile
if (
  !fs.statSync(process.argv[2]).isFile() ||
  !fs.statSync(process.argv[3]).isFile() ||
  !fs.statSync(process.argv[4]).isFile()
) {
  console.log('Error: bad input')
  process.exit(1)
}

// lire les fichiers
const operatorStr = fs.readFileSync(process.argv[2], 'utf-8')
const op1Str = fs.readFileSync(process.argv[3], 'utf-8')
const op2Str = fs.readFileSync(process.argv[4], 'utf-8')

// TODO: check taille des fichiers différents?
const op1Tab = op1Str.split('\n')
const op2Tab = op2Str.split('\n')
const operatorTab = operatorStr.split('\n')
const res = []

for (let i = 0; i < op1Tab.length; ++i) {
  // TODO: check if op1Tab[i] op2Tab[i] is a number
  // TODO: check if operatorTab[i] is an operator
  res.push(calc(operatorTab[i], Number(op1Tab[i]), Number(op2Tab[i])))
}

// Convert res en string
const resStr = res.join('\n')

// Ecrire resStr dans un fichier
fs.writeFileSync(process.argv[5], resStr)
