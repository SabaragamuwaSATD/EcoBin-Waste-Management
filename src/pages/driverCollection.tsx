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
  // const [newStatus,setNewStatus] = useState();

  // Function to handle status update
  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    let newStatus = "";

    // Determine the next status based on the current status
    if (currentStatus === "pending") {
      newStatus = "On the Way";
    } else if (currentStatus === "On the Way") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed"; // Final state
    }

    try {
      // Update status in the database via the API
      await axios.put(`http://localhost:5000/api/schedule/${id}/status`, { status: newStatus });

      // Fetch updated collection details from the backend
          // Optimistically update the status locally
    setCollections(prevCollections =>
      prevCollections.map(collection =>
        collection._id === id ? { ...collection, status: newStatus } : collection
      )
    );
      viewCollectionDetails();
    } catch (error) {
      console.error(`Error updating collection status to ${newStatus}`, error);
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
                className={`text-sm font-bold py-2 px-4 rounded ${
                  collection.status === "pending"
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : collection.status === "On the Way"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : collection.status === "In Progress"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-500 text-white"
                }`}
                onClick={() => handleUpdateStatus(collection._id, collection.status)}
                value={collection.status}
              >
                {collection.status === "pending"
                  ? "Accept"
                  : collection.status === "On the Way"
                  ? "On the Way"
                  : collection.status === "In Progress"
                  ? "In Progress"
                  : "Completed"}
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
