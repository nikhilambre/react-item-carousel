import {memo} from "react";
import {StyledArrowHead} from "./item-carousel.styles";

type arrowProps = {
    direction: string;
    onArrowClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    classes?: string;
    isRTL?: boolean;
};

const ArrowHead = ({direction, onArrowClick, classes, isRTL}: arrowProps): JSX.Element => {
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

export default memo(ArrowHead);
