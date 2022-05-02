import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { HiPhotograph } from 'react-icons/hi';
import './edit.scss';

const Edit = ({ setOpened, beat }) => {
    return (
        <div className='edit-container'>
            <div className='edit-wrapper'>
                <div className='top-bar'>
                    <div className='image'>
                        <img src={beat?.img} alt='' />

                        <HiPhotograph className='photo' />
                    </div>
                    <h1>{beat?.title}</h1>
                </div>

                <div className='edit-inputs'>
                    <div className='row'>
                        <h4>TITLE</h4>
                        <input type='text' name='title' autoComplete='off' defaultValue={beat?.title} />
                    </div>
                    <div className='row'>
                        <h4>TAGS (5)</h4>
                        <input
                            type='text'
                            name='tags'
                            autoComplete='off'
                            defaultValue={beat?.tags.join(', ')}
                        />
                    </div>

                    <div className='row'>
                        <h4>BPM</h4>
                        <input type='text' name='bpm' autoComplete='off' defaultValue={beat?.bpm} />
                    </div>
                    <div className='row'>
                        <h4>KEY</h4>
                        <input type='text' name='key' autoComplete='off' defaultValue={beat?.key} />
                    </div>

                    <div className='row'>
                        <h4>Primary Mood</h4>
                        <input
                            type='text'
                            name='primary_mood'
                            autoComplete='off'
                            defaultValue={beat?.primary_mood}
                        />
                    </div>

                    <div className='row'>
                        <h4>Secondary Mood</h4>
                        <input
                            type='text'
                            name='secondary_mood'
                            autoComplete='off'
                            defaultValue={beat?.secondary_mood}
                        />
                    </div>
                </div>

                <span className='close' onClick={() => setOpened(false)}>
                    <IoCloseSharp />
                </span>
            </div>
        </div>
    );
};

export default Edit;
