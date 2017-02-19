const kanawana = require('kanawana');

import { 
    REQUEST_DATA, 
    RECEIVE_DATA, 
    SELECT_CHAPTER, 
    SELECT_ALL, 
    RESET_SELECTION, 
    START_REVIEWING,
    UPDATE_INPUT,
    SUBMIT_INPUT } from '../actions';

function randomWord(words) {
    return words[Math.floor(Math.random()*words.length)];
}

function reduceItems(items) {
    const reduced = [];

    for(let i in items) {
        items[i].map(function(y) {
            reduced[y.number] = y;
        })
    }

    return reduced;
}

function convertToJapanese(input) {
    return kanawana.toKana(input, {IMEMode: true});
}

function checkInput(input, currentWord) {
    if(input === currentWord) {
        return true;
    }

    return false;
}

function generateReviewList(selectedChapters, itemTree) {
    let reviewList = [];

    if(selectedChapters.size > 0) {
        for(let chapter of selectedChapters) {
            for(let word of itemTree[chapter]) {
                reviewList.push(word.number);
            }
        }
    }

    return reviewList;
}

function updateReviewList(input, currentWord, currentlyReviewing) {
    let corrected = checkInput(input, currentWord.kana);

    if(corrected) {
        let index = currentlyReviewing.indexOf(currentWord.number);
        currentlyReviewing.splice(index, 1);
    } else {
        let v = 0;
        while(v < 3) {
            currentlyReviewing.push(currentWord.number);
            v+=1;
        }
    }

    return currentlyReviewing;
}

function generateStats(state, reviewList, success) {
    let updatedStats = Object.assign({}, state.stats, {
        total_answers: state.stats.total_answers + 1,
    });

    if(success) {
        updatedStats.correct_answers = updatedStats.correct_answers + 1;

        let stillReviewing = reviewList.find(function(word) {
            return word === state.currentWord.number;
        })

        if(!stillReviewing) {
            updatedStats.words_remaining = updatedStats.words_remaining - 1;
            updatedStats.words_completed = updatedStats.words_completed + 1;
        }
    } else {
        updatedStats.incorrect_answers = updatedStats.incorrect_answers + 1;
    }

    return updatedStats;
}

function fetchData(state, action) {
    switch(action.type) {
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                itemTree: action.data.chapters,
                items: reduceItems(action.data.chapters),
            });
        default:
            return state;
    }
}

function processInput(state, action) {
    switch(action.type) {
        case UPDATE_INPUT:
            let input = convertToJapanese(action.value);

            return Object.assign({}, state, {
                input: input,
            });
        case SUBMIT_INPUT:
            let currentWord = state.items[state.currentWord.number];
            let newReviewList = updateReviewList(action.value, 
                                                    currentWord, 
                                                    [...state.currentlyReviewing]);
            let success = state.currentlyReviewing.length > newReviewList.length;

            return Object.assign({}, state, {
                input: '',
                currentlyReviewing: newReviewList,
                currentWord: {
                    number: randomWord(newReviewList),
                },
                previousWord: {
                    number: state.currentWord.number,
                    success: success,
                },
                stats: generateStats(state, newReviewList, success),
            });
        default:
            return state;
    }
}

function rootReducer(state = {
    isFetching: false,
    itemTree: {},
    items: {},
    selectedChapters: new Set(),
    currentlyReviewing: [],
    currentWord: {
        number: undefined,
    },
    previousWord: {
        number: undefined,
        success: false,
    },
    input: '',
    stats: {}
}, action) {
    switch(action.type) {
        case REQUEST_DATA:
        case RECEIVE_DATA:
            return fetchData(state, action);
        case SELECT_CHAPTER:
            const selectedChapters = new Set(state.selectedChapters);
            selectedChapters.has(action.chapterId) ? 
                selectedChapters.delete(action.chapterId) : 
                selectedChapters.add(action.chapterId);

            return Object.assign({}, state, {
                selectedChapters: selectedChapters,
            });
        case SELECT_ALL:
            const selected = new Set(state.selectedChapters);
            Object.keys(state.itemTree).map(function(key) {
                if(!selected.has(key)) {
                    selected.add(key);
                }
            })

            return Object.assign({}, state, {
                selectedChapters: selected,
            })
        case RESET_SELECTION:
            return Object.assign({}, state, {
                selectedChapters: new Set(),
            });
        case START_REVIEWING:
            let reviewList = generateReviewList(state.selectedChapters,
                                                    state.itemTree);

            return Object.assign({}, state, {
                currentlyReviewing: reviewList,
                currentWord: {
                    number: randomWord(reviewList),
                },
                stats: Object.assign({}, state.stats, {
                    correct_answers: 0,
                    incorrect_answers: 0,
                    total_answers: 0,
                    words_completed: 0,
                    words_remaining: reviewList.length,
                })
            });
        case UPDATE_INPUT:
        case SUBMIT_INPUT:
            return processInput(state, action);
        default:
            return state;
    }
}

export default rootReducer;