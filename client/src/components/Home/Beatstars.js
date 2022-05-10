import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/dist/beatstars.min.css';

const Beatstars = () => {
    return (
        <div className='beatstars-container'>
            <div className='heading'>
                <h2>Instant Beat Store</h2>
                <h4>
                    You can buy beats <Link to='/beats'>direct from site</Link>, Paypal and Stripe allowed.
                </h4>
                <h4>Beatstars is avaiable too!</h4>
                <h3 style={{ marginTop: 8 }}>DEALS ONLY APPLY IF YOU BUY FROM THIS SITE!!!</h3>
            </div>

            <div className='bulk-deals'>
                <h2>
                    <img src={require('../../assets/images/icons/party-ios.png')} alt='🎉' className='icon' />
                    BULK DEALS ARE NOW ACTIVE!
                    <img src={require('../../assets/images/icons/party-ios.png')} className='icon' />
                </h2>

                <span className='bulk-deal'>Buy 2 Get 2 Free (Adding 4 Beats to Cart)</span>
                <span className='bulk-deal'>Buy 3 Get 3 Free (Adding 6 Beats to Cart)</span>
                <span className='bulk-deal'>Buy 5 Get 5 Free (Adding 10 Beats to Cart)</span>

                <div className='ending-soon'>Deal ending soon... ⏰</div>

                <h2>Save 50%</h2>

                <iframe
                    src='https://player.beatstars.com/?storeId=113795'
                    width='100%'
                    height='800px'
                    style={{ maxHeight: '1024px', borderRadius: '8px', marginTop: 28 }}
                ></iframe>
            </div>
        </div>
    );
};

export default Beatstars;
