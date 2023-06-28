const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  alert("WebGPU is not available on this machine...");
}
const device = await adapter.requestDevice();

const gpuBuffer = device.createBuffer({
  mappedAtCreation: true,
  size: 4,
  usage: GPUBufferUsage.MAP_WRITE,
});

const arrayBuffer = gpuBuffer.getMappedRange();
new Uint8Array(arrayBuffer).set([0, 1, 2, 3]);

console.log(arrayBuffer);
