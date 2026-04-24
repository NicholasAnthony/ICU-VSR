import { useEffect, useRef, useState } from "react";

const DEFAULT_API = "https://Nikachu86-icu-vsr-backend.hf.space/vsr";
const CLIP_SECONDS = 3;

function Button({ children, disabled, onClick, className = "" }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-3 rounded-xl font-semibold bg-black text-white disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [apiUrl, setApiUrl] = useState(DEFAULT_API);
  const [cameraOn, setCameraOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [clipUrl, setClipUrl] = useState("");

  async function startCamera() {
    setError("");
    setStatus("Requesting camera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setCameraOn(true);
      setStatus("Camera active");
    } catch (e) {
      setError(e.message);
      setStatus("Camera failed");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setRecording(false);
    setStatus("Camera stopped");
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) return;

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });

      const url = URL.createObjectURL(blob);
      setClipUrl(url);

      await sendToBackend(blob);
    };

    recorder.start();
    setRecording(true);
    setStatus("Recording...");

    setTimeout(() => stopRecording(), CLIP_SECONDS * 1000);
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
    setStatus("Processing...");
  }

  async function sendToBackend(blob) {
    setTranscript("");
    setStatus("Sending to Auto-AVSR...");

    try {
      const form = new FormData();
      form.append("video", blob);

      const res = await fetch(apiUrl, {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!data.transcript) throw new Error("No transcript returned");

      setTranscript(data.transcript);
      setStatus("Done");

      speak(data.transcript);
    } catch (e) {
      setError(e.message);
      setStatus("Failed");
    }
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50 text-black">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">ICU Silent Speak</h1>

        <input
          className="w-full p-2 border rounded"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />

        {error && <div className="text-red-600">{error}</div>}

        <video
          ref={videoRef}
          className="w-full bg-black rounded"
          playsInline
          muted
        />

        <div className="flex gap-2">
          {!cameraOn ? (
            <Button onClick={startCamera}>Start Camera</Button>
          ) : (
            <Button onClick={stopCamera}>Stop Camera</Button>
          )}

          {!recording ? (
            <Button disabled={!cameraOn} onClick={startRecording}>
              Record
            </Button>
          ) : (
            <Button onClick={stopRecording}>Stop</Button>
          )}
        </div>

        <div>Status: {status}</div>

        {clipUrl && (
          <video src={clipUrl} controls className="w-full rounded" />
        )}

        {transcript && (
          <div className="p-4 bg-white rounded shadow">
            <div className="text-xl font-bold">{transcript}</div>
          </div>
        )}
      </div>
    </div>
  );
}
