"use client";
import { ethers } from "ethers";
import React, { createContext, useState, useEffect, useContext } from 'react';

const RakshakSupplyContext = createContext();

const contractAddress = "0x3777c6f7597856fa46f24b8960c7d9a64a3d5f63";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_place",
				"type": "string"
			}
		],
		"name": "addDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_place",
				"type": "string"
			}
		],
		"name": "addManufacturer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_place",
				"type": "string"
			}
		],
		"name": "addRetailer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_place",
				"type": "string"
			}
		],
		"name": "addRMS",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "Distribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "Manufacturing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "Retail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "RMSsupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "sold",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "DIS",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "place",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disCtr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllMedicines",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "RMSid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "MANid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "DISid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "RETid",
						"type": "uint256"
					},
					{
						"internalType": "enum SupplyChain.STAGE",
						"name": "stage",
						"type": "uint8"
					}
				],
				"internalType": "struct SupplyChain.medicine[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "MAN",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "place",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manCtr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "medicineCtr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medicineIDs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "MedicineStock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "RMSid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "MANid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "DISid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "RETid",
				"type": "uint256"
			},
			{
				"internalType": "enum SupplyChain.STAGE",
				"name": "stage",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RET",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "place",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retCtr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "RMS",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "place",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rmsCtr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicineID",
				"type": "uint256"
			}
		],
		"name": "showStage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const RakshakSupplyProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const connectWallet = async () => {
            if (typeof window.ethereum !== "undefined") {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const accountAddress = await signer.getAddress();
                    const contract = new ethers.Contract(contractAddress, abi, signer);
    
                    setProvider(provider);
                    setSigner(signer);
                    setAccount(accountAddress);
                    setContract(contract);
                } catch (error) {
                    if (error.code === 4001) {
                        alert("Connection request was rejected.");
                    } else {
                        console.error("Error connecting to MetaMask:", error);
                    }
                }
            } else {
                alert("MetaMask is not installed. Please install MetaMask to use this feature.");
            }
        };
    
        useEffect(() => {
            const checkIfWalletConnected = async () => {
                if (typeof window.ethereum !== "undefined") {
                    try {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const accounts = await provider.listAccounts();
                        if (accounts.length > 0) {
                            const signer = provider.getSigner();
                            const accountAddress = accounts[0];
                            const contract = new ethers.Contract(contractAddress, abi, signer);
    
                            setProvider(provider);
                            setSigner(signer);
                            setAccount(accountAddress);
                            setContract(contract);
                        }
                    } catch (error) {
                        console.error("Error checking wallet connection:", error);
                    }
                }
            };
    
            checkIfWalletConnected();
        }, []);

        const addRawMaterialSupplier=async(address, name, place)=>{
            if(!contract)
            {
                console.log("Contract not loaded yet")
            }
            try {
                const trx = await contract.addRMS(address, name, place)
                await trx.wait()
                console.log("Added RMS")
            } catch (error) {
                console.log("Error in add RMS", error)
            }
        }

        const addManufacturer=async(address, name, place)=>{
            if(!contract)
            {
                console.log("Contract not loaded yet")
            }
            try {
                const trx = await contract.addManufacturer(address, name, place)
                await trx.wait()
                console.log("Added manufracturer")
            } catch (error) {
                console.log("Error in add manfactured", error)
            }
        }

        const addDistributor=async(address, name, place)=>{
            if(!contract)
            {
                console.log("Contract not loaded yet")
            }
            try {
                const trx = await contract.addDistributor(address, name, place)
                await trx.wait()
                console.log("Added distributor")
            } catch (error) {
                console.log("Error in add distributor", error)
            }
        }

        const addArmory=async(address, name, place)=>{
            if(!contract)
            {
                console.log("Contract not loaded yet")
            }
            try {
                const trx = await contract.addRetailer(address, name, place)
                await trx.wait()
                console.log("Added armory")
            } catch (error) {
                console.log("Error in add armory", error)
            }
        }

        const orderWeapons=async(name, description)=>{
            if(!contract){
                console.log("Contract not loaded yet")
            }
            try {
                const trx = await contract.addMedicine(name, description)
                await trx.wait()
                console.log("Added armory")
            } catch (error) {
                console.log("Error in order weapons", error)
            }
        }

        const getWeapons = async () => {
            if (!contract) {
                console.log("Contract not loaded");
                return;
            }
        
            try {
                const medicines = await contract.getAllMedicines();
                console.log(medicines)
                return medicines;
            } catch (error) {
                console.log("Error in getting medicines:", error);
            }
        };
        
		const RMSsupply=async()=>{
			if (!contract) {
                console.log("Contract not loaded");
                return;
            }
			try {
                const trx = await contract.RMSsupply();
                
                await trx.wait();
            } catch (error) {
                console.log("Error in getting medicines:", error);
            }
		}

        return (
            <RakshakSupplyContext.Provider
                value={{
                    provider,
                    signer,
                    account,
                    contract,
                    connectWallet,
                    addRawMaterialSupplier,
                    addManufacturer,
                    addDistributor,
                    addArmory,
                    orderWeapons,
                    getWeapons,
					RMSsupply
                }}
            >
                {children}
            </RakshakSupplyContext.Provider>
        );
}

export const useRakshakSupplyContext = () => {
    return useContext(RakshakSupplyContext);
};
