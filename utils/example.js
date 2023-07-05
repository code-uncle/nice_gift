const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list 
const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
console.log( verifyProof(proof, name, root) ); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
var fake_name = "Jeanne Von";
console.log(niceList)
var fake_index = niceList.findIndex(n => n === fake_name);
var fake_proof = merkleTree.getProof(33)
console.log(fake_proof)
console.log( verifyProof(fake_proof, fake_name, root) ); // false, non-matching proof and name
