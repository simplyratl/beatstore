export const rows = [
    'Popular',
    'Latest',
    'Recommended',
    'Jack Harlow',
    'Trap',
    'Recently Played',
    'Energetic',
    'Bouncy',
    'Dark',
    'Confident',
    'Sad',
    'Angry',
    'Flirty',
    'Eccentric',
    'Depressed',
    'Epic',
    'Relaxed',
    'Cm',
    'C#m',
    'Dm',
    'D#m',
    'Em',
    'Fm',
    'F#m',
    'Gm',
    'G#m',
    'Am',
    'A#m',
    'Bm',
    'CMaj',
    'C#Maj',
    'DMaj',
    'D#Maj',
    'EMaj',
    'FMaj',
    'F#Maj',
    'GMaj',
    'G#Maj',
    'AMaj',
    'A#Maj',
    'BMaj',
];

export const getDataRow = (response, rowTitle) => {
    switch (rowTitle) {
        case 'Popular':
            return response;

        case 'Latest':
            return response.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

        case 'Jack Harlow':
            return response.filter((beat) => {
                for (let i = 0; i < beat.tags.length; i++) {
                    if (beat.tags[i] === 'jack harlow') {
                        return beat;
                    }
                }
            });

        case 'Trap':
            return response.filter((beat) => {
                if (parseInt(beat.bpm) >= 120 && parseInt(beat.bpm) <= 180) {
                    return beat;
                }
            });

        case 'Energetic':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Energetic' || beat.secondary_mood === 'Energetic') {
                    return beat;
                }
            });

        case 'Bouncy':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Bouncy' || beat.secondary_mood === 'Bouncy') {
                    return beat;
                }
            });

        case 'Dark':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Dark' || beat.secondary_mood === 'Dark') {
                    return beat;
                }
            });

        case 'Confident':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Confident' || beat.secondary_mood === 'Confident') {
                    return beat;
                }
            });

        case 'Sad':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Sad' || beat.secondary_mood === 'Sad') {
                    return beat;
                }
            });

        case 'Angry':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Angry' || beat.secondary_mood === 'Angry') {
                    return beat;
                }
            });

        case 'Flirty':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Flirty' || beat.secondary_mood === 'Flirty') {
                    return beat;
                }
            });

        case 'Eccentric':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Eccentric' || beat.secondary_mood === 'Eccentric') {
                    return beat;
                }
            });

        case 'Depressed':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Depressed' || beat.secondary_mood === 'Depressed') {
                    return beat;
                }
            });

        case 'Epic':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Epic' || beat.secondary_mood === 'Epic') {
                    return beat;
                }
            });

        case 'Relaxed':
            return response.filter((beat) => {
                if (beat.primary_mood === 'Relaxed' || beat.secondary_mood === 'Relaxed') {
                    return beat;
                }
            });

        case 'Cm':
            return response.filter((beat) => {
                if (beat.key === 'Cm') {
                    return beat;
                }
            });

        case 'C#m':
            return response.filter((beat) => {
                if (beat.key === 'C#m') {
                    return beat;
                }
            });

        case 'D#m':
            return response.filter((beat) => {
                if (beat.key === 'D#m') {
                    return beat;
                }
            });

        case 'Em':
            return response.filter((beat) => {
                if (beat.key === 'Em') {
                    return beat;
                }
            });

        case 'Fm':
            return response.filter((beat) => {
                if (beat.key === 'Fm') {
                    return beat;
                }
            });

        case 'F#m':
            return response.filter((beat) => {
                if (beat.key === 'F#m') {
                    return beat;
                }
            });

        case 'Gm':
            return response.filter((beat) => {
                if (beat.key === 'Gm') {
                    return beat;
                }
            });

        case 'G#m':
            return response.filter((beat) => {
                if (beat.key === 'G#m') {
                    return beat;
                }
            });

        case 'Am':
            return response.filter((beat) => {
                if (beat.key === 'Am') {
                    return beat;
                }
            });

        case 'A#m':
            return response.filter((beat) => {
                if (beat.key === 'A#m') {
                    return beat;
                }
            });

        case 'Bm':
            return response.filter((beat) => {
                if (beat.key === 'Bm') {
                    return beat;
                }
            });

        case 'CMaj':
            return response.filter((beat) => {
                if (beat.key === 'CMaj') {
                    return beat;
                }
            });

        case 'C#Maj':
            return response.filter((beat) => {
                if (beat.key === 'C#Maj') {
                    return beat;
                }
            });

        case 'DMaj':
            return response.filter((beat) => {
                if (beat.key === 'DMaj') {
                    return beat;
                }
            });

        case 'D#Maj':
            return response.filter((beat) => {
                if (beat.key === 'D#Maj') {
                    return beat;
                }
            });

        case 'EMaj':
            return response.filter((beat) => {
                if (beat.key === 'EMaj') {
                    return beat;
                }
            });

        case 'FMaj':
            return response.filter((beat) => {
                if (beat.key === 'FMaj') {
                    return beat;
                }
            });

        case 'F#Maj':
            return response.filter((beat) => {
                if (beat.key === 'F#Maj') {
                    return beat;
                }
            });

        case 'GMaj':
            return response.filter((beat) => {
                if (beat.key === 'GMaj') {
                    return beat;
                }
            });

        case 'G#Maj':
            return response.filter((beat) => {
                if (beat.key === 'G#Maj') {
                    return beat;
                }
            });

        case 'AMaj':
            return response.filter((beat) => {
                if (beat.key === 'AMaj') {
                    return beat;
                }
            });

        case 'A#Maj':
            return response.filter((beat) => {
                if (beat.key === 'A#Maj') {
                    return beat;
                }
            });

        case 'BMaj':
            return response.filter((beat) => {
                if (beat.key === 'BMaj') {
                    return beat;
                }
            });
    }
};
