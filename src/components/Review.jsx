import React from 'react';

import './Review.scss';

const Circle = () => {
    return(
        <svg width="24.5" height="23" viewBox="0 0 24.5 23">
            <circle fill="#F9F9F9" strokeMiterlimit="10" cx="17.4" cy="15" r="6.3"/>
        </svg>
    )
}

const Success = ({ word }) => {
    return(
        <div className="success">
            <Circle />
            <p>Correct! {word.kana}</p>
        </div>
    )
}

const NoSuccess = ({ word }) => {
    return(
        <div className="no-success">
            <Circle />
            <p>Incorrect... Try again. {word.kana}</p>
        </div>
    )
}

const Feedback = ({ previousWord, items }) => {
    return(
        <div>
            {previousWord.success ? 
                <Success word={items[previousWord.number]} /> :
                <NoSuccess word={items[previousWord.number]} />}
        </div>
    )
}

const CurrentWord = ({ reviewing, previousWord, currentWord, words }) => {
    return(
        <div className="current-word">
            {!reviewing && previousWord.number ? <h4>All cleared! Well done!</h4> : undefined}
            {reviewing ? <h4>{words[currentWord].meaning}</h4> : undefined}
        </div>
    )
}

class Input extends React.Component {
    constructor(props: Object) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onKeyDown(evt) {
        if (evt.keyCode === 13) {
            let input = this.refs.input.value;
            
            this.props.onSubmitInput(input);
            evt.preventDefault();
        }
    }

    onChange(evt) {
        let value = evt.target.value;

        this.props.onUpdateInput(value);
    }

    onClick() {
        let input = this.refs.input.value;
        
        this.props.onSubmitInput(input);
    }

    render() {
        const {
            input,
        } = this.props;

        return(
            <div className="input">
                <input type="text" ref="input" value={input} onKeyDown={this.onKeyDown} onChange={this.onChange} />
                <button className="button" onClick={this.onClick}>⇒</button>
            </div>
        );
    }
}

class Review extends React.Component {
    render() {
        const {
            items,
            number,
            input,
            previousWord,
            reviewing,
            onUpdateInput,
            onSubmitInput
        } = this.props;

        return(
            <div className="review-container">
                <h1>Current word</h1>
                <CurrentWord reviewing={reviewing} 
                                previousWord={previousWord}
                                currentWord={number} 
                                words={items} />
                { reviewing ? <Input input={input} 
                                        onUpdateInput={onUpdateInput} 
                                        onSubmitInput={onSubmitInput} /> : undefined }
                {reviewing && previousWord.number ? <Feedback previousWord={previousWord} 
                                                        items={items} /> : undefined}
            </div>
        );
    }
}

export default Review;