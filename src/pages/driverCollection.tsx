import { useEffect, useState } from "react";
import { Calendar as CalenderIcon } from "lucide-react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DriverCollection = () => {
  interface Collection {
    _id: string;
    date: string;
    time: string;
    wasteType: string;
    weight: string;
    location: string;
    latitude: number;
    longitude: number;
    status: string;
  }

  const [collections, setCollections] = useState<Collection[]>([]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:5000/api/request/${id}`, { status });
      viewCollectionDetails();
    } catch (error) {
      console.error(`Error updating collection status to ${status}`, error);
    }
  };

  const viewCollectionDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/schedule");
      setCollections(res.data);
    } catch (error) {
      console.error("Error fetching collection details", error);
    }
  };

  useEffect(() => {
    viewCollectionDetails();
  }, []);

  // Sort collections by time
  const sortedCollections = collections.sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time}`);
    const timeB = new Date(`${b.date}T${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });

  const events = collections.map((collection) => ({
    title: collection.wasteType,
    start: new Date(collection.date + " " + collection.time),
    end: new Date(collection.date + " " + collection.time),
  }));

  return (
    <div className="mt-6 ml-7 mr-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upcoming Collections</h2>
      {sortedCollections.length > 0 ? (
        sortedCollections.map((collection, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-2"
          >
            <div className="flex items-center justify-between">
              <CalenderIcon className="w-5 h-5 mr-2 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Date : {collection.date} - Time : {collection.time}
                </p>
                <p className="text-sm text-gray-500">
                  Garbage Type: {collection.wasteType}
                </p>
                <p className="text-sm text-gray-500">
                  Weight {collection.weight} kg
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  Date : {collection.date}
                </p>
                <p className="text-sm text-gray-500">
                  {" "}
                  Location : {collection.location}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4">
              <button
                className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded hover:bg-yellow-600"
                onClick={() => handleUpdateStatus(collection._id, "On the Way")}
              >
                Accept
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No upcoming collections</p>
      )}
    </div>
  );
};

export default DriverCollection;
