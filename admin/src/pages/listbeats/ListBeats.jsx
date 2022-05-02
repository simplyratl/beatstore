import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DatatableBeats from '../../components/datatable/DatatableBeats';

const List = () => {
    return (
        <div className='list'>
            <Sidebar />
            <div className='listContainer'>
                <Navbar />
                <DatatableBeats />
            </div>
        </div>
    );
};

export default List;
