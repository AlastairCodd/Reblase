import { STATIC_ID } from "blaseball-lib/games";

interface SeasonType {
    season: number;
    sim?: string;
}

export interface Outcome {
    name: string;
    emoji: string;
    text: string;
    color: string;
}

interface OutcomeType {
    name: string;
    emoji: string;
    search: RegExp[];
    color: string;
    weather?: number[];
    season?: (number | SeasonType)[];
}

const shameOutcome: OutcomeType = { name: "Shame", emoji: "\u{1F7E3}", search: [], color: "purple" };

export const calculatedOutcomeTypes: OutcomeType[] = [
    shameOutcome,
];

export const outcomeTypes: OutcomeType[] = [
    shameOutcome,
    { name: "Party", emoji: "\u{1F389}", search: [/Partying/i], color: "gray" },
    {
        name: "Chain",
        emoji: "\u{1F517}",
        search: [/The Instability chains/i],
        color: "gray",
    },
    {
        name: "Reverb",
        emoji: "\u{1F30A}",
        search: [/reverb/i],
        color: "blue",
        weather: [13],
    },
    {
        name: "Beaned",
        emoji: "\u{1F3AF}",
        search: [/hits [\w\s]+ with a pitch/],
        color: "blue",
    },
    {
        name: "Feedback",
        emoji: "\u{1F3A4}",
        search: [/feedback/i],
        color: "pink",
        weather: [12],
    },
    {
        name: "Incineration",
        emoji: "\u{1F525}",
        search: [/rogue umpire/i],
        color: "orange",
        weather: [7, 26],
    },
    {
        name: "Blooddrain",
        emoji: "\u{1FA78}",
        search: [/blooddrain/i],
        color: "purple",
        weather: [9],
    },
    {
        name: "Unstable",
        emoji: "\u{1F974}",
        search: [/Unstable/i],
        color: "blue",
    },
    {
        name: "Flickering",
        emoji: "\u{26A1}",
        search: [/Flickering/i],
        color: "blue",
    },
    {
        name: "Birds",
        emoji: "\u{1F426}",
        search: [/The Birds pecked/i],
        color: "purple",
        weather: [11],
    },
    {
        name: "Peanut",
        emoji: "\u{1F95C}",
        search: [/stray peanut/i],
        color: "orange",
        weather: [10],
    },
    {
        name: "Sun 2",
        emoji: "\u{1F31E}",
        search: [/Sun 2/i],
        color: "orange",
        weather: [1],
    },
    {
        name: "Sun 30",
        emoji: "\u{1F31E}",
        search: [/Sun 30 smiled/i],
        color: "orange",
        season: [20, 21, 22, 23],
    },
    {
        name: "Black Hole",
        emoji: "\u{26AB}",
        search: [/Black Hole (swallowed|burped)/i],
        color: "gray",
        weather: [14],
    },
    {
        name: "Percolated",
        emoji: "\u{2615}",
        search: [/Percolated/],
        color: "brown",
        weather: [15],
        season: [-1],
    },
    {
        name: "Shelled",
        emoji: "\u{1F95C}",
        search: [/Shelled/],
        color: "orange",
        weather: [10],
    },
    {
        name: "Elsewhere",
        emoji: "\u{1F4A8}",
        search: [/Elsewhere/],
        color: "gray",
        season: [
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            { season: 0, sim: "gamma8" },
            { season: 1, sim: "gamma8" },
        ],
    },
    {
        name: "Consumers",
        emoji: "\u{1F988}",
        search: [/CONSUMERS ATTACK/],
        color: "gray",
        season: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    },
    {
        name: "Static",
        emoji: "\u{1F4AC}",
        search: [/Echoed into Static/],
        color: "gray",
        weather: [12],
    },
    {
        name: "Observed",
        emoji: "\u{1F441}",
        search: [/is now being Observed/],
        color: "orange",
    },
    {
        name: "Fax Machine",
        emoji: "\u{1F4E0}",
        search: [/was replaced by incoming Fax/],
        color: "gray",
        season: [17, 18, 19, 20, 21, 22, 23],
    },
    {
        name: "Voicemail",
        emoji: "\u{260E}",
        search: [/was replaced by incoming Voicemail/],
        color: "gray",
        season: [20, 21, 22, 23],
    },
    {
        name: "Fifth Base",
        emoji: "\u{1F37D}",
        search: [/The Fifth Base/i],
        color: "gray",
        season: [19, 20, 21, 22, 23],
    },
    {
        name: "Night Shift",
        emoji: "\u{1F4C7}",
        search: [/Night Shift/],
        color: "gray",
        weather: [29],
    },
];

export function isSupportedSeason(season: number, sim?: string | undefined) {
    const result = sim == STATIC_ID || (sim == "gamma8" && season < 2);
    if (!result) console.log(`Unsupported Season: season=${season}, sim=${sim}`);
    return result;
}

export function getOutcomes(outcomes: string[], shame?: boolean, awayTeam?: string): Outcome[] {
    const foundOutcomes = [];

    if (shame && awayTeam) {
        const outcome = {
            ...shameOutcome,
            text: `The ${awayTeam} were shamed!`,
        };
        foundOutcomes.push(outcome);
    }

    for (const outcomeText of outcomes) {
        let foundType = null;
        for (const outcomeType of outcomeTypes) {
            for (const outcomeSearch of outcomeType.search) {
                // Use a flag since multiple matching searchs shouldn't duplicate
                if (foundType == null && outcomeSearch.test(outcomeText)) foundType = outcomeType;
            }
        }

        if (foundType) {
            const outcome = {
                ...foundType,
                text: outcomeText.trim(),
            };
            foundOutcomes.push(outcome);
        }
    }

    return foundOutcomes;
}
