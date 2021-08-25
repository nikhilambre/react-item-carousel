import React, {useRef, useState, useEffect} from "react";
import {
    StyledCarouselWrap,
    StyledCarousel,
    StyledCarouselItem,
    StyledArrowHead
} from "./item-carousel.styles";

type props = {
    itemWidth: number;
    spaceBetween?: number;
    isShowArrows?: boolean;
    slideToIndex?: number;
    slidesToScroll?: number;
    isRTL?: boolean;
    children: JSX.Element[];
};

const ItemCarousel = ({
    itemWidth,
    spaceBetween = 8,
    isShowArrows = true,
    slideToIndex = 0,
    slidesToScroll = 1,
    isRTL = false,
    children
}: props): JSX.Element => {
    const sliderRef = useRef(null);
    const sliderItemRef = useRef(null);
    const mouseDownRef = useRef(false);
    const mouseStartXRef = useRef(0);
    const mouseScrollLeftRef = useRef(0);

    const [showArrows, setShowArrows] = useState(isShowArrows);
    const [showArrowNext, setShowArrowNext] = useState(true);
    const [showArrowPrev, setShowArrowPrev] = useState(true);

    const sliderWidth = children.length * itemWidth;

    useEffect(() => {
        // if (media.isSmallMobile || media.isMobile || media.isTab) {
        //     setShowArrows(false);
        // }
        if (sliderRef.current.offsetWidth > sliderWidth) {
            setShowArrows(false);
            sliderRef.current.style.justifyContent = "center";
        } else {
            sliderRef.current.style.justifyContent = "unset";
            sliderRef.current.scrollLeft = slideToIndex * itemWidth;
        }
        if (sliderRef.current.scrollLeft === 0) {
            setShowArrowPrev(false);
        }
    }, [sliderWidth, slideToIndex, itemWidth]);

    const handleMouseLeave = () => {
        mouseDownRef.current = false;
        sliderRef.current.classList.remove("active");
        updateArrows();
    };

    const handleMouseDown = (e) => {
        mouseDownRef.current = true;
        sliderRef.current.classList.add("active");
        mouseStartXRef.current = e.pageX - sliderRef.current.offsetLeft;
        mouseScrollLeftRef.current = sliderRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!mouseDownRef.current) return;

        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - mouseStartXRef.current) * 2;
        sliderRef.current.scrollLeft = mouseScrollLeftRef.current - walk;
    };

    const onArrowClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const classes = (e.target as HTMLSpanElement)?.classList;
        if (
            classes.contains("hsb-arrow-prev") ||
            classes.contains("svg-prev") ||
            classes.contains("path-prev")
        ) {
            sliderRef.current.scrollLeft = updatePosition(true);
        } else if (
            classes.contains("hsb-arrow-next") ||
            classes.contains("svg-next") ||
            classes.contains("path-next")
        ) {
            sliderRef.current.scrollLeft = updatePosition(false);
        }
        updateArrows();
    };

    const updateArrows = () => {
        if (sliderRef.current.scrollLeft === 0) setShowArrowPrev(false);
        else setShowArrowPrev(true);

        if (Math.abs(sliderRef.current.scrollLeft) + sliderRef.current.offsetWidth === sliderWidth)
            setShowArrowNext(false);
        else setShowArrowNext(true);
    };

    const updatePosition = (isPrev) => {
        if ((isRTL && isPrev) || (!isRTL && !isPrev)) {
            return sliderRef.current.scrollLeft + itemWidth * slidesToScroll;
        }
        return sliderRef.current.scrollLeft - itemWidth * slidesToScroll;
    };

    return (
        <StyledCarouselWrap
            className={`nik-carousel-wrap ${
                showArrows && showArrowNext ? (isRTL ? "prev-end" : "next-end") : ""
            } ${showArrows && showArrowPrev ? (isRTL ? "next-end" : "prev-end") : ""}`}
        >
            <StyledCarousel
                ref={sliderRef}
                className={`nik-carousel`}
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseUp={() => handleMouseLeave()}
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseLeave={() => handleMouseLeave()}
                onTouchStart={(e) => handleMouseDown(e.changedTouches[0])}
                onTouchEnd={() => handleMouseLeave()}
                onTouchMove={(e) => handleMouseMove(e.changedTouches[0])}
            >
                {children.map((item, index) => (
                    <StyledCarouselItem
                        key={index}
                        ref={sliderItemRef}
                        className="nik-carousel-item"
                        itemWidth={itemWidth}
                        spaceBetween={spaceBetween}
                    >
                        {item}
                    </StyledCarouselItem>
                ))}
            </StyledCarousel>
            {showArrows && showArrowNext ? (
                <ArrowHead
                    direction="next"
                    classes={""}
                    onArrowClick={onArrowClick}
                    isRTL={isRTL}
                />
            ) : null}
            {showArrows && showArrowPrev ? (
                <ArrowHead
                    direction="prev"
                    classes={""}
                    onArrowClick={onArrowClick}
                    isRTL={isRTL}
                />
            ) : null}
        </StyledCarouselWrap>
    );
};

export default ItemCarousel;

type arrowProps = {
    direction: string;
    onArrowClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    classes?: string;
    isRTL?: boolean;
};

const ArrowHead = ({direction, onArrowClick, classes, isRTL}: arrowProps) => {
    let arrow = <span></span>;
    if (direction === "next") {
        arrow = (
            <svg viewBox="0 0 32 32" className="nik-icon-svg svg-next" aria-hidden="true">
                <path
                    className="path-next"
                    d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z"
                />
            </svg>
        );
    }
    if (direction === "prev") {
        arrow = (
            <svg viewBox="0 0 32 32" className="nik-icon-svg svg-prev" aria-hidden="true">
                <path
                    className="path-prev"
                    d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"
                />
            </svg>
        );
    }
    return (
        <StyledArrowHead
            className={`nik-arrow nik-arrow-` + direction + " " + classes}
            role="button"
            onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => onArrowClick(e)}
            isRTL={isRTL}
        >
            {arrow}
        </StyledArrowHead>
    );
};
