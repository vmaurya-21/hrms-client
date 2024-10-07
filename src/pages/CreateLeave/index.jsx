import { useEffect, useState } from 'react';
import { Calendar } from "../../@/components/ui/calendar";
import { leaveType } from '../../services/apiServices';
import { Popover, PopoverTrigger, PopoverContent } from '../../@/components/ui/popover';
import { Button } from '../../@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const LeaveRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fromDate: undefined,
    toDate: undefined,
    description: '',
    leaveType: '',
    leaveCount: '',
    halfDay: false,
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isCalendarOpenFrom, setIsCalendarOpenFrom] = useState(false);
  const [isCalendarOpenTo, setIsCalendarOpenTo] = useState(false);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const types = await leaveType();
      setLeaveTypes(types);
    };
    if (isOpen) {
      fetchLeaveTypes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fromDate) newErrors.fromDate = 'From date is required';
    if (!formData.toDate) newErrors.toDate = 'To date is required';
    if (formData.halfDay && formData.fromDate !== formData.toDate) {
      newErrors.toDate = 'To date must be the same as From date for Half Day';
    }
    if (!formData.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!formData.leaveCount) newErrors.leaveCount = 'Leave count is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    // Add your API call here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-lg shadow-2xl w-[700px] relative">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg">
          <button
            className="absolute top-3 right-3 text-3xl font-bold text-neutral-500 hover:text-red-500 transition duration-300"
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className="text-3xl font-extrabold mb-6 text-center text-neutral-800 dark:text-neutral-100">
            Request Leave
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow">
              <label className="block mb-2">
                From Date
                <Popover open={isCalendarOpenFrom} onOpenChange={setIsCalendarOpenFrom}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-1 justify-start text-left font-normal bg-neutral-700 hover:bg-neutral-600 text-neutral-100"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.fromDate ? format(formData.fromDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.fromDate}
                      onSelect={(date) => {
                        setFormData({ ...formData, fromDate: date });
                        setIsCalendarOpenFrom(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.fromDate && <span className="text-red-500 text-sm">{errors.fromDate}</span>}
              </label>

              <label className="block mb-2">
                To Date
                <Popover open={isCalendarOpenTo} onOpenChange={setIsCalendarOpenTo}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-1 justify-start text-left font-normal bg-neutral-700 hover:bg-neutral-600 text-neutral-100"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.toDate ? format(formData.toDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.toDate}
                      onSelect={(date) => {
                        setFormData({ ...formData, toDate: date });
                        setIsCalendarOpenTo(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.toDate && <span className="text-red-500 text-sm">{errors.toDate}</span>}
              </label>

              <label className="block mb-2">
                Leave Type
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="block w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600 text-neutral-800 dark:text-white"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.value}
                    </option>
                  ))}
                </select>
                {errors.leaveType && <span className="text-red-500 text-sm">{errors.leaveType}</span>}
              </label>
            </div>

            {/* Right Column */}
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow">
              <label className="block mb-2">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600 text-neutral-800 dark:text-white"
                />
              </label>

              <label className="block mb-2">
                Leave Count
                <input
                  type="number"
                  name="leaveCount"
                  value={formData.leaveCount}
                  onChange={handleChange}
                  className="block w-full p-2 border rounded-md dark:bg-neutral-700 dark:border-neutral-600 text-neutral-800 dark:text-white"
                />
                {errors.leaveCount && <span className="text-red-500 text-sm">{errors.leaveCount}</span>}
              </label>

              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="halfDay"
                  checked={formData.halfDay}
                  onChange={handleChange}
                  className="mr-2"
                />
                Half Day
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center col-span-1 md:col-span-2 mt-4">
              <button
                type="submit"
                className="bg-neutral-900 dark:bg-slate-100 dark:text-black text-white text-lg font-semibold px-6 py-3 rounded-md transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
