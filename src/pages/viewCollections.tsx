import { useLocation } from "react-router-dom";

const ViewCollection = () => {
  const location = useLocation();
  const {
    _id,
    date,
    time,
    wasteType,
    weight,
    location: collectionLocation,
  } = location.state.collection;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">View Collections</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div key={_id} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">{wasteType}</h2>
          <p className="text-sm text-gray-500 mb-1">Date: {date}</p>
          <p className="text-sm text-gray-500 mb-1">Time: {time}</p>
          <p className="text-sm text-gray-500 mb-1">Weight: {weight} kg</p>
          <p className="text-sm text-gray-500 mb-1">
            Location: {collectionLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCollection;
