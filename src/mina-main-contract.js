import web3 from './web3';

const address = '0x7A6C29615eCF83B892FCcF3905799d2d9B738f91';

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "appName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "appLink",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "id",
				"type": "int256"
			}
		],
		"name": "enterApp",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "apps",
		"outputs": [
			{
				"internalType": "string",
				"name": "appName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "appLink",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "id",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getApps",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "appName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "appLink",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "id",
						"type": "int256"
					}
				],
				"internalType": "struct minaContract.App[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


export default new web3.eth.Contract(abi, address);
