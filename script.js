const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const output = document.getElementById("output");
const ctx = canvas.getContext("2d");
let scanning = false;

function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } }) // Sử dụng camera phía sau nếu có
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error accessing the camera:", error);
    });
}

function scanBarcode() {
  if (!scanning) {
    scanning = true;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      output.innerHTML = "Mã vạch: " + code.data;
    } else {
      output.innerHTML = "Không tìm thấy mã vạch.";
    }

    scanning = false;
  }

  requestAnimationFrame(scanBarcode);
}

startCamera();
scanBarcode();
