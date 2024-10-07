import { useState, useEffect } from 'react';
import { getBirthday } from '../../services/apiServices'; // Assuming this is the API call

const BirthdayCard = () => {
    const [birthdayData, setBirthdayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); // State for current card index
    const [touchStart, setTouchStart] = useState(null); // State for touch start position

    // Fetch birthday data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getBirthday(); // Assume this returns an array of birthday objects
                console.log("API response:", result); // Log the API response
                setBirthdayData(result);
            } catch (error) {
                console.error("Error fetching birthday data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Check if today's date matches any employee's birthday
    const isBirthdayToday = (dateOfBirth) => {
        const today = new Date();

        // Get day and month
        const day = String(today.getDate()).padStart(2, '0'); // Ensure two-digit day
        const month = today.toLocaleString('en-GB', { month: 'short' }); // Get short month name

        const formattedToday = `${day}-${month}`; // Create formatted string in "DD-MMM" format
        return formattedToday === dateOfBirth;
    };

    // Filter out employees whose birthday is today
    const employeesWithBirthdayToday = birthdayData.filter((employee) =>
        isBirthdayToday(employee.dateOfBirth)
    );

    // Handle swipe action to move to the next or previous card
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX); // Capture initial touch position
    };

    const handleTouchMove = (e) => {
        if (!touchStart) return;

        const touchEnd = e.touches[0].clientX;
        const swipeDistance = touchStart - touchEnd;

        if (swipeDistance > 50) {
            handleNext(); // Swipe left -> move to the next card
        } else if (swipeDistance < -50) {
            handlePrev(); // Swipe right -> move to the previous card
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null); // Reset touch start position
    };

    // Handle next card
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % employeesWithBirthdayToday.length);
    };

    // Handle previous card
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + employeesWithBirthdayToday.length) % employeesWithBirthdayToday.length
        );
    };

    if (loading) {
        return (
            <div className="mt-32 w-full h-32 bg-gray-400 dark:bg-zinc-700 animate-pulse rounded-lg"></div>
        );
    }

    if (employeesWithBirthdayToday.length > 0) {
        return (
            <div
                className="mt-32 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="mb-4 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-zinc-200 p-4 rounded-lg shadow-lg"
                >
                    <h3 className="text-xl font-semibold">
                        Happy Birthday, {employeesWithBirthdayToday[currentIndex].fullName}!
                    </h3>
                    <p className="mt-2">
                        Wishing you a wonderful day filled with love, joy, and happiness.
                        Have an amazing birthday!
                    </p>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-2">
                    {employeesWithBirthdayToday.map((_, index) => (
                        <span
                            key={index}
                            className={`mx-1 w-2 h-2 rounded-full ${
                                currentIndex === index
                                    ? 'bg-zinc-800 dark:bg-zinc-200'
                                    : 'bg-gray-300 dark:bg-zinc-500'
                            }`}
                        ></span>
                    ))}
                </div>
            </div>
        );
    }

    // Fallback if no one has a birthday today
    return (
        <div className="mt-32 bg-gray-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 p-4 rounded-lg shadow-lg">
            <p>No birthdays today!</p>
        </div>
    );
};

export default BirthdayCard;
