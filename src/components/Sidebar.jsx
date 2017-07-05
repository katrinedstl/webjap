import React from 'react';
import classNames from 'classnames';

import './Sidebar.scss';

const StartButton = ({onStartReviewing}) => {
    const onClick = function() {
        onStartReviewing();
    }

    return(
        <div className="start-button" onClick={onClick}>
            <p>Start reviewing</p>
        </div>
    )
}

const Chapter = ({ chapterId, isSelected, onSelectChapter }) => {
    const className = classNames("chapter-number", {
        "selected": isSelected,
    });

    const onClick = function() {
        onSelectChapter(chapterId);
    }

    return(
        <div className={className} onClick={onClick}>
            <p>{chapterId}</p>
        </div>
    )
}

const ChapterList = ({ chapterList, selectedChapters, onSelectChapter, onStartReviewing }) => {
    return(
        <div className="chapter-list">
            {Object.keys(chapterList).map(function(key) {
                return(<Chapter key={key} 
                            chapterId={key} 
                            isSelected={selectedChapters.has(key.toString())} 
                            onSelectChapter={onSelectChapter} />)
            })}
        </div>
    )
}

const ChapterSelector = ({ 
    chapterList,
    selectedChapters,
    onSelectChapter,
    onSelectAll,
    onResetSelection,
    onStartReviewing
}) => {
    const selectAll = function() {
        onSelectAll();
    }

    const resetSelection = function() {
        onResetSelection();
    }

    return(
        <div className="chapter-selector">
            { chapterList ? <ChapterList chapterList={chapterList} 
                                        selectedChapters={selectedChapters} 
                                        onSelectChapter={onSelectChapter}
                                        onStartReviewing={onStartReviewing}/> : undefined }


            <div className="start-container">
                <StartButton onStartReviewing={onStartReviewing}/>
                <div className="multiple-selector">
                    <p onClick={selectAll}>Select all</p>
                    <p onClick={resetSelection}>Reset</p>
                </div>
            </div>
        </div>
    )
}

class Sidebar extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    render() {
        const {
            chapters,
            selectedChapters,
            currentlyReviewing,
            onSelectChapter,
            onSelectAll,
            onResetSelection,
            onStartReviewing,
        } = this.props;

        return(
            <div className="sidebar" ref="sidebar">
                <ChapterSelector chapterList={chapters} 
                                    selectedChapters={selectedChapters} 
                                    onSelectChapter={onSelectChapter}
                                    onSelectAll={onSelectAll}
                                    onResetSelection={onResetSelection} 
                                    onStartReviewing={onStartReviewing} />
            </div>
        );
    }
}

export default Sidebar;