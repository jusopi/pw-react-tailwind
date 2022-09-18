import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../apis";
import { useRoute, useSetRoute } from "../DataProvider";

const SubwayCard = ({ viewdata }) => {
  const bgColor = viewdata?.attributes?.color || "ffffff";
  const txtColor = viewdata?.attributes?.text_color || "000000";

  const setRoute = useSetRoute();

  return (
    <button
      key={viewdata.id}
      style={{ backgroundColor: `#${bgColor}` }}
      className="rounded-lg shadow"
      onClick={() => {
        console.log("selected route", viewdata);
        setRoute(viewdata);
      }}
    >
      <div
        className="flex w-full items-center text-left justify-between space-x-6 p-6"
        style={{ color: `#${txtColor}` }}
      >
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-lg font-medium">
              {viewdata.attributes.long_name}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs text-black font-medium">
              {viewdata.id}
            </span>
          </div>
          <p className="mt-1 truncate text-sm ">
            {viewdata.attributes.direction_destinations?.join(" - ")}
          </p>
        </div>
      </div>
    </button>
  );
};

const SubwayLines = () => {
  const selectedRoute = useRoute();
  const setRoute = useSetRoute();
  const getSubwayLines = async (url) => {
    const rsp = await fetcher(url);
    return rsp.data;
  };
  const { data: listdata, error } = useSWR(
    "https://api-v3.mbta.com/routes?filter[type]=0,1",
    getSubwayLines
  );

  useEffect(() => {
    if (!selectedRoute && listdata) {
      setRoute(listdata[0]);
    }
  }, []);
  return (
    <ul role="list" className="flex flex-col gap-4 mb-4">
      {listdata?.map((obj) => (
        <SubwayCard viewdata={obj} />
      ))}
    </ul>
  );
};

export default SubwayLines;
