export function aiModeInputsReducer(state, { type, payload }) {
    switch (type) {
        case "URL_CHANGE": {
            const { index, value } = payload
            const updated = [...state.youtubeLinks];
            updated[index] = value
            return { ...state, youtubeLinks: updated }
        }

        case "ADD_URL": {
            const { MAX_URLS } = payload
            if (state.youtubeLinks.length >= MAX_URLS) return state;
            return { ...state, youtubeLinks: [...state.youtubeLinks, ""] };
        }

        case "REMOVE_URL": {
            const { index } = payload;
            const updated = state.youtubeLinks.filter((_, i) => i !== index);
            return { ...state, youtubeLinks: updated.length ? updated : [""] };
        }

        case "FIELD_CHANGE": {
            const { key, value } = payload;
            return {
                ...state,
                [key]: value,
            }
        }

        default: {
            throw new Error(`Wrong Action:  ${type}`);
        }
    }
}

