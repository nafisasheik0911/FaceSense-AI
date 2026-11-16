const video = document.getElementById("video");
const canvas = document.getElementById("captureCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const placeholder = document.getElementById("placeholder");
const scanFrame = document.getElementById("scanFrame");
const feedState = document.getElementById("feedState");
const dominantEmotion = document.getElementById("dominantEmotion");
const emotionEmoji = document.getElementById("emotionEmoji");
const resultHint = document.getElementById("resultHint");
const scoreList = document.getElementById("scoreList");
const analysisStatus = document.getElementById("analysisStatus");
let stream = null;
let timer = null;
let busy = false;
const emojiMap = {happy:"😊",sad:"😢",angry:"😠",surprise:"😲",fear:"😨",disgust:"😖",neutral:"😐"};

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:false});
    video.srcObject = stream;
    video.style.display = "block";
    placeholder.style.display = "none";
    scanFrame.style.display = "block";
    feedState.textContent = "CAMERA ACTIVE";
    analysisStatus.textContent = "Camera connected • starting AI";
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timer = setInterval(analyzeFrame, 1800);
  } catch (err) {
    analysisStatus.textContent = "Camera unavailable. Allow camera permission and try again.";
    resultHint.textContent = "Check browser camera permission and make sure no other app is using it.";
  }
}
function stopCamera() {
  if (timer) clearInterval(timer);
  timer = null;
  if (stream) stream.getTracks().forEach(track => track.stop());
  stream = null;
  video.srcObject = null;
  video.style.display = "none";
  placeholder.style.display = "flex";
  scanFrame.style.display = "none";
  feedState.textContent = "STANDBY";
  analysisStatus.textContent = "AI engine is idle";
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
async function analyzeFrame() {
  if (busy || !video.videoWidth) return;
  busy = true;
  try {
    canvas.width = 480;
    canvas.height = Math.round(480 * video.videoHeight / video.videoWidth);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const response = await fetch("/analyze", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({image:canvas.toDataURL("image/jpeg",0.78)})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not analyse frame.");
    dominantEmotion.textContent = data.emotion;
    emotionEmoji.textContent = emojiMap[data.emotion.toLowerCase()] || "✦";
    resultHint.textContent = "AI estimate from the latest camera frame.";
    renderScores(data.scores || {});
    analysisStatus.textContent = "Analysis updated just now";
  } catch (err) {
    analysisStatus.textContent = err.message;
  } finally {
    busy = false;
  }
}
function renderScores(scores) {
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  scoreList.innerHTML = sorted.map(([name,value]) => `
    <div class="score-row">
      <span>${name}</span>
      <div class="bar"><div class="bar-fill" style="width:${Math.max(0,Math.min(100,value))}%"></div></div>
      <span class="score-value">${Number(value).toFixed(1)}%</span>
    </div>`).join("");
}
startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
window.addEventListener("beforeunload", stopCamera);
