import React, {useRef, useState, useEffect} from "react";
import {StyledCarouselWrap, StyledCarousel, StyledCarouselItem} from "./item-carousel.styles";
import ArrowHead from "./arrow-head";

type props = {
    itemWidth: number;
    spaceBetween?: number; // value in px
    isShowArrows?: boolean;
    isDraggable?: boolean;
    slideToIndex?: number;
    slidesToScroll?: number;
    isRTL?: boolean;
    children: JSX.Element[];
};

/**
 * @param itemWidth - width of each item in pixels
 * @param spaceBetween - space between to items in pixels
 * @param isShowArrows - show or hide arrows conditionaly with props
 * @param isDraggable - is Drag to slide is enabled
 * @param slideToIndex - slide to item index on load
 * @param slidesToScroll - slides to scroll on each arrow click
 * @param isRTL - is show items in RTL fashion for arabic
 *
 * @returns JSX Element
 */
const ItemCarousel = ({
    itemWidth,
    spaceBetween = 8,
    isShowArrows = true,
    isDraggable = true,
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

            //  If slide to index is 0 then hide prev arrow
            if (slideToIndex === 0) {
                setShowArrowPrev(false);
            }

            //  If slide length + container width is more then we have reached end of carousel
            if (Math.abs(slideToIndex * itemWidth) + sliderRef.current.offsetWidth >= sliderWidth) {
                if (isRTL) {
                    setShowArrowPrev(false);
                } else {
                    setShowArrowNext(false);
                }
            }
        }
    }, [sliderWidth, slideToIndex, itemWidth]);

    const handleMouseLeave = () => {
        mouseDownRef.current = false;
        sliderRef.current.classList.remove("active");
        updateArrows();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.Touch) => {
        mouseDownRef.current = true;
        sliderRef.current.classList.add("active");
        mouseStartXRef.current = e.pageX - sliderRef.current.offsetLeft;
        mouseScrollLeftRef.current = sliderRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.Touch) => {
        if (!mouseDownRef.current) return;
        if (!isDraggable) return;

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

    const updatePosition = (isPrev: boolean) => {
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
                onMouseMove={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    handleMouseMove(e)
                }
                onMouseUp={() => handleMouseLeave()}
                onMouseDown={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                    handleMouseDown(e)
                }
                onMouseLeave={() => handleMouseLeave()}
                onTouchStart={(e: React.TouchEvent<HTMLSpanElement>) =>
                    handleMouseDown(e.changedTouches[0])
                }
                onTouchEnd={() => handleMouseLeave()}
                onTouchMove={(e: React.TouchEvent<HTMLSpanElement>) =>
                    handleMouseMove(e.changedTouches[0])
                }
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
