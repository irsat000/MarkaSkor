import React from 'react';
import { Tag, Pentagon } from 'react-bootstrap-icons';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';


export const Page_Discover = () => {
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
                                <>
                                    <div className='d-category_item'>
                                        <div className='d-categorySymbol'>
                                            <img src={require('../assets/images/SiteIcon.png')} alt="Category name" />
                                        </div>
                                        <span>Hepsi</span>
                                    </div>
                                </>
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
                </main>
            </section>
        </div>
    )
};