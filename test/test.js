const IPFS = require('ipfs');

describe('IPFS', function() {
  it('ipfs doesnt work', (done) => {
    var ipfs = new IPFS();
    ipfs.on('ready', async() => {
      
      var catalog = await ipfs.object.put({
        Data: Buffer.from(''),
        Links: []
      });
      
      var newDAG = await ipfs.object.put({
        Data: Buffer.from('test'),
        Links: []
      });
      
      catalog = await ipfs.object.patch.addLink(catalog.toJSON().multihash, {
        size: newDAG.toJSON().size,
        multihash: newDAG.toJSON().multihash,
      });

      catalog = await ipfs.object.get(catalog.toJSON().multihash);

      newDAG = await ipfs.object.put({
        Data: Buffer.from('test'),
        Links: []
      });

      catalog = await ipfs.object.patch.addLink(catalog.multihash, {
        name: "dupa",
        size: newDAG.toJSON().size,
        multihash: newDAG.toJSON().multihash,
      });

      ipfs.stop(done);
    });
  });
});