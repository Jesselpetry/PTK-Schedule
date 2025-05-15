import { motion, AnimatePresence } from "framer-motion";
import { ScheduleItem } from "../types/interfaces";
// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChalkboardTeacher,
  faDoorOpen,
  faClock,
  faUtensils,
  faMinus,
  faSchool,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

interface TimetableViewProps {
  selectedRoom: string;
  filteredData: ScheduleItem[];
  days: string[];
  dayTH: { [key: string]: string };
  periods: { num: number; time: string }[];
  schoolLogo?: string; // Optional school logo URL
  schoolName?: string; // Optional school name
  roomFloor?: string; // Optional floor information
  program: string;
}

export default function TimetableView({
  selectedRoom,
  program,
  filteredData,
  days,
  dayTH,
  periods,
  schoolLogo = "/logo.png", // Default logo path
  schoolName = "รร.ปทุมเทพวิทยาคาร", // Default school name
  roomFloor = "1", // Default floor
}: TimetableViewProps) {
  return (
    <AnimatePresence mode="wait">
      {selectedRoom && filteredData.length > 0 ? (
        <motion.div
          key={selectedRoom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 border-white/30 backdrop-blur-lg rounded-xl border border-gray/30 overflow-hidden mb-6 p-5"
        >
          {/* Header with room info and school logo */}
          <div className="bg-gray-200 rounded-tl-xl rounded-tr-xl shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={schoolLogo}
                alt="School Logo"
                className="h-14 w-14 mr-3 object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {schoolName}
                </h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <span className="mr-3">ห้อง {selectedRoom} {program}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex">
              {/* Days column */}
              <div className="flex-none">
                <table className="border-collapse shadow-lg text-center bg-gray-200 rounded-bl-xl overflow-hidden h-full">
                  <thead>
                    <tr>
                      <th
                        className="p-2 border border-gray-300 text-gray-800"
                        style={{ minWidth: "100px", height: "72px" }}
                      >
                        <div className="flex items-center justify-center">
                          <span>วัน/คาบ</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day) => (
                      <tr key={day}>
                        <td 
                          className="p-2 border border-gray-300 bg-gray-200 font-medium text-gray-800"
                          style={{ height: "110px" }}
                        >
                          {dayTH[day]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Periods and classes */}
              <div className="flex-grow overflow-x-auto">
                <table className="border-collapse text-center bg-gray-200  rounded-br-xl overflow-hidden table-fixed h-full">
                  <thead>
                    <tr>
                      {periods.map((period) => (
                        <th
                          key={period.num}
                          className="p-2 border border-gray-300 bg-gray-200 text-gray-800"
                          style={{
                            width: `${100 / periods.length}%`,
                            minWidth: "160px",
                            height: "72px",
                          }}
                        >
                          <div className="font-bold mt-2 mb-2">
                            คาบที่ {period.num}
                          </div>
                          <div className="text-xs font-medium pt-3 pb-1 border-t border-gray-300">
                            {period.time}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day) => (
                      <tr key={day}>
                        {periods.map((period) => {
                          const classes = filteredData.filter(
                            (item) =>
                              item.day === day &&
                              String(item.period) === String(period.num)
                          );

                          const cls = classes.length > 0 ? classes[0] : null;

                          return (
                            <td
                              key={period.num}
                              className="border border-gray-300 bg-white text-gray-800 text-center align-middle"
                              style={{
                                height: "110px",
                                width: `${100 / periods.length}%`,
                                minWidth: "160px",
                              }}
                            >
                              {cls ? (
                                <div className="flex flex-col items-center justify-center h-full p-2">
                                  <div className="font-medium mb-1 break-words w-full">
                                    {cls.subject_id}
                                  </div>
                                  {cls.room_id && (
                                    <div className="mb-1 flex items-center justify-center">
                                      <span className="break-words w-full">
                                        {cls.room_id}
                                      </span>
                                    </div>
                                  )}
                                  {cls.teacher_name && (
                                    <div className="text-sm flex font-light items-center justify-center">
                                      <span className="break-words w-full">
                                        ครู {cls.teacher_name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full">
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="text-gray-400"
                                  />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      ) : selectedRoom ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white backdrop-blur-lg rounded-xl p-8 text-center border border-white/30"
        >
          <FontAwesomeIcon
            icon={faBook}
            className="h-12 w-12 mx-auto mb-4 text-gray-600"
          />
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            ไม่พบข้อมูลตารางเรียน
          </h3>
          <p className="text-gray-600">
            ไม่พบข้อมูลตารางเรียนสำหรับ {selectedRoom}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}