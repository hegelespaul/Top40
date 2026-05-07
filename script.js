const videoSrcs = [
  "https://hepedroza.com/videosR/1.mp4",
  "https://hepedroza.com/videosR/2.mp4",
  "https://hepedroza.com/videosR/3.mp4",
  "https://hepedroza.com/videosR/4.mp4",
  "https://hepedroza.com/videosR/5.mp4",
  "https://hepedroza.com/videosR/6.mp4",
  "https://hepedroza.com/videosR/7.mp4",
  "https://hepedroza.com/videosR/8.mp4",
  "https://hepedroza.com/videosR/9.mp4",
  "https://hepedroza.com/videosR/10.mp4",
  "https://hepedroza.com/videosR/11.mp4",
  "https://hepedroza.com/videosR/12.mp4",
  "https://hepedroza.com/videosR/13.mp4",
  "https://hepedroza.com/videosR/14.mp4",
  "https://hepedroza.com/videosR/15.mp4",
  "https://hepedroza.com/videosR/16.mp4",
  "https://hepedroza.com/videosR/17.mp4",
  "https://hepedroza.com/videosR/18.mp4",
  "https://hepedroza.com/videosR/19.mp4",
  "https://hepedroza.com/videosR/20.mp4",
  "https://hepedroza.com/videosR/21.mp4",
  "https://hepedroza.com/videosR/22.mp4",
  "https://hepedroza.com/videosR/23.mp4",
  "https://hepedroza.com/videosR/24.mp4",
  "https://hepedroza.com/videosR/25.mp4",
  "https://hepedroza.com/videosR/26.mp4",
  "https://hepedroza.com/videosR/27.mp4",
  "https://hepedroza.com/videosR/28.mp4",
  "https://hepedroza.com/videosR/29.mp4",
  "https://hepedroza.com/videosR/30.mp4",
  "https://hepedroza.com/videosR/31.mp4",
  "https://hepedroza.com/videosR/32.mp4",
  "https://hepedroza.com/videosR/33.mp4",
  "https://hepedroza.com/videosR/34.mp4",
  "https://hepedroza.com/videosR/35.mp4",
  "https://hepedroza.com/videosR/36.mp4",
  "https://hepedroza.com/videosR/37.mp4",
  "https://hepedroza.com/videosR/38.mp4",
  "https://hepedroza.com/videosR/39.mp4",
  "https://hepedroza.com/videosR/40.mp4",
];

// Constants
const GRID_COLS = 8;
const GRID_ROWS = 5;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

// Setup WebGL
const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
if (!gl) alert('WebGL not supported');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);
resize();

// Vertex shader source
const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = a_position;
    v_texCoord = a_texCoord;
  }
`;

// Fragment shader with unrolled indexing
const fragmentShaderSource = `
precision mediump float;
uniform sampler2D u_video;
uniform vec2 u_gridSize;
uniform vec2 u_cropSize;
uniform float u_cropOffsets[80]; // 40 * 2 floats

varying vec2 v_texCoord;

