import { useEffect, useState } from "react";
import { AlertCircle, Calendar as CalenderIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale/en-US";

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
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  interface Collection {
    _id: string;
    date: string;
    time: string;
    wasteType: string;
    weight: string;
    location: string;
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
      await axios.post("http://localhost:5000/api/schedule", {
        wasteType: wasteType,
        weight: weight,
        date: date,
        time: time,
        location: location,
      });
      setShowAlert(false);
    } catch (error) {
      console.error("Error scheduling collection", error);
    }
  };

  const viewCollectionDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/schedule/");
      setCollections(res.data);
    } catch (error) {
      console.error("Error fetching collection details", error);
    }
  };

  useEffect(() => {
    viewCollectionDetails();
  }, []);

  const events = collections.map((collection) => ({
    title: collection.wasteType,
    start: new Date(collection.date + " " + collection.time),
    end: new Date(collection.date + " " + collection.time),
  }));

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
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Schedule Collection
            </button>
          </form>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Collections</h2>
          {collections.length > 0 ? (
            collections.map((collection, index) => (
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
                  <div className="flex justify-end">
                    <button
                      className="text-yellow-500 hover:text-yellow-600 justify-end"
                      onClick={() =>
                        navigate("/viewCollections", { state: { collection } })
                      }
                    >
                      View Details
                    </button>
                  </div>
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
