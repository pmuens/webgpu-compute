const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  alert("WebGPU is not available on this machine...");
}
const device = await adapter.requestDevice();

const gpuWriteBuffer = device.createBuffer({
  mappedAtCreation: true,
  size: 4,
  usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC,
});

const arrayBuffer = gpuWriteBuffer.getMappedRange();
new Uint8Array(arrayBuffer).set([0, 1, 2, 3]);

gpuWriteBuffer.unmap();

const gpuReadBuffer = device.createBuffer({
  size: 4,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
});

const copyEncoder = device.createCommandEncoder();
copyEncoder.copyBufferToBuffer(gpuWriteBuffer, 0, gpuReadBuffer, 0, 4);

device.queue.submit([copyEncoder.finish()]);

await gpuReadBuffer.mapAsync(GPUMapMode.READ);
const copyArrayBuffer = gpuReadBuffer.getMappedRange();

console.log(new Uint8Array(copyArrayBuffer));
