import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1a1a2e",
        border: "1px solid #e74c3c",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        maxWidth: "90vw",
      }}
    >
      <span style={{ fontSize: "28px" }}>🎬</span>
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            color: "white",
            fontSize: "14px",
          }}
        >
          Install MovieApp
        </p>
        <p style={{ margin: 0, color: "gray", fontSize: "12px" }}>
          Add to home screen for the best experience
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
        <button
          onClick={() => setShowBanner(false)}
          style={{
            padding: "8px 14px",
            backgroundColor: "transparent",
            color: "gray",
            border: "1px solid gray",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Not now
        </button>
        <button
          onClick={handleInstall}
          style={{
            padding: "8px 14px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          Install
        </button>
      </div>
    </div>
  );
}
