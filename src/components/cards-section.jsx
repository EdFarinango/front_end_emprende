import React, { useState } from 'react'
import '../scss/cards.scss';
import twenty from '../components/assets/2020.svg';
import twentyone from '../components/assets/2021.svg';
import twentytwo from '../components/assets/2022.svg';

const Cards = () => {
    const [cards] = useState([
        {
            id: 1,
            title: 'Brand Recognition',
            text: 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.',
            icon: twenty
        },
        {
            id: 2,
            title: 'Detailed Records',
            text: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
            icon: twentyone
        },
        {
            id: 3,
            title: 'Fully Customizable',
            text: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
            icon: twentytwo
        }
    ]);
    return (
        <div className="cards">
            <div className="main-title">Hisotria</div>
            <div className="under-main-title"> Historia inicios de la comisión </div>
            <div className="cards-content">

                {cards.map((card) => {
                    return (<div className="card" key={card.id}>
                        <div className="card-icon">
                            <img src={card.icon} alt="icon" />
                        </div>
                        <p className="card-title">{card.title}</p>
                        <p className="card-text">{card.text}</p>
                    </div>
                    )
                })}
                <div className="connector"></div>
            </div>
        </div>
    );
}

export default Cards;