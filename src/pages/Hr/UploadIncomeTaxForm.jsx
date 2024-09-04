import { useState } from "react";

const UploadIncomeTaxForm = () => {
  const [file, setFile] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("File uploaded:", file);
    };
 const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full h-screen pt-32 mx-auto bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg">
            <p className="text-2xl font-bold text-center text-zinc-700 dark:text-zinc-200 mb-4">
              Upload Income Tax Details
            </p>

            <div className="text-center mb-4">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={openModal}
              >
                UPLOAD INCOME TAX EXCEL
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <div className="modal-header flex justify-between items-center">
                    <h4 className="text-xl font-bold dark:text-zinc-200">
                      Upload Income Tax Excel File
                    </h4>
                    <button
                      type="button"
                      className="text-zinc-800 dark:text-zinc-200"
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                  </div>
                  <form
                    method="POST"
                    encType="multipart/form-data"
                    id="UploadTaxExcelForm"
                    onSubmit={handleSubmit}
                  >
                    <div className="modal-body mt-4">
                      <div className="mb-4">
                        <label
                          className="block text-zinc-800 dark:text-zinc-200 font-semibold"
                          htmlFor="file"
                        >
                          Upload File:
                        </label>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md dark:bg-zinc-700 dark:text-zinc-200"
                          accept=".xls,.xlsx,.xlsm"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-footer mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        disabled={!file}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}


            <div className="mt-4 text-center">
              <label className="text-zinc-800 dark:text-zinc-200">
                Click to download error file :
              </label>
              <a href="javascript:void(0);" className="text-blue-600">
                <span id="errorFileName"></span>
              </a>
            </div>

            <div className="mt-4 text-center">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                id="iTaxTemplateDownload"
              >
                Download Template File
              </button>
            </div>

            <div className="mt-6">
              <hr className="border-zinc-300 dark:border-zinc-700" />
              <p className="mt-2 text-sm text-center text-zinc-600 dark:text-zinc-400">
                <strong>Note:</strong> Please dont change file format or file
                extension.
              </p>
            </div>
          </div>
  );
};

export default UploadIncomeTaxForm;
