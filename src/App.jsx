import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-700 flex items-center justify-center p-4">
        <WeatherCard />
      </div>
    </>
  );
}

export default App;
