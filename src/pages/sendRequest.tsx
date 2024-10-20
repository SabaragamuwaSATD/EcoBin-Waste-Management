import { useEffect, useState } from "react";
import { AlertCircle, Calendar as CalenderIcon } from "lucide-react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const SendRequest = () => {
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // State for editing

  interface Collection {
    _id: string;
    wasteType: string;
    weight: string;
    location: string;
    status: string;
    createdAt: string;
  }

  const [collections, setCollections] = useState<Collection[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wasteType === "" || weight === "" || location === "") {
      setShowAlert(true);
      return;
    }
    try {
      if (editingId) {
        // Update existing collection
        await axios.put(`http://localhost:5000/api/request/${editingId}`, {
          wasteType,
          weight,
          location,
        });
      } else {
        // Create new collection
        await axios.post("http://localhost:5000/api/request", {
          wasteType,
          weight,
          location,
        });
      }
      viewCollectionDetails();
      setShowAlert(false);

      // Clear the form fields
      setWasteType("");
      setWeight("");
      setLocation("");
      setEditingId(null); // Reset editing state
    } catch (error) {
      console.error("Error Request collection", error);
    }
  };

  const handleUpdate = (collection: Collection) => {
    setWasteType(collection.wasteType);
    setWeight(collection.weight);
    setLocation(collection.location);
    setEditingId(collection._id); // Set the ID of the collection being edited
  };

  const handleCancelUpdate = () => {
    setWasteType("");
    setWeight("");
    setLocation("");
    setEditingId(null); // Reset editing state
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/request/${id}`);
      viewCollectionDetails();
    } catch (error) {
      console.error("Error deleting collection", error);
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
    <div className=" p-6 flex flex-col items-center lg:flex-row lg:items-start lg:justify-start">
      <div className="flex-1 w-full lg:w-auto">
        <h1 className="text-2xl font-bold mb-6">Schedule Collection</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            {showAlert && (
              <div
                style={{
                  color: "orange",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AlertCircle size={24} />
                <span style={{ marginLeft: "8px" }}>
                  All fields are required
                </span>
              </div>
            )}
            <div className="mb-4 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Waste Type
              </label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              >
                <option value="">Select waste type</option>
                <option value="plastic">Plastic</option>
                <option value="organic">Organic</option>
                <option value="metal">Metal</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="string"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {editingId ? "Update Request" : "Send Request"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  onClick={handleCancelUpdate}
                >
                  Cancel Update
                </button>
              )}
            </div>
          </form>
        </div>
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
                      {" "}
                      Location : {collection.location}
                    </p>
                    <p
                      className={`text-sm ${
                        collection.status === "Accepted"
                          ? "text-green-500"
                          : collection.status === "Rejected"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Status: {collection.status}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between space-y-4">
                  <button
                    className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded  hover:bg-yellow-600"
                    onClick={() => handleUpdate(collection)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded  hover:bg-yellow-600"
                    onClick={() => handleDelete(collection._id)}
                  >
                    Delete
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

export default SendRequest;
