import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteVideo } from "../store/slices/videoSlice";
import { getYouTubeVideoId } from "../utils/validation";

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const videos = useSelector((state) => state.video?.videos || []);
  console.log("All videos from store:", videos);
  const video = videos.find((v) => v.id === Number(id));

  if (!video) {
    return (
      <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mb-4 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Video not found
          </h2>
          <p className="text-gray-600 mb-6">
            The video you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(video.youtubeUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const handleDelete = () => {
    dispatch(deleteVideo(video.id));
    setShowDeleteConfirm(false);
    navigate("/");
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex cursor-pointer items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="relative w-full bg-gray-900"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            src={`${embedUrl}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {video.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full font-medium">
                  {video.category}
                </span>
                <span className="text-sm">
                  Posted on{" "}
                  {new Date(video.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </button>
          </div>

          <hr className="my-6" />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {video.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">Category</p>
              <p className="text-gray-800 font-semibold">{video.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Created Date
              </p>
              <p className="text-gray-800 font-semibold">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">Video ID</p>
              <p className="text-gray-800 font-semibold text-sm break-all">
                {video.id}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">Status</p>
              <p className="text-gray-800 font-semibold">Published</p>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Delete Video?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{video.title}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-800 cursor-pointer py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailPage;
