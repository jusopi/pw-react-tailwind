import useSWR from "swr";
import fetcher from "../apis";
import { useRoute } from "../DataProvider";

const StopListitem = ({ viewdata, bgColor = "000000" }) => {
  return (
    <li>
      <div class="flex items-center">
        <span
          class="w-6 h-6 rounded-full"
          style={{ backgroundColor: `#${bgColor}` }}
        ></span>
        <h5 class="ml-4 font-bold">{viewdata.attributes.name}</h5>
      </div>
    </li>
  );
};

const StopList = () => {
  const selectedRoute = useRoute();
  const getStops = async (url) => {
    const rsp = await fetcher(url);
    return rsp.data;
  };

  const { data: listdata, error } = useSWR(
    `https://api-v3.mbta.com/stops?filter[route]=${selectedRoute.id}`,
    getStops
  );

  const color = selectedRoute?.attributes?.color || "000000";

  return (
    <div class="space-y-4 mb-4">
      <h3 class="text-2xl font-bold" style={{ color: `#${color}` }}>
        {selectedRoute?.attributes?.long_name || "Select Route"}
      </h3>
      <div
        class="ml-4"
        style={{ borderLeft: "4px solid", borderColor: `#${color}` }}
      >
        <ul class="space-y-4 -ml-4">
          {listdata?.reverse().map((obj) => (
            <StopListitem viewdata={obj} bgColor={color} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StopList;
