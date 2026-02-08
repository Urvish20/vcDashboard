export const clearPersistedState = () => {
    try {
        localStorage.removeItem('persist:root');
        localStorage.removeItem('PERSIST:root');
        console.log('✅ Persisted state cleared');
        window.location.reload();
    } catch (error) {
        console.error('❌ Failed to clear storage:', error);
    }
};

export const isValidVideoState = (state) => {
    return (
        state &&
        typeof state === 'object' &&
        Array.isArray(state.videos) &&
        typeof state.nextId === 'number' &&
        state.nextId >= 0
    );
};
