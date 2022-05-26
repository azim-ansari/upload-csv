const ItemModel = require('../model/item')
const { validateExcelColmns, extractDataAsSchemaJson } = require('../services/excelValidation')
const _ = require('lodash')

module.exports = {
    addBulkItems: async(req, res)=> {
        try {
            const addData = await ItemModel.create(req.body)
            return res.status(200).json({msg:"Added Items", data: addData})
        } catch (error) {
            return res.status(500).json({msg:"server Error"})
        }
    },
    addBulkItemsFromCSV: async(req, res)=> {
        try {
            if(!req.file){
                return res.status(404).json({msg:"Invalid file"})
            } else {
                let errorArray = []
				const filePath = 'public/csv/' + req.file.filename
				let { columnError } = await validateExcelColmns(filePath)
                if (columnError.length) {
					errorArray = [...errorArray, ...columnError]
				}
				const { rows, rawDataError } = await extractDataAsSchemaJson(filePath)
                if (rawDataError.length) {
                    errorArray = [...errorArray, ...rawDataError]
				}
				var removeArray = []
				var allItems = []
				for (let ls of rows) {
					const items = ls
					const checkName = await ItemModel.findOne({
						name: items.name,
					})
					if (checkName) {
						removeArray.push(items)
					} 
                    else {
						var Name = items.name
						items.name = Name
						allItems.push(items)
					}
				}

				if (errorArray.length > 0) {
					return handleError({ res, statusCode: 400, data: errorArray })
				}

				var finalArr = _.uniqBy(allItems, 'name')
				await ItemModel.insertMany(finalArr)
				return res.status(200).json({ msg: 'NFT items added successfully.' })
            }
        } catch (error) {
            return res.status(500).json({msg:"server Error"})
        }
    },
    checkController: async(req, res) => {
        try {
            return res.status(200).json({msg:"Check is working fine"})
        } catch (error) {
            return res.status(500).json({msg:"server Error"})
        }
    }
}