export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_CHAPTER = 'SELECT_CHAPTER';
export const SELECT_ALL = 'SELECT_ALL';
export const RESET_SELECTION = 'RESET_SELECTION';
export const START_REVIEWING = 'START_REVIEWING';
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const SUBMIT_INPUT = 'SUBMIT_INPUT';

export function submitInput(value) {
    return {
        type: SUBMIT_INPUT,
        value
    }
}

export function updateInput(value) {
    return {
        type: UPDATE_INPUT,
        value
    }
}

export function startReviewing() {
    return {
        type: START_REVIEWING,
    }
}

export function selectChapter(chapterId: number) {
    return {
        type: SELECT_CHAPTER,
        chapterId
    }
}

export function selectAll() {
    return {
        type: SELECT_ALL
    }
}

export function resetSelection() {
    return {
        type: RESET_SELECTION
    }
}

function requestData() {
    return {
        type: REQUEST_DATA,
    };
}

function receiveData(data: Array<Object>) {
    return {
        type: RECEIVE_DATA,
        data,
    };
}

export function fetchData() {
    return function(dispatch: (action: Object) => void) {
        dispatch(requestData());

        fetch('/assets/data.json')
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                return dispatch(receiveData(data));
            });
    };
}