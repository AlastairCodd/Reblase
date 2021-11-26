import React from "react";
import { outcomeTypes, isSupportedSeason } from "../../blaseball/outcome";
import { selectTheme } from "../../blaseball/select";
import { ChronGame } from "blaseball-lib/chronicler";
import Twemoji from "./Twemoji";
import Select from "react-select";
import { STATIC_ID } from "blaseball-lib/games";

export interface OutcomePickerProps {
    games: ChronGame[];
    placeholder?: string;
    selectedOutcomes?: string[];
    setSelectedOutcomes?: (outcomes: string[]) => void;
}

export default function OutcomePicker(props: OutcomePickerProps) {
    const weathers = props.games.map((game) => game.data.weather);
    const season = props.games.length > 0 ? props.games[0].data.season : -2;
    const sim = props.games.length > 0 ? props.games[0].data.sim ?? STATIC_ID : STATIC_ID;

    const checkSeason = isSupportedSeason(season, sim);

    const items = outcomeTypes
        .filter((outcome) => {
            if (outcome.weather) {
                return outcome.weather.some((weather) => weathers.includes(weather));
            }
            if (outcome.season && checkSeason) {
                return outcome.season.some((seasonType) => {
                    if (typeof seasonType == "number") {
                        return seasonType == season && sim == STATIC_ID;
                    }
                    return seasonType.season == season && seasonType.sim == sim;
                });
            }
            return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((outcome) => ({
            value: outcome.name,
            label: (
                <span key={outcome.name}>
                    <Twemoji className="mr-1" emoji={outcome.emoji} />
                    {outcome.name}
                </span>
            ),
        }));

    return (
        <Select
            options={items}
            theme={selectTheme}
            isMulti={true}
            placeholder={props.placeholder}
            value={items.filter((item) => (props.selectedOutcomes ?? []).indexOf(item.value) !== -1)}
            onChange={(newItems, _) => {
                const ids = ((newItems ?? []) as any[]).map((item) => item.value as string);
                if (props.setSelectedOutcomes) props.setSelectedOutcomes(ids);
            }}
        />
    );
}