vec2 getOffset(int index) {
  if (index == 0) return vec2(u_cropOffsets[0], u_cropOffsets[1]);
  else if (index == 1) return vec2(u_cropOffsets[2], u_cropOffsets[3]);
  else if (index == 2) return vec2(u_cropOffsets[4], u_cropOffsets[5]);
  else if (index == 3) return vec2(u_cropOffsets[6], u_cropOffsets[7]);
  else if (index == 4) return vec2(u_cropOffsets[8], u_cropOffsets[9]);
  else if (index == 5) return vec2(u_cropOffsets[10], u_cropOffsets[11]);
  else if (index == 6) return vec2(u_cropOffsets[12], u_cropOffsets[13]);
  else if (index == 7) return vec2(u_cropOffsets[14], u_cropOffsets[15]);
  else if (index == 8) return vec2(u_cropOffsets[16], u_cropOffsets[17]);
  else if (index == 9) return vec2(u_cropOffsets[18], u_cropOffsets[19]);
  else if (index == 10) return vec2(u_cropOffsets[20], u_cropOffsets[21]);
  else if (index == 11) return vec2(u_cropOffsets[22], u_cropOffsets[23]);
  else if (index == 12) return vec2(u_cropOffsets[24], u_cropOffsets[25]);
  else if (index == 13) return vec2(u_cropOffsets[26], u_cropOffsets[27]);
  else if (index == 14) return vec2(u_cropOffsets[28], u_cropOffsets[29]);
  else if (index == 15) return vec2(u_cropOffsets[30], u_cropOffsets[31]);
  else if (index == 16) return vec2(u_cropOffsets[32], u_cropOffsets[33]);
  else if (index == 17) return vec2(u_cropOffsets[34], u_cropOffsets[35]);
  else if (index == 18) return vec2(u_cropOffsets[36], u_cropOffsets[37]);
  else if (index == 19) return vec2(u_cropOffsets[38], u_cropOffsets[39]);
  else if (index == 20) return vec2(u_cropOffsets[40], u_cropOffsets[41]);
  else if (index == 21) return vec2(u_cropOffsets[42], u_cropOffsets[43]);
  else if (index == 22) return vec2(u_cropOffsets[44], u_cropOffsets[45]);
  else if (index == 23) return vec2(u_cropOffsets[46], u_cropOffsets[47]);
  else if (index == 24) return vec2(u_cropOffsets[48], u_cropOffsets[49]);
  else if (index == 25) return vec2(u_cropOffsets[50], u_cropOffsets[51]);
  else if (index == 26) return vec2(u_cropOffsets[52], u_cropOffsets[53]);
  else if (index == 27) return vec2(u_cropOffsets[54], u_cropOffsets[55]);
  else if (index == 28) return vec2(u_cropOffsets[56], u_cropOffsets[57]);
  else if (index == 29) return vec2(u_cropOffsets[58], u_cropOffsets[59]);
  else if (index == 30) return vec2(u_cropOffsets[60], u_cropOffsets[61]);
  else if (index == 31) return vec2(u_cropOffsets[62], u_cropOffsets[63]);
  else if (index == 32) return vec2(u_cropOffsets[64], u_cropOffsets[65]);
  else if (index == 33) return vec2(u_cropOffsets[66], u_cropOffsets[67]);
  else if (index == 34) return vec2(u_cropOffsets[68], u_cropOffsets[69]);
  else if (index == 35) return vec2(u_cropOffsets[70], u_cropOffsets[71]);
  else if (index == 36) return vec2(u_cropOffsets[72], u_cropOffsets[73]);
  else if (index == 37) return vec2(u_cropOffsets[74], u_cropOffsets[75]);
  else if (index == 38) return vec2(u_cropOffsets[76], u_cropOffsets[77]);
  else if (index == 39) return vec2(u_cropOffsets[78], u_cropOffsets[79]);
  else return vec2(0.0, 0.0);
}

