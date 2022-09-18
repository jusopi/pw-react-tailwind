import "./App.css";
import StopList from "./components/StopList";
import SubwayLines from "./components/SubwayLines";
import { useRoute } from "./DataProvider";

function App() {
  return (
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12 ">
      <img
        src="/img/beams.jpg"
        alt=""
        class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        width="1308"
      />
      <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10 min-w-[50%]">
        <div class="mx-auto flex flex-row space-x-4">
          <div class="flex-1">
            <SubwayLines />
          </div>
          <div class="flex-1">
            <StopList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
