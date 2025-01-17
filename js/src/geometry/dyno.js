load_manager.set_loader('dyno', ['ground'], function() {
  let parser = new vox.Parser();
  let frames = [];
  let framesCount = 7; // including 0

  for(let i = 0; i <= framesCount; i++) {
    // load all .vox frames
    parser.parse('https://pages.klash.dev/ChromeDino3D/' + 'objects/t-rex/' + i + '.vox').then(function(voxelData) {
      let builder = new vox.MeshBuilder(voxelData, {voxelSize: .1});
      let material = new THREE.MeshLambertMaterial();
      material.map = vox.MeshBuilder.textureFactory.getTexture(voxelData);

      builder.material = material;
      let dyno = builder.createMesh();

      dyno.castShadow = true;

      frames[i] = dyno;

      if(frames.length - 1 == framesCount) {
        load_manager.set_mesh('dyno', frames);
        load_manager.set_status('dyno', true);

        player.setPlayerFrames(load_manager.get_vox('dyno'));
      }
    });
  }
});