import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/routes";

export default function App() {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}
