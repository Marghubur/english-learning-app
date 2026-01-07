import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordDefinition } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    // Mock data based on the format provided
    private mockWordDefinitions: WordDefinition[] = [
        {
            word: "vantage",
            phonetic: "/ˈvɑːntɪdʒ/",
            phonetics: [
                {
                    text: "/ˈvɑːntɪdʒ/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/vantage-uk.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "noun",
                    definitions: [
                        {
                            definition: "Any condition, circumstance, opportunity or means, particularly favorable to success, or to any desired end.",
                            synonyms: ["benefit", "edge", "advantage"],
                            antonyms: ["disadvantage", "drawback"],
                            example: "The enemy had the advantage of a more elevated position."
                        },
                        {
                            definition: "A place or position affording a good view; a vantage point.",
                            synonyms: ["viewpoint", "perspective"],
                            antonyms: [],
                            example: "From this vantage, we can see the entire valley."
                        }
                    ],
                    synonyms: ["benefit", "edge", "advantage", "viewpoint"],
                    antonyms: ["disadvantage", "drawback"]
                }
            ]
        },
        {
            word: "motivation",
            phonetic: "/ˌmoʊtɪˈveɪʃən/",
            phonetics: [
                {
                    text: "/ˌmoʊtɪˈveɪʃən/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/motivation-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "noun",
                    definitions: [
                        {
                            definition: "Willingness of action especially in behavior",
                            synonyms: ["drive", "incentive", "inspiration"],
                            antonyms: ["discouragement", "deterrent"],
                            example: "His motivation for learning English was to get a better job."
                        },
                        {
                            definition: "The action of motivating",
                            synonyms: ["encouragement", "stimulation"],
                            antonyms: ["demotivation"],
                            example: "The coach's motivation helped the team win."
                        }
                    ],
                    synonyms: ["drive", "incentive", "inspiration", "encouragement"],
                    antonyms: ["discouragement", "deterrent", "demotivation"]
                }
            ]
        },
        {
            word: "eloquent",
            phonetic: "/ˈɛləkwənt/",
            phonetics: [
                {
                    text: "/ˈɛləkwənt/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/eloquent-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "adjective",
                    definitions: [
                        {
                            definition: "Fluent or persuasive in speaking or writing",
                            synonyms: ["articulate", "expressive", "fluent"],
                            antonyms: ["inarticulate", "tongue-tied"],
                            example: "She gave an eloquent speech at the conference."
                        }
                    ],
                    synonyms: ["articulate", "expressive", "fluent", "persuasive"],
                    antonyms: ["inarticulate", "tongue-tied", "ineloquent"]
                }
            ]
        },
        {
            word: "perseverance",
            phonetic: "/ˌpɜːsɪˈvɪərəns/",
            phonetics: [
                {
                    text: "/ˌpɜːsɪˈvɪərəns/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/perseverance-uk.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "noun",
                    definitions: [
                        {
                            definition: "Continued effort to do or achieve something despite difficulties, failure, or opposition",
                            synonyms: ["persistence", "determination", "tenacity"],
                            antonyms: ["laziness", "apathy", "indifference"],
                            example: "Through perseverance, she mastered the English language."
                        }
                    ],
                    synonyms: ["persistence", "determination", "tenacity", "dedication"],
                    antonyms: ["laziness", "apathy", "indifference", "surrender"]
                }
            ]
        },
        {
            word: "serendipity",
            phonetic: "/ˌsɛrənˈdɪpɪti/",
            phonetics: [
                {
                    text: "/ˌsɛrənˈdɪpɪti/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/serendipity-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "noun",
                    definitions: [
                        {
                            definition: "The occurrence and development of events by chance in a happy or beneficial way",
                            synonyms: ["luck", "fortune", "chance"],
                            antonyms: ["misfortune", "bad luck"],
                            example: "It was pure serendipity that we met at the coffee shop."
                        }
                    ],
                    synonyms: ["luck", "fortune", "chance", "coincidence"],
                    antonyms: ["misfortune", "bad luck", "design"]
                }
            ]
        },
        {
            word: "resilient",
            phonetic: "/rɪˈzɪliənt/",
            phonetics: [
                {
                    text: "/rɪˈzɪliənt/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/resilient-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "adjective",
                    definitions: [
                        {
                            definition: "Able to withstand or recover quickly from difficult conditions",
                            synonyms: ["strong", "tough", "hardy"],
                            antonyms: ["weak", "fragile", "vulnerable"],
                            example: "She proved to be resilient in the face of adversity."
                        }
                    ],
                    synonyms: ["strong", "tough", "hardy", "flexible"],
                    antonyms: ["weak", "fragile", "vulnerable", "brittle"]
                }
            ]
        },
        {
            word: "ambiguous",
            phonetic: "/æmˈbɪɡjuəs/",
            phonetics: [
                {
                    text: "/æmˈbɪɡjuəs/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/ambiguous-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "adjective",
                    definitions: [
                        {
                            definition: "Open to more than one interpretation; not having one obvious meaning",
                            synonyms: ["unclear", "vague", "equivocal"],
                            antonyms: ["clear", "unambiguous", "obvious"],
                            example: "The instructions were ambiguous and confusing."
                        }
                    ],
                    synonyms: ["unclear", "vague", "equivocal", "cryptic"],
                    antonyms: ["clear", "unambiguous", "obvious", "explicit"]
                }
            ]
        },
        {
            word: "ephemeral",
            phonetic: "/ɪˈfɛmərəl/",
            phonetics: [
                {
                    text: "/ɪˈfɛmərəl/",
                    audio: "https://api.dictionaryapi.dev/media/pronunciations/en/ephemeral-us.mp3"
                }
            ],
            meanings: [
                {
                    partOfSpeech: "adjective",
                    definitions: [
                        {
                            definition: "Lasting for a very short time",
                            synonyms: ["transient", "fleeting", "temporary"],
                            antonyms: ["permanent", "enduring", "lasting"],
                            example: "The beauty of cherry blossoms is ephemeral."
                        }
                    ],
                    synonyms: ["transient", "fleeting", "temporary", "brief"],
                    antonyms: ["permanent", "enduring", "lasting", "eternal"]
                }
            ]
        }
    ];

    private wordPool: string[] = [
        "vantage", "motivation", "eloquent", "perseverance", "serendipity",
        "resilient", "ambiguous", "ephemeral"
    ];

    constructor() { }

    getRandomWords(count: number = 5): string[] {
        const shuffled = [...this.wordPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    getWordDefinitions(words: string[]): Observable<WordDefinition[]> {
        const definitions = words.map(word =>
            this.mockWordDefinitions.find(def => def.word === word)
        ).filter(def => def !== undefined) as WordDefinition[];

        return of(definitions);
    }

    getAllDefinitions(): Observable<WordDefinition[]> {
        return of(this.mockWordDefinitions);
    }
}
