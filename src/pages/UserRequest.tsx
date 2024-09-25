import { useEffect, useState } from "react";
import { Calendar as CalenderIcon } from "lucide-react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const UserRequests = () => {
  interface Collection {
    _id: string;
    wasteType: string;
    weight: string;
    location: string;
    status: string;
    createdAt: string;
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
      const res = await axios.get("http://localhost:5000/api/request");
      const sortedCollections = res.data.sort(
        (a: Collection, b: Collection) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setCollections(sortedCollections);
    } catch (error) {
      console.error("Error fetching Request details", error);
    }
  };

  useEffect(() => {
    viewCollectionDetails();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center lg:flex-row lg:items-start lg:justify-start">
      <div className="flex-1 w-full lg:w-auto">
        <h1 className="text-2xl font-bold mb-6">User Requests</h1>
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Requests</h2>
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-2"
              >
                <div className="flex items-center justify-between">
                  <CalenderIcon className="w-5 h-5 mr-4 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Garbage Type: {collection.wasteType}
                    </p>
                    <p className="text-sm text-gray-500">
                      Weight {collection.weight} kg
                    </p>
                    <p className="text-sm text-gray-500">
                      Location: {collection.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {collection.status}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-4">
                  <button
                    className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded hover:bg-yellow-600"
                    onClick={() =>
                      handleUpdateStatus(collection._id, "Accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded hover:bg-yellow-600"
                    onClick={() =>
                      handleUpdateStatus(collection._id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No upcoming collections</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRequests;
