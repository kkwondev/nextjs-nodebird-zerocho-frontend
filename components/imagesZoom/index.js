import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import Slick from 'react-slick';
import { Overlay, Global, Header, CloseBtn, Indicator, ImgWrapper, SlickWrapper } from './styles'



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
                beforeChange={(slide) => setCurrentSlide(slide)} 
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
                    <div>
                        {currentSlide +1} / {images.length}
                    </div>
                </Indicator>
            </div>
        </SlickWrapper>
    </Overlay>
    );
}

ImagesZoom.PropTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
}

export default ImagesZoom;