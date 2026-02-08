import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCard";

const Dashboard = ({ selectedCategory }) => {
  const videos = useSelector((state) => state.video?.videos || []);

  const filteredVideos =
    selectedCategory && videos?.length > 0
      ? videos.filter((video) => video?.category === selectedCategory?.name)
      : videos;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {selectedCategory ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {selectedCategory?.name}
          </h2>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredVideos?.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg
                className="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg">No videos in this category yet</p>
              <p className="text-sm">Add videos from the header button</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Select a category from the sidebar
        </div>
      )}
    </div>
  );
};

export default Dashboard;
