interface Prop {
    onClose: () => void;
}

function CloseBtn({onClose}: Prop) {
  return (
    <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer transition-colors duration-200"
        >
          ×
        </button>
  )
}

export default CloseBtn
