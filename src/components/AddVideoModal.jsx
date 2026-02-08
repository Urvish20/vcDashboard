import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo } from "../store/slices/videoSlice";
import { validateVideoForm, isValidImageFile } from "../utils/validation";

const AddVideoModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    youtubeUrl: "",
    thumbnail: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const categories = [
    "Drôle de récitateur",
    "Mission sourate",
    "Tafsir mystery",
    "Moushaf décodé",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!isValidImageFile(file)) {
        setErrors((prev) => ({
          ...prev,
          thumbnail: "Invalid image type. Please use JPEG, PNG, GIF, or WebP.",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          thumbnail: "File size must be less than 5MB.",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
        setFormData((prev) => ({
          ...prev,
          thumbnail: e.target.result,
        }));
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({
        ...prev,
        thumbnail: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateVideoForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    dispatch(
      addVideo({
        title: formData.title,
        category: formData.category,
        youtubeUrl: formData.youtubeUrl,
        thumbnail: formData.thumbnail,
        description: formData.description,
      })
    );

    setFormData({
      title: "",
      category: "",
      youtubeUrl: "",
      thumbnail: "",
      description: "",
    });
    setThumbnailPreview(null);
    setErrors({});

    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      category: "",
      youtubeUrl: "",
      thumbnail: "",
      description: "",
    });
    setThumbnailPreview(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Video</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.youtubeUrl
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.youtubeUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.youtubeUrl}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.thumbnail
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.thumbnail}
                  </p>
                )}
              </div>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter video description"
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-linear-to-r from-purple-500 to-orange-400 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Add Video
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 cursor-pointer bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoModal;