void main() {
  vec2 gridPos = floor(v_texCoord * u_gridSize);
  int index = int(gridPos.y) * int(u_gridSize.x) + int(gridPos.x);
  vec2 offset = getOffset(index);
  vec2 localUV = fract(v_texCoord * u_gridSize);
  vec2 sampleUV = offset + localUV * u_cropSize;
  gl_FragColor = texture2D(u_video, sampleUV);
}
`;

// Compile shaders & create program
function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(vsSource, fsSource) {
  const vs = compileShader(gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

const program = createProgram(vertexShaderSource, fragmentShaderSource);
gl.useProgram(program);

// Attributes and uniforms locations
const posLoc = gl.getAttribLocation(program, 'a_position');
const texLoc = gl.getAttribLocation(program, 'a_texCoord');
const gridSizeLoc = gl.getUniformLocation(program, 'u_gridSize');
const cropSizeLoc = gl.getUniformLocation(program, 'u_cropSize');
const cropOffsetsLoc = gl.getUniformLocation(program, 'u_cropOffsets');
const videoTexLoc = gl.getUniformLocation(program, 'u_video');

// Fullscreen quad buffers
const posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1,
]), gl.STATIC_DRAW);

const texBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  0, 1,
  1, 1,
  0, 0,
  0, 0,
  1, 1,
  1, 0,
]), gl.STATIC_DRAW);

// Enable attributes
gl.enableVertexAttribArray(posLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(texLoc);
gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

// Setup video element
const video = document.getElementById('source_video');
video.muted = false;
video.loop = true;
video.playsInline = true;
video.autoplay = true;

// Setup video texture
let videoTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, videoTexture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

gl.uniform2f(gridSizeLoc, GRID_COLS, GRID_ROWS);
gl.uniform2f(cropSizeLoc, 1 / GRID_COLS, 1 / GRID_ROWS);

let cropOffsets = new Float32Array(TOTAL_CELLS * 2);
function generateRandomCropOffsets() {
  for (let i = 0; i < TOTAL_CELLS; i++) {
    cropOffsets[i * 2] = Math.random() * (1 - 1 / GRID_COLS);
    cropOffsets[i * 2 + 1] = Math.random() * (1 - 1 / GRID_ROWS);
  }
  gl.useProgram(program);
  gl.uniform1fv(cropOffsetsLoc, cropOffsets);
}

generateRandomCropOffsets();

let pitchShift, player, reverb;
let remainingAudioIndices = [];

function refillAudioUrn() {
  remainingAudioIndices = [...Array(videoSrcs.length).keys()];
  shuffleArray(remainingAudioIndices);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function playRandomAudioWithPitch() {
  await Tone.start();

  if (remainingAudioIndices.length === 0) refillAudioUrn();

  const audioIndex = remainingAudioIndices.pop();
  const audioSrc = videoSrcs[audioIndex];
  const blobUrl = await fetchAsBlobURL(audioSrc);

  if (pitchShift) pitchShift.dispose();
  if (reverb) reverb.dispose();
  if (player) player.dispose();

  reverb = new Tone.Reverb({ decay: 5, preDelay: 0.5, gain: 3 }).toDestination();
  await reverb.generate();

  pitchShift = new Tone.PitchShift({
    pitch: Math.floor(Math.random() * 6) - Math.floor(Math.random() * 6) - 1,
  }).connect(reverb);

  player = new Tone.Player({
    url: blobUrl,
    autostart: true,
    loop: false,
    onload: () => player.connect(pitchShift),
    onstop: () => {
      URL.revokeObjectURL(blobUrl);
      playRandomAudioWithPitch();
    }
  });
}

let visualIntervalId = null;
let urn = [];
let urnIndex = 0;

async function fetchAsBlobURL(src) {
  const response = await fetch(src, { cache: "no-store" });
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

function startVisualLoop() {
  // Initialize the urn before starting
  urn = shuffleArray([...Array(videoSrcs.length).keys()]);
  urnIndex = 0;
  
  visualIntervalId = setInterval(() => {
    (async () => {
      if (urnIndex >= urn.length) {
        urn = shuffleArray([...Array(videoSrcs.length).keys()]);
        urnIndex = 0;
      }

      const idx = urn[urnIndex++];
      video.crossOrigin = "anonymous";

      const videoBlobUrl = await fetchAsBlobURL(videoSrcs[idx]);

      if (video.src) {
        URL.revokeObjectURL(video.src);
      }

      video.pause();
      video.src = videoBlobUrl;
      video.load();
      video.muted = true;

      video.onloadedmetadata = () => {
        const duration = video.duration;
        const maxStart = Math.max(0, duration - 5);
        const randomStart = Math.random() * maxStart;

        video.currentTime = randomStart;

        video.onseeked = () => {
          video.loop = true;
          video.play();
          generateRandomCropOffsets();

          video.onseeked = null;
          video.onloadedmetadata = null;
        };
      };
    })();
  }, 5000);
}

// Setup MediaPipe Pose
const pose = new Pose({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

pose.onResults((results) => {
  if (!results.poseLandmarks) return;

  const leftWrist = results.poseLandmarks[15];
  const rightWrist = results.poseLandmarks[16];

  if (leftWrist.y < 0.3 && rightWrist.y < 0.3) {
    generateRandomCropOffsets();
  }
});

const inputVideo = document.getElementById('input_video');
let camera;

function startCamera() {
  camera = new Camera(inputVideo, {
    onFrame: async () => {
      await pose.send({ image: inputVideo });
    },
    width: 640,
    height: 480,
  });
  camera.start();
}

let animationFrameId = null;

function render() {
  if (video.readyState >= video.HAVE_CURRENT_DATA) {
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, video);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  animationFrameId = requestAnimationFrame(render);
}

video.addEventListener('play', () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (videoTexture) {
    gl.deleteTexture(videoTexture);
  }
  videoTexture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, videoTexture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    video.videoWidth,
    video.videoHeight,
    0,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    null
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  render();
});

// Fullscreen function
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

// Start button event
document.getElementById('startButton').addEventListener('click', async () => {
  // Hide start screen
  document.getElementById('startScreen').style.display = 'none';
  document.body.style.cursor = 'none'; // Hide cursor
  
  // Enter fullscreen
  enterFullscreen();
  
  // Start audio
  await playRandomAudioWithPitch();
  
  // Start visual loop
  startVisualLoop();
  
  // Start camera
  startCamera();
});