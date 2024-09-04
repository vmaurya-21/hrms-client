

const NewEmployee = () => {


  return (
          <div className="max-w-full mx-auto bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-center text-zinc-700 dark:text-zinc-200 mb-4">
              CREATE A NEW USER
            </p>

            <div className="mb-4">
              <label
                className="block text-zinc-800 dark:text-zinc-200 font-semibold mb-2"
                htmlFor="officialEmailId"
              >
                OFFICIAL EMAIL ID
              </label>
              <input
                type="email"
                id="officialEmailId"
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-zinc-800 dark:text-zinc-200 font-semibold mb-2"
                htmlFor="mobile"
              >
                MOBILE NUMBER
              </label>
              <input
                type="number"
                id="mobile"
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-zinc-800 dark:text-zinc-200 font-semibold mb-2"
                htmlFor="managerId"
              >
                REPORTING TO
              </label>
              <select
                id="managerId"
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
              >
                <option>--Please Select--</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-zinc-800 dark:text-zinc-200 font-semibold mb-2"
                htmlFor="selectRole"
              >
                DEFINE ROLE
              </label>
              <select
                id="selectRole"
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
              >
                <option>--Please Select--</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-zinc-800 dark:text-zinc-200 font-semibold mb-2"
                htmlFor="selectHolidayGroups"
              >
                HOLIDAY GROUPS
              </label>
              <select
                id="selectHolidayGroups"
                multiple
                required
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
                style={{ height: "100px" }}
              >
                {/* Add holiday group options */}
              </select>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <strong>Important Points:</strong><br />
              After new user registration, update new user profile first.<br />
              To select multiple groups, press control and click on the groups.
            </p>

            <div className="text-center">
              <button
                type="submit"
                id="createUser"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                CREATE NEW USER
              </button>
            </div>
          </div>

  );
};

export default NewEmployee;
