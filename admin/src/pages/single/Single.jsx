import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/table/Table';
import Edit from '../../components/edit/Edit';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Single = () => {
    const location = useLocation();
    const beat = location.state.beat;

    const [editMode, setEditMode] = useState(false);

    return (
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
                <div className='top'>
                    <div className='left'>
                        <div className='editButton' onClick={() => setEditMode(!editMode)}>
                            Edit
                        </div>
                        <h1 className='title'>Information</h1>
                        <div className='item'>
                            <img src={beat?.img} alt='' className='itemImg' />
                            <div className='details'>
                                <h1 className='itemTitle'>{beat?.title}</h1>
                                <div className='detailItem'>
                                    <span className='itemKey'>BPM:</span>
                                    <span className='itemValue'>{beat?.bpm}</span>
                                </div>
                                <div className='detailItem'>
                                    <span className='itemKey'>Key:</span>
                                    <span className='itemValue'>{beat?.key}</span>
                                </div>
                                <div className='detailItem'>
                                    <span className='itemKey'>Price:</span>
                                    <span className='itemValue'>{beat?.basic_licence}$</span>
                                </div>
                                <div className='detailItem'>
                                    <span className='itemKey'>Tags:</span>
                                    <span className='itemValue'>
                                        {beat?.tags.map((tag) => {
                                            return tag + ' ';
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <h1 className='title'>Last Transactions</h1>
                    <List />
                </div>
            </div>

            {editMode && <Edit setOpened={setEditMode} beat={beat} />}
        </div>
    );
};

export default Single;
