export const rows = [
    "Popular",
    "Recommended",
    "Trap",
    "Energetic",
    "Bouncy",
    "Dark",
    "Confident",
    "Sad",
    "Angry",
    "Flirty",
    "Eccentric",
    "Depressed",
    "Epic",
    "Relaxed",
    "Cm",
    "C#m",
    "Dm",
    "D#m",
    "Em",
    "Fm",
    "F#m",
    "Gm",
    "G#m",
    "Am",
    "A#m",
    "Bm",
    "CMaj",
    "C#Maj",
    "DMaj",
    "D#Maj",
    "EMaj",
    "FMaj",
    "F#Maj",
    "GMaj",
    "G#Maj",
    "AMaj",
    "A#Maj",
    "BMaj",
];

export const genres = [
    "Popular",
    "Recommended",
    "Trap",
    "Energetic",
    "Bouncy",
    "Dark",
    "Confident",
    "Sad",
    "Angry",
    "Flirty",
    "Eccentric",
    "Depressed",
    "Epic",
    "Relaxed",
];

export const keys = [
    "Cm",
    "C#m",
    "Dm",
    "D#m",
    "Em",
    "Fm",
    "F#m",
    "Gm",
    "G#m",
    "Am",
    "A#m",
    "Bm",
    "CMaj",
    "C#Maj",
    "DMaj",
    "D#Maj",
    "EMaj",
    "FMaj",
    "F#Maj",
    "GMaj",
    "G#Maj",
    "AMaj",
    "A#Maj",
    "BMaj",
];

export const tags = ["jack harlow", "hard type beat", "type beat", "afro trap"];

const getKeys = (response, key) => {
    return response.filter((beat) => {
        if (beat.key === key) return beat;
    });
};

const getGenres = (response, genre) => {
    if (genre === "Popular") {
        return response
            .filter((beat) => {
                if (beat.likes.length > 0) {
                    return beat;
                }
            })
            .sort((a, b) => {
                return b.likes.length - a.likes.length;
            })
            .slice(0, 10);
    }

    return response.filter((beat) => {
        if (beat.primary_mood === genre || beat.secondary_mood === genre) return beat;
    });
};

export const getDataRow = (response, rowTitle) => {
    let type;

    for (let i = 0; i < rows.length; i++) {
        if (rowTitle === rows[i]) {
            if (genres.includes(rows[i])) {
                type = "Genre";
                break;
            } else if (keys.includes(rows[i])) {
                type = "Key";
                break;
            }
        }
    }

    switch (type) {
        case "Genre":
            return getGenres(response, rowTitle);
        case "Key":
            return getKeys(response, rowTitle);
        default:
            return response.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    }
};
