import React, { useState } from 'react';
import '../../style/dist/promotionbar.min.css';
import { MdRemove } from 'react-icons/md';

const Promotion_Navbar = ({ enabled }) => {
    const [remove, setRemove] = useState(false);

    return (
        <>
            {!remove && (
                <div className={`promotion-bar ${enabled && 'active'}`}>
                    <h3>
                        Spring Sale: Use Code "ratl20" For 20% Off Your Order. Ends June 18st At 11:59 P.M.
                    </h3>
                    <MdRemove className='remove' onClick={() => setRemove(true)} />
                </div>
            )}
        </>
    );
};

export default Promotion_Navbar;
