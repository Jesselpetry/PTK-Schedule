"use client";

import { useEffect, useState } from "react";
import SelectionPanel from "./components/SelectionPanel";
import TimetableView from "./components/TimetableView";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { DropdownOption } from "./components/Dropdown";
import Header from "./components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface ScheduleItem {
  room: string;
  program: string;
  day: string;
  period: number | string;
  subject_id: string;
  room_id?: string;
  teacher_name?: string;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayTH = {
  Monday: "จันทร์",
  Tuesday: "อังคาร",
  Wednesday: "พุธ",
  Thursday: "พฤหัส",
  Friday: "ศุกร์",
};

const periods = [
  { num: 1, time: "08:30-09:20" },
  { num: 2, time: "09:20-10:10" },
  { num: 3, time: "10:10-11:00" },
  { num: 4, time: "11:00-11:50" },
  { num: 5, time: "11:50-12:40" },
  { num: 6, time: "12:40-13:30" },
  { num: 7, time: "13:30-14:20" },
  { num: 8, time: "14:20-15:10" },
  { num: 9, time: "15:10-16:00" },
  { num: 10, time: "16:00-16:50" },
];

// Available class levels (ม.1 through ม.6)
const DEFAULT_CLASS_LEVELS: DropdownOption[] = [
  { id: 1, name: "ม.1", value: "1" },
  { id: 2, name: "ม.2", value: "2" },
  { id: 3, name: "ม.3", value: "3" },
  { id: 4, name: "ม.4", value: "4" },
  { id: 5, name: "ม.5", value: "5" },
  { id: 6, name: "ม.6", value: "6" },
];

  const currentYear = new Date().getFullYear();

export default function Home() {
  const [data, setData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Dropdown options state
  const [classLevelOptions] = useState<DropdownOption[]>(DEFAULT_CLASS_LEVELS);
  const [selectedClassLevel, setSelectedClassLevel] = useState<DropdownOption>(
    DEFAULT_CLASS_LEVELS[0]
  );
  const [roomOptions, setRoomOptions] = useState<DropdownOption[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<DropdownOption>({
    id: 0,
    name: "กรุณาเลือก",
    value: "",
  });

  // Current selected room display
  const [currentRoomDisplay, setCurrentRoomDisplay] = useState("");

  useEffect(() => {
    fetch("/schedule.json")
      .then((res) => res.json())
      .then((json: ScheduleItem[]) => {
        setData(json);

        // Process rooms after data is loaded
        updateRoomOptions(selectedClassLevel.value || "1", json);

        setLoading(false);
      })
      .catch((e) => {
        console.error("Error loading schedule.json:", e);
        setLoading(false);
      });
  }, []);

  // Update room options when class level changes
  const updateRoomOptions = (
    classLevel: string,
    scheduleData: ScheduleItem[]
  ) => {
    if (scheduleData.length > 0) {
      // Get all rooms starting with the selected class level (e.g., "1/")
      const roomsForLevel = [
        ...new Set(
          scheduleData
            .map((item) => item.room)
            .filter((room) => room.startsWith(`${classLevel}/`))
        ),
      ].sort((a, b) => {
        // แยกส่วนตัวเลขห้องออกมา (เช่น "1/1" จะได้ "1")
        const roomNumberA = a.split('/')[1];
        const roomNumberB = b.split('/')[1];
        
        // เปรียบเทียบเป็นตัวเลข
        return Number(roomNumberA) - Number(roomNumberB);
      });

      // Create dropdown options
      const options: DropdownOption[] = roomsForLevel.map((room, index) => ({
        id: index + 1,
        name: room,
        value: room,
      }));

      setRoomOptions(options);

      // Auto-select first room if available
      if (options.length > 0) {
        setSelectedRoom(options[0]);
        setCurrentRoomDisplay(options[0].name);
      } else {
        setSelectedRoom({ id: 0, name: "ไม่พบข้อมูลห้องเรียน", value: "" });
        setCurrentRoomDisplay("");
      }
    }
  };

  // Handle class level change
  const handleClassLevelChange = (option: DropdownOption) => {
    setSelectedClassLevel(option);
    updateRoomOptions(option.value || option.name.replace("ม.", ""), data);
  };

  // Handle room change
  const handleRoomChange = (option: DropdownOption) => {
    setSelectedRoom(option);
    setCurrentRoomDisplay(option.name);
  };

  // Filter schedule data for selected room
  const filteredData = data.filter(
    (item) => item.room === (selectedRoom.value || selectedRoom.name)
  );

  // Get program name if available
  const programName = filteredData.length > 0 ? filteredData[0].program : "";

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col py-8 px-4" style={{ isolation: "isolate" }}>
      <Header/>

      {/* Ensure SelectionPanel has a higher z-index than the timetable */}
      <div className="relative z-40">
        <SelectionPanel
          classLevelOptions={classLevelOptions}
          selectedClassLevel={selectedClassLevel}
          onClassLevelChange={handleClassLevelChange}
          roomOptions={roomOptions}
          selectedRoom={selectedRoom}
          onRoomChange={handleRoomChange}
          selectedRoomDisplay={currentRoomDisplay}
          programName={programName}
        />
      </div>

      {/* Lower z-index for the timetable */}
      <div className="relative z-30">
        <TimetableView
          selectedRoom={currentRoomDisplay}
          filteredData={filteredData}
          days={days}
          dayTH={dayTH}
          periods={periods}
          program={programName}
        />
      </div>

      <Footer currentYear={currentYear}/>
    </div>
  );
}