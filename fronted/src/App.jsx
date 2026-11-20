import { RouterProvider } from "react-router";
import { router } from "./app.route";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;