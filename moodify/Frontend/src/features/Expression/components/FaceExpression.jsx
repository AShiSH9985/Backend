import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [emotion, setEmotion] = useState("Click detect");

  // emotion logic
  const getEmotion = (blendshapes) => {
    const get = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile = (get("mouthSmileLeft") + get("mouthSmileRight")) / 2;
    const frown = (get("mouthFrownLeft") + get("mouthFrownRight")) / 2;
    const jawOpen = get("jawOpen");
    const mouthOpen = get("mouthOpen");
    const eyeWide = (get("eyeWideLeft") + get("eyeWideRight")) / 2;

    if (smile > 0.55) return "😊 Happy";

    if ((jawOpen > 0.2 || mouthOpen > 0.2) && eyeWide > 0.015)
      return "😮 Surprised";

    if (frown > 0.01) return "😢 Sad";

    return "😐 Neutral";
  };

  // detect only once
  const detect = () => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const result = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    );

    if (result.faceBlendshapes.length > 0) {
      const shapes = result.faceBlendshapes[0].categories;
      const emotionDetected = getEmotion(shapes);
      setEmotion(emotionDetected);
    } else {
      setEmotion("No face detected");
    }
  };

  useEffect(() => {
    const setup = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
      });

      startCamera();
    };

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    setup();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Face Emotion Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="500"
        height="380"
        style={{
          borderRadius: "10px",
          border: "2px solid black",
        }}
      />

      <h3 style={{ marginTop: "20px" }}>Emotion: {emotion}</h3>

      <button
        onClick={detect}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Detect Expression
      </button>
    </div>
  );
}