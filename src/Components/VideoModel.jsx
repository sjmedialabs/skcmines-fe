
import { useEffect, useRef } from "react"

const XIcon = () => (
  <svg
    className="x-icon"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

export default function VideoModal({ isOpen, onClose, videoSrc }) {
  const videoRef = useRef(null)

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Attempt to autoplay video
      if (videoRef.current) {
        videoRef.current.play().catch((err) =>
          console.log("Autoplay prevented:", err)
        )
      }
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <style>
        {`
          .video-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }

          .video-modal-container {
            position: relative;
            background: #000;
            border-radius: 0.5rem;
            max-width: 64rem; /* ~max-w-4xl */
            width: 100%;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .video-modal-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 10;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 0.5rem;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .video-modal-close-btn:hover {
            background: rgba(0, 0, 0, 0.7);
          }

          .video-modal-video-wrapper {
            width: 100%;
            height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .video-modal-video-wrapper video {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: contain;
            background: #000;
          }

          .x-icon {
            width: 24px;
            height: 24px;
          }
        `}
      </style>

      <div className="video-modal-overlay">
        <div className="video-modal-container">
          <button onClick={onClose} className="video-modal-close-btn">
            <XIcon />
          </button>

          <div className="video-modal-video-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              muted
              onError={(e) => console.log("Video failed to load:", e)}
              onLoadedData={() => console.log("Video loaded")}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </>
  )
}
