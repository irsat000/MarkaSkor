import React from 'react';
import { Tag, Pentagon } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';


export const Page_Discover = () => {
    const { sectorKey } = useParams();
    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Keşfet" />
                <main className='main-discover'>
                    <div className='discover_group-heading-cont'>
                        <div className='discover_group-heading-icon'>
                            <Pentagon />
                        </div>
                        <span>Kategori Seç</span>
                    </div>

                    <div className='d-category_list'>
                        {Array.from(Array(10), (e, i) => {
                            return (
                                <div className='d-category_item' key={i}>
                                    <div className='d-categorySymbol'>
                                        <img src={require('../assets/images/SiteIcon.png')} alt="Category name" />
                                    </div>
                                    <span>Hepsi</span>
                                </div>
                            )
                        })}
                        <div className='d-category_item'>
                            <div className='d-categorySymbol'>
                                <img src={require('../assets/images/SiteIcon.png')} alt="Category name" />
                            </div>
                            <span>Hepsi</span>
                        </div>
                    </div>

                    <div className='discover_group-heading-cont'>
                        <div className='discover_group-heading-icon'>
                            <Tag />
                        </div>
                        <span>Markalar</span>
                    </div>

                    <div className='d-brand_list'>
                        {Array.from(Array(10), (e, i) => {
                            return (
                                <Link to={`/marka/${i}`} className='d-brand_item' key={i}>
                                    <div className='brand_logo-cont'>
                                        <img src={require('../assets/images/brands_temp/cocacola.png')} alt="Coca Cola" />
                                    </div>
                                    <span className='brand_name'>
                                        Coca Cola
                                    </span>
                                    <div className='brand_evaluation-cont'>
                                        <span className='brand_evaluation'>3.5<span className='brand_maxRate'>/5</span></span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </main>
            </section>
        </div>
    )
};