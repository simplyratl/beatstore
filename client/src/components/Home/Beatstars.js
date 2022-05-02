import React from 'react';
import '../../style/dist/beatstars.min.css';

const Beatstars = () => {
    return (
        <div className='beatstars-container'>
            <div className='heading'>
                <h2>Instant Beat Store</h2>
                <h4>
                    You can buy beats <a href='/beats'>direct from site</a>, Paypal and Stripe allowed.
                </h4>
                <h4>Beatstars is avaiable too!</h4>
            </div>

            <div className='bulk-deals'>
                <h2>
                    <img src={require('../../assets/images/icons/party-ios.png')} alt='🎉' className='icon' />
                    BULK DEALS ARE NOW ACTIVE!
                    <img src={require('../../assets/images/icons/party-ios.png')} className='icon' />
                </h2>

                <span className='bulk-deal'>4x Basic License – $200 $95</span>
                <span className='bulk-deal'>4x Premium License – $500 $175</span>
                <span className='bulk-deal'>4x Unlimited License – $800 $250</span>

                <div className='ending-soon'>Deal ending soon... ⏰</div>

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
