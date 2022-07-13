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

const genres = [
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

const keys = [
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

const getKeys = (response, key) => {
    return response.filter((beat) => {
        if (beat.key === key) {
            return beat;
        }
    });
};

const getGenres = (response, genre) => {
    return response.filter((genreEl) => genreEl === genre);
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
