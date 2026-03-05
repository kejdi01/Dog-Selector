import AppLayout from "./components/layout/AppLayout";
import AppRouter from "./routes/routes";

const App = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default App;
