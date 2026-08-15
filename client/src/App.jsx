import React from "react";
import { router } from "./app.routes.jsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import { ThemeProvider } from "./context/theme.context.jsx";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
