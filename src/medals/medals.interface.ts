export interface CountryData {
    country: string;
    gold_medals: number;
    silver_medals: number;
    bronze_medals: number;
}

export interface CountryDataId extends CountryData {
    id: string;
}

export interface CountryDataTotal extends CountryData {
    medals_total: number;
}

export type PartialCountryDataId = Partial<CountryDataId> & Pick<CountryDataId, 'id'>;
export type PartialCountryData = Partial<CountryData> & Pick<CountryData, 'country'>;

