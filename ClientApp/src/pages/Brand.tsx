import React, { useState } from 'react';
import { Tag, Pentagon, Calendar, Star, StarHalf, StarFill, ListUl, ChatLeft } from 'react-bootstrap-icons';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '../components/template/Header';
import { NavDesktop } from '../components/template/NavDesktop';




const RatingBar = ({ totalRating, starRatingCount }: { totalRating: number, starRatingCount: number }) => {
    // Calculates the width percentage based on the number of people rated
    let widthPercentage = (starRatingCount / totalRating) * 100;

    // Adds a portion of remaining percentage for UX
    if (widthPercentage > 30) {
        widthPercentage = widthPercentage + ((100 - widthPercentage) / 2);
    }
    else if (widthPercentage > 20) {
        widthPercentage = widthPercentage + ((100 - widthPercentage) / 3);
    }
    else if (widthPercentage > 10) {
        widthPercentage = widthPercentage + ((100 - widthPercentage) / 4);
    }

    return (
        <td className='b_rt_bar-col'>
            <div className='b_rt_bar'>
                <div className='b_rt_bar_fill' style={{ width: `${widthPercentage}%` }}></div>
            </div>
        </td>
    );
};




const UserReview_Section = (props: {

}) => {
    //<h6>Puanla</h6> //There is no need to repeat myself I guess
    return (
        <div className={`b_userReview`}>
            <div className='b_userRating'>
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
                <span className='b_comment_warning'>*Yorum yapmadan önce puanla*</span>
            </div>
        </div>
    )
};

const Reviews_Section = (props: {

}) => {
    return (
        <div className={`b_reviews`}>
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
                    <span>Toplam 100 oy</span>
                </div>
            </div>
            <div className='b_ratingDetails'>
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr className='b_rt_five'>
                            <td className='b_rt_stars-col'>
                                <div className='b_rt_stars'>
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                </div>
                            </td>
                            <RatingBar totalRating={100} starRatingCount={25} />
                            <td className='b_rt_count-col'>
                                <div className='b_rt_count'>
                                    <span>(25)</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='b_rt_four'>
                            <td className='b_rt_stars-col'>
                                <div className='b_rt_stars'>
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                </div>
                            </td>
                            <RatingBar totalRating={100} starRatingCount={15} />
                            <td className='b_rt_count-col'>
                                <div className='b_rt_count'>
                                    <span>(15)</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='b_rt_three'>
                            <td className='b_rt_stars-col'>
                                <div className='b_rt_stars'>
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                </div>
                            </td>
                            <RatingBar totalRating={100} starRatingCount={20} />
                            <td className='b_rt_count-col'>
                                <div className='b_rt_count'>
                                    <span>(20)</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='b_rt_two'>
                            <td className='b_rt_stars-col'>
                                <div className='b_rt_stars'>
                                    <StarFill className='icon' />
                                    <StarFill className='icon' />
                                </div>
                            </td>
                            <RatingBar totalRating={100} starRatingCount={10} />
                            <td className='b_rt_count-col'>
                                <div className='b_rt_count'>
                                    <span>(10)</span>
                                </div>
                            </td>
                        </tr>
                        <tr className='b_rt_one'>
                            <td className='b_rt_stars-col'>
                                <div className='b_rt_stars'>
                                    <StarFill className='icon' />
                                </div>
                            </td>
                            <RatingBar totalRating={100} starRatingCount={30} />
                            <td className='b_rt_count-col'>
                                <div className='b_rt_count'>
                                    <span>(30)</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='b_reviewList_heading'>
                <ChatLeft className='icon' /><span>Yorumlar (6)</span>
            </div>
            <div className='b_reviewList'>

                {Array.from(Array(6), (e, i) => {
                    return (
                        <div className='b_review_item' key={i}>
                            <div className='b_r_header'>
                                <div className="b_r_profile">
                                    <img src={require('../assets/images/SiteIcon.png')} alt='Profile picture of reviewer' />
                                </div>
                                <div className="b_r_info-cont">
                                    <span className='b_r_username'>MrBombastic Fantastic</span>
                                    <div className='b_r_info'>
                                        <div className="b_r_evaluation">
                                            <StarFill className='icon' />
                                            <StarFill className='icon' />
                                            <StarFill className='icon' />
                                        </div>
                                        <span className='b_r_date'>13 gün önce</span>
                                    </div>
                                </div>
                            </div>
                            <div className='b_r_body'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum accusantium omnis non quibusdam consequatur ducimus hic, expedita voluptatum quos, vel sapiente fugit porro quod accusamus aperiam ullam amet animi. Doloribus.
                                </p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
};


export const Page_Brand = () => {
    const { brandId } = useParams();

    // Form switchers
    const [userRActive, setUserRActive] = useState(false);
    const [showRActive, setShowRActive] = useState(true);
    const switchReviewSection = () => {
        setUserRActive(!userRActive);
        setShowRActive(!showRActive);
    };

    //document.querySelector('.brand_primary').style.marginTop = (document.querySelector('.b_logo').offsetHeight / 2) + 'px';
    //document.querySelector('.brand_primary').style.paddingTop = ((document.querySelector('.b_logo').offsetHeight / 2) + 10) + 'px';

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
                                    <span>08 / 05 / 1886</span>
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
                    </div>
                    <div className='review_section'>
                        <div className='brand_subpage_nav'>
                            <span className={`b_reviewing-btn ${userRActive ? 'active' : ''}`} onClick={switchReviewSection}>Oyla</span>
                            <span className={`b_showReviews-btn ${showRActive ? 'active' : ''}`} onClick={switchReviewSection}>Skor</span>
                        </div>
                        <div className={`brand_subpage`}>
                            {userRActive && <UserReview_Section />}
                            {showRActive && <Reviews_Section />}
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
};

