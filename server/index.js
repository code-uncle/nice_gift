const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree'); // Import MerkleTree from utils
const niceList = require('../utils/niceList'); // import niceList 'gen' from utils

const port = 1225;

const app = express();
app.use(express.json());

console.log("Nice List Length:"+niceList.length) // Confirm the length of the niceList
// Generate the merkle tree of the niceList and obtain only the merkle tree root using the getRoot() fn.
const merkle_tree_root = new MerkleTree(niceList).getRoot();
console.log(merkle_tree_root);
// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = merkle_tree_root;

app.post('/gift', (req, res) => { // This is the POST function call that the client will execute
  // grab the parameters from the front-end here
  const body = req.body;
  var client_proof = body.proof; // grab proof from client
  var name = body.name; // grab name from client
  console.log("New Request {}:{}",client_proof, name);
  var isInTheList = verifyProof(client_proof, name, MERKLE_ROOT); // Server's job is simply to verify & issue gifts
  // const isInTheList = false;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
