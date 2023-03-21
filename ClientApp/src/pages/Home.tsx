import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';
import sectorsData from '../data/sectors.json';

export const Page_Home = () => {
    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Anasayfa" />
                <main className='main-index'>
                    <div className='mainpage_heading'>
                        <span>MarkaSkor</span>
                    </div>
                    <div className="search-main-cont">
                        <input type="text" placeholder="Marka ara" />
                        <Search className='search_input-icon' />
                    </div>
                    <div className='sectors_heading'>
                        <span>Sektörler</span>
                    </div>
                    <article>
                        {sectorsData.map((sector) => {
                            /*const sectorName = sector.sectorName
                                .toLowerCase()
                                .replace('ş', 's')
                                .replace('ğ', 'g')
                                .replace('ç', 'c')
                                .replace('ı', 'i')
                                .replace('İ', 'i')
                                .replace('ö', 'o')
                                .replace('ü', 'u');*/
                            return (
                                <Link to={`/d/${sector.sectorKey}`} className='sector_item' key={sector.id}>
                                    <div className='sector_item_img-cont'>
                                        <img src={require(`../assets/images/sectors/${sector.img}`)} alt={sector.sectorName} />
                                    </div>
                                    <span>{sector.sectorName}</span>
                                </Link>
                            )
                        })}
                    </article>
                </main>
            </section>
        </div>
    )
};


/*<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/goods.png')} alt='Tüketim' />
    </div>
    <span>Tüketim</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/technology.png')} alt='Teknoloji' />
    </div>
    <span>Teknoloji</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/fashion.png')} alt='Moda' />
    </div>
    <span>Moda</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/retail.png')} alt='Perakende' />
    </div>
    <span>Perakende</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/automotive.png')} alt='Otomotiv' />
    </div>
    <span>Otomotiv</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/education.png')} alt='Eğitim' />
    </div>
    <span>Eğitim</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/finance.png')} alt='Finans' />
    </div>
    <span>Finans</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/energy.png')} alt='Enerji' />
    </div>
    <span>Enerji</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/travel.png')} alt='Seyahat' />
    </div>
    <span>Seyahat</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/health.png')} alt='Sağlık' />
    </div>
    <span>Sağlık</span>
</div>
<div className='sector_item'>
    <div className='sector_item_img-cont'>
        <img src={require('../assets/images/sectors/service.png')} alt='Servis' />
    </div>
    <span>Servis</span>
</div>*/