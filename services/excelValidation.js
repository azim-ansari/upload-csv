const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')
const {nftItems_excel_head, nftItemsExcelSchema} = require('./constant')
module.exports = {
    validateExcelColmns: async(filepath) => {
        return new Promise((resolve, reject) => {
            const response = {
                columnError: [],
            }
                readXlsxFile(fs.createReadStream(filepath))
                    .then((rows) => {
                        // Removing space from excel columns if any
                        const receievedHeader = rows[0].map((e) => {
                            return e.trim()
                        })
                        for (let index = 0; index < nftItems_excel_head.length; index++) {
                            const requireKey = nftItems_excel_head[index].trim()
                            if (!receievedHeader.includes(requireKey)) {
                                response.columnError.push(`Invalid File. Column ${requireKey} not found.`)
                            }
                        }
                        resolve(response)
                    })
                    .catch((err) => {
                        reject(err)
                    })
	        })
    },
    extractDataAsSchemaJson : async (filePath) => {
        return new Promise((resolve, reject) => {
            const response = {
                rows: null,
                rawDataError: [],
            }
            readXlsxFile(fs.createReadStream(filePath), { schema: nftItemsExcelSchema })
                .then((rows) => {
                    if (rows.errors.length) {
                        rows.errors.forEach((element) => {
                            const errMsg = `${element.column} ${element.error} in row  ${element.row}`
                            response.rawDataError.push(errMsg)
                        })
                    }
                    response.rows = rows.rows
                    resolve(response)
                })
                .catch((err) => {
                    resolve(response)
                })
        })
    }     
}