const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  // Randomly select a name from the nice list - its a lucky draw!
  // Obtain the length of the nice list
  var nice_list_length = niceList.length;
  console.log(nice_list_length);
  var rand = Math.floor(Math.random() * (nice_list_length - 1));
  console.log("Random Selected Nice Person: " + niceList[rand]);
  var nice_person = niceList[rand];
  // Craft the Merkle Tree and get the proof
  var mk_tree = new MerkleTree(niceList);

  // Take the index of the selected person
  var index = rand;
  // Obtain the proof (with error checking)
  if (index >= 0 && index <= nice_list_length - 1) {
    var mk_proof = mk_tree.getProof(index);
    axios.post(`${serverUrl}/gift`, {
      proof: mk_proof,
      name: nice_person
    }).then((gift) => {
      console.log(gift['data']);
    });
  }
}

main();