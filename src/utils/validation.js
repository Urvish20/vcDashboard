export const isValidYouTubeURL = (url) => {
    if (!url) return false;

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(.+)$/;
    return youtubeRegex.test(url);
};

export const getYouTubeVideoId = (url) => {
    const regexes = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const regex of regexes) {
        const match = url.match(regex);
        if (match) {
            return match[1];
        }
    }
    return null;
};

export const isValidImageFile = (file) => {
    if (!file) return false;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
};

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const validateVideoForm = (formData) => {
    const errors = {};

    if (!formData.title || formData.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!formData.category || formData.category === '') {
        errors.category = 'Category is required';
    }

    if (!formData.youtubeUrl || formData.youtubeUrl.trim() === '') {
        errors.youtubeUrl = 'YouTube URL is required';
    } else if (!isValidYouTubeURL(formData.youtubeUrl)) {
        errors.youtubeUrl = 'Invalid YouTube URL';
    }

    if (!formData.thumbnail || formData.thumbnail.trim() === '') {
        errors.thumbnail = 'Thumbnail URL is required';
    }

    if (!formData.description || formData.description.trim() === '') {
        errors.description = 'Description is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
