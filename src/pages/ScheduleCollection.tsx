import { useEffect, useState } from "react";
import { AlertCircle, Calendar as CalenderIcon } from "lucide-react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale/en-US";
import opencage from "opencage-api-client";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const ScheduleCollection = () => {
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  interface User {
    _id: string;
    firstName: string;
    role: string;
    email: string;
  }

  const [drivers, setDrivers] = useState<User[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null); // State for editing
  const [originalLocation, setOriginalLocation] = useState<string | null>(null);

  interface Collection {
    _id: string;
    date: string;
    time: string;
    wasteType: string;
    weight: string;
    location: string;
    latitude: number;
    longitude: number;
    driver: User;
  }

  const [collections, setCollections] = useState<Collection[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      wasteType === "" ||
      weight === "" ||
      date === "" ||
      time === "" ||
      location === ""
    ) {
      setShowAlert(true);
      return;
    }
    try {
      const driverDetails = drivers.find(
        (driver) => driver._id === selectedDriver
      );

      if (editingId) {
        let lat = latitude;
        let lng = longitude;

        if (location !== originalLocation) {
          const response = await opencage.geocode({
            key: "2182d47359f14bed9aa78e8c28690b67",
            q: location,
          });

          if (response.results.length > 0) {
            lat = response.results[0].geometry.lat;
            lng = response.results[0].geometry.lng;
            setLatitude(lat);
            setLongitude(lng);
          }
        }

        await axios.put(`http://localhost:5000/api/schedule/${editingId}`, {
          wasteType: wasteType,
          weight: weight,
          date: date,
          time: time,
          location: location,
          latitude: lat,
          longitude: lng,
          driver: driverDetails,
        });
      } else {
        const response = await opencage.geocode({
          key: "2182d47359f14bed9aa78e8c28690b67",
          q: location,
        });

        if (response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry;
          setLatitude(lat);
          setLongitude(lng);

          await axios.post("http://localhost:5000/api/schedule", {
            wasteType: wasteType,
            weight: weight,
            date: date,
            time: time,
            location: location,
            latitude: lat,
            longitude: lng,
            driver: driverDetails,
          });
        } else {
          console.error("No results found for the entered location");
        }
      }
      viewCollectionDetails();
      setShowAlert(false);
      setWasteType("");
      setWeight("");
      setLocation("");
      setDate("");
      setTime("");
      setEditingId(null);
    } catch (error) {
      console.error("Error scheduling collection", error);
    }
  };

  const handleUpdate = (collection: Collection) => {
    setWasteType(collection.wasteType);
    setWeight(collection.weight);
    setDate(collection.date);
    setTime(collection.time);
    setLocation(collection.location);
    setLatitude(collection.latitude);
    setLongitude(collection.longitude);
    setEditingId(collection._id); // Set the ID of the collection being edited
    setOriginalLocation(collection.location); // Set the ID of the collection being edited
  };

  const handleCancelUpdate = () => {
    setWasteType("");
    setWeight("");
    setLocation("");
    setDate("");
    setTime("");
    setEditingId(null); // Reset editing state
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedule/${id}`);
      viewCollectionDetails();
    } catch (error) {
      console.error("Error deleting collection", error);
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
    fetchDrivers();
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

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const drivers = response.data.filter(
        (user: User) => user.role === "driver"
      );
      setDrivers(drivers);
      console.log(drivers);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

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
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Driver
              </label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option
                    key={driver._id}
                    value={driver._id}
                    className="text-black"
                  >
                    {driver ? driver.firstName : "Driver Name"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {editingId ? "Update Collection" : "Schedule Collection"}
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
      <div className="mt-6 lg:mt-0 lg:ml-8 lg:mr-10 w-full lg:w-auto">
        <h2 className="text-xl font-semibold mb-4">Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month", "week", "day"]}
          defaultView="month"
          onSelectEvent={(event: { title: string }) => alert(event.title)}
        />
      </div>
    </div>
  );
};

export default ScheduleCollection;
