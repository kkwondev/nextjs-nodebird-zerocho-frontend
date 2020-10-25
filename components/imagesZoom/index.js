import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import Slick from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import {CloseOutlined} from '@ant-design/icons';

const Overlay = styled.div`
    position:fixed;
    z-index:1000;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;
const Header = styled.header`
    header:44px;
    background: #fff;
    position:relative;
    padding:0;
    text-align:center;

    & h1 {
        margin:0;
        font-size:17px;
        color:#333;
        line-height:44px;
    }
`;
const CloseBtn = styled(CloseOutlined)`
    position:absolute;
    right:0;
    top:0;
    padding:15px;
    line-height:14px;
    cursor:pointer;
`;

const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background:rgba(0,0,0,0.6);
`;

const ImgWrapper = styled.div `
    padding:32px;
    text-align:center;

    & img {
        margin: 0 auto;
        max-height:750px;
    }
`;

const Indicator = styled.div `
    text-align:center;

    & > span {
        width: 75px;
        height:30px;
        line-height:30px;
        border-radius:15px;
        background:#313131;
        display:inline-block;
        text-align:center;
        color:#fff;
        font-size:15px;
    }
`;
const Global = createGlobalStyle`
    .slick-slide {
        display:inline-block;
    }
    .ant-card-cover {
        -webkit-transform:none !important;
        transform: none !important;
    }
`;

const ImagesZoom = ({images, onClose}) => {
    const [currentSlide,setCurrentSlide] =useState(0);

    
    const handleKeyPress = useCallback((e) => {
        // 엔터키 눌렀을때 종료
    if(e.key === "Enter") {
        onClose();
    }
    },[])
    return(
    <Overlay onKeyPress={handleKeyPress}>
        <Global/>
        <Header>
            <h1>
                상세이미지
            </h1>
            <CloseBtn onClick={onClose} >X</CloseBtn>
        </Header>
        <SlickWrapper>
            <div>
                <Slick
                initialSlide={0}
                afterChange={(slide) => setCurrentSlide(slide)} 
                infinite
                arrows={false}
                slidesToShow={1}
                slidesToScroll={1}
                >
                    {images.map((v) => (
                        <ImgWrapper key={v.src}>
                            <img src={v.src} alt={v.src}/>
                        </ImgWrapper>
                    ))}
                </Slick>
                <Indicator>
                    <span>
                        {currentSlide +1} / {images.length}
                    </span>
                </Indicator>
            </div>
        </SlickWrapper>
    </Overlay>
    );
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ImagesZoom;