export interface PhrasalVerb {
    id?: string;
    headword: string;
    phonetics?: string;
    guideword?: string;
    dialect?: string;
    register?: string;
    definitionId?: string;
    definition: string;
    definitionTranslation?: string;
    level: string;
    examples: { text: string, translation: string }[];
}
