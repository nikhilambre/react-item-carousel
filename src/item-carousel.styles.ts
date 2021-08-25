import styled from "styled-components";

type StyledProps = {
    itemWidth: number;
    spaceBetween: number;
    isRTL: boolean;
};

export const StyledCarouselWrap = styled.div`
    &.nik-carousel-wrap {
        position: relative;

        &:hover .hsb-arrow {
            opacity: 0.5;
        }

        & .hsb-arrow:hover {
            opacity: 1;
        }

        &:after {
            position: absolute;
            bottom: 0;
            height: 100%;
            width: 100%;
            content: "";
            pointer-events: none;
        }

        &.next-end.prev-end:after {
            background: linear-gradient(
                to right,
                white 0%,
                transparent 5%,
                transparent 50%,
                transparent 95%,
                white 100%
            );
        }

        &.prev-end:after {
            background: linear-gradient(
                to right,
                white 0%,
                transparent 5%,
                transparent 85%,
                transparent 95%,
                transparent 100%
            );
        }

        &.next-end:after {
            background: linear-gradient(
                to right,
                transparent 0%,
                transparent 25%,
                transparent 85%,
                transparent 95%,
                white 100%
            );
        }
    }
`;
export const StyledCarousel = styled.div`
    &.nik-carousel {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        will-change: transform;
        user-select: none;

        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        &.active {
            cursor: grabbing;
            cursor: -webkit-grabbing;
        }
    }
`;

export const StyledCarouselItem = styled.div`
    &.nik-carousel-item {
        width: ${({itemWidth}: StyledProps) => itemWidth}px;
        min-width: ${({itemWidth}: StyledProps) => itemWidth}px;

        & > div {
            min-height: 100px;
            margin: 1rem ${({spaceBetween}: StyledProps) => spaceBetween / 2}px;
            border-radius: 0.3rem;
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 7%), 0 0 4px 0 rgb(0 0 0 / 16%);
        }
    }
`;

export const StyledArrowHead = styled.span`
    &.nik-arrow {
        padding: 1rem;
        display: flex;
        background: #fff;
        position: absolute;
        z-index: 99;
        border-radius: 50% !important;
        user-select: none;
        cursor: pointer;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 4px 0 rgb(0 0 0 / 16%);
        top: 33%;

        &:hover svg {
            fill: #999;
        }

        &-next {
            right: ${({isRTL}) => (isRTL ? "auto" : "1rem")};
            left: ${({isRTL}) => (isRTL ? "1rem" : "auto")};

            &.next-up {
                display: none;
            }
        }

        &-prev {
            right: ${({isRTL}) => (isRTL ? "1rem" : "auto")};
            left: ${({isRTL}) => (isRTL ? "auto" : "1rem")};

            &.prev-up {
                display: none;
            }
        }

        &.both-up {
            display: none;
        }

        svg {
            width: 1rem;
            height: 1rem;
            user-select: none;
            fill: #000;

            ${({isRTL}) => (isRTL ? `transform: rotate(180deg);` : "")}
        }
    }
`;
