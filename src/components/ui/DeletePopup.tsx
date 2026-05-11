interface props {
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: () => void;
}

const DeletePopup = ({ setDeletePopup, confirmDelete }: props) => {

  const closeFunction = () => {
    setDeletePopup(false);
  };

  const handleNote = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={closeFunction}
      className="fixed inset-0 flex justify-center items-center bg-black/20"
    >
      <div
        onClick={handleNote}
        className="w-[300px] h-[200px] p-4 bg-white rounded-md flex flex-col justify-between"
      >
        <div>
          <h1 className="text-3xl font-semibold">Delete</h1>
          <p className="text-gray-500 mt-2">Do you want to delete this note?</p>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer">
            Delete
          </button>
          <button onClick={closeFunction} className="bg-gray-600 text-white py-2 px-4 rounded-md cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
