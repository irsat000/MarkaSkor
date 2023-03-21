import React from 'react';
import { Tag, Pentagon, Calendar, Star, StarHalf, StarFill, ListUl, ChatLeft } from 'react-bootstrap-icons';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';

export const Page_Brand = () => {
    const { brandId } = useParams();

    return (
        <div className='page_content'>
            <NavDesktop />
            <section>
                <AppHeader page="Marka" />
                <main className='main-brand'>
                    <div className='brand_info_section'>
                        <div className='brand_primary'>
                            <div className='b_logo'>
                                <img src={require('../assets/images/brands_temp/cocacola.png')} alt='Coca Cola logo' />
                            </div>
                            <div className='b_name'>
                                <Tag className='icon' />
                                <span>Coca Cola</span>
                            </div>
                            <div className='b_details-cont'>
                                <div className='b_category'>
                                    <Pentagon className='icon' />
                                    <span>Tüketim - Gıda</span>
                                </div>
                                <div className='b_date'>
                                    <Calendar className='icon' />
                                    <span>08/05/1886</span>
                                </div>
                            </div>
                            <div className='b_rating_min'>
                                <StarFill className='icon' />
                                <StarFill className='icon' />
                                <StarFill className='icon' />
                                <StarHalf className='icon' />
                                <Star className='icon' />
                            </div>
                        </div>
                        <div className='brand_products'>
                            <div className='b_products_heading'>
                                <ListUl className='icon' /><h3>Ürünler</h3>
                            </div>
                            <ul className='b_products_list'>
                                <li>
                                    <Link to={''}>
                                        Coca Cola (250ml - 3lt)
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        Coca Cola Zero Sugar
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        Coca Cola Cherry Vanilla
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        Coca Cola Cherry Vanilla Zero Sugar
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        Coca Cola Creation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='review_section'>
                        <div className='brand_subpage_nav'>
                            <span className='b_reviewing-btn'>Puanla</span>
                            <span className='b_showReviews-btn'>Skor</span>
                        </div>
                        <div className='brand_subpage'>
                            <div className='b_userReview'>
                                <div className='b_userRating'>
                                    <h5>Değerlendir</h5>
                                    <div className='b_rate-wrap'>
                                        <StarFill className='icon' />
                                        <StarFill className='icon' />
                                        <StarHalf className='icon' />
                                        <Star className='icon' />
                                        <Star className='icon' />
                                    </div>
                                </div>
                                <div className='b_userCommenting'>
                                    <h6>Yorum yap</h6>
                                    <div className='b_comment-wrap'>
                                        <textarea placeholder='Yorum yap!' />
                                        <button type='button'>Gönder</button>
                                    </div>
                                </div>
                            </div>

                            <div className='b_reviews'>
                                <div className='b_ratingSummary'>
                                    <div className='b_ratingNumber'>
                                        <span>4.3<span>/5</span></span>
                                    </div>
                                    <div className='b_rating-cont'>
                                        <div className='b_rating'>
                                            <StarFill className='icon' />
                                            <StarFill className='icon' />
                                            <StarFill className='icon' />
                                            <StarFill className='icon' />
                                            <Star className='icon' />
                                        </div>
                                        <span>Toplam 387 oy</span>
                                    </div>
                                </div>
                                <div className='b_ratingDetails'>
                                    <table cellSpacing="0" cellPadding="0">
                                        <tr>
                                            <td className='b_rt_stars-col'>
                                                <div className='b_rt_stars'>
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                </div>
                                            </td>
                                            <td className='b_rt_bar-col'>
                                                <div className='b_rt_bar'>
                                                    <div className='b_rt_bar_fill'></div>
                                                </div>
                                            </td>
                                            <td className='b_rt_count-col'>
                                                <div className='b_rt_count'>
                                                    <span>(240)</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='b_rt_stars-col'>
                                                <div className='b_rt_stars'>
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                </div>
                                            </td>
                                            <td className='b_rt_bar-col'>
                                                <div className='b_rt_bar'>
                                                    <div className='b_rt_bar_fill'></div>
                                                </div>
                                            </td>
                                            <td className='b_rt_count-col'>
                                                <div className='b_rt_count'>
                                                    <span>(65)</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='b_rt_stars-col'>
                                                <div className='b_rt_stars'>
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                </div>
                                            </td>
                                            <td className='b_rt_bar-col'>
                                                <div className='b_rt_bar'>
                                                    <div className='b_rt_bar_fill'></div>
                                                </div>
                                            </td>
                                            <td className='b_rt_count-col'>
                                                <div className='b_rt_count'>
                                                    <span>(24)</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='b_rt_stars-col'>
                                                <div className='b_rt_stars'>
                                                    <StarFill className='icon' />
                                                    <StarFill className='icon' />
                                                </div>
                                            </td>
                                            <td className='b_rt_bar-col'>
                                                <div className='b_rt_bar'>
                                                    <div className='b_rt_bar_fill'></div>
                                                </div>
                                            </td>
                                            <td className='b_rt_count-col'>
                                                <div className='b_rt_count'>
                                                    <span>(8)</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='b_rt_stars-col'>
                                                <div className='b_rt_stars'>
                                                    <StarFill className='icon' />
                                                </div>
                                            </td>
                                            <td className='b_rt_bar-col'>
                                                <div className='b_rt_bar'>
                                                    <div className='b_rt_bar_fill'></div>
                                                </div>
                                            </td>
                                            <td className='b_rt_count-col'>
                                                <div className='b_rt_count'>
                                                    <span>(50)</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='b_reviewList_heading'>
                                    <ChatLeft className='icon' /><span>Yorumlar (26)</span>
                                </div>
                                <div className='b_reviewList'>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
};

