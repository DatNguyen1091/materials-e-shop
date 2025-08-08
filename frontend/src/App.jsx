import AppRoutes from "./routes/AppRoutes"
import { StoreProvider } from "./store/index.jsx"

function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  )
}

export default App
