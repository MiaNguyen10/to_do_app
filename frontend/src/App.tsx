import { RouterProvider } from "react-router";
import "./App.css";
import router from "@/routes/routes";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-center"
        toastOptions={{
          className: "toaster group",
          style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties,
        }
      }
      />
    </>
  );
}

export default App;
