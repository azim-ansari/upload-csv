module.exports = {
    //nftItems_excel_head
    nftItems_excel_head:[
        'START DATE',
        'NUMBER OF STUDENTS',
        'NAME',
        'COURSE TITLE',
        'CONTACT',
        'STATUS',
        'ADDRESS',
        'IMAGE'
    ],
    //nft excel schema
    nftItemsExcelSchema: {
		'NUMBER OF STUDENTS': {
			prop: 'numOfStudets',
			type: String,
			required: false,
		},
		NAME: {
			prop: 'name',
			type: String,
			required: false,
		},
		'COURSE TITLE': {
			prop: 'courseTitle',
			type: String,
			required: true,
		},
		ADDRESS: {
			prop: 'address',
			type: String,
			required: false,
		},
		CONTACT: {
			prop: 'contact',
			type: Number,
			required: true,
		},
		STATUS: {
			prop: 'status',
			type: String,
			required: true,
		},
	},
}