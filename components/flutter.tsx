"use client";

import { useEffect } from "react";

export default function FlutterApp() {
  useEffect(() => {
    // Load Flutter web app
    const script = document.createElement("script");
    script.src = "/ftr/main.dart.js";
    script.async = true;
    script.type = "application/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="flutter_target" className="w-full h-full">
      {/* Flutter app will be rendered here */}
      <p className="text-center">Flutter app</p>
    </div>
  );
}
