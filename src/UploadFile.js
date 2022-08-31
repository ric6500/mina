import web3 from './web3';

const address = '0xD4be897D7fcd620286A794282A63255c4adf2058';

const abi = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "hashes",
				"type": "string[]"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


export default new web3.eth.Contract(abi, address);
