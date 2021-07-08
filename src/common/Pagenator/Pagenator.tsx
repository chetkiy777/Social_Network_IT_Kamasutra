import React , {useState} from 'react';
import classes from "./pagenator.module.css";
import cn from "classnames";

type Props = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
}

let Pagenator: React.FC<Props> = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber , setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (<div className={classes.pagenator}>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1) }}>PREV</button> }

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                    return <span className={ cn({
                    [classes.selectedPage] : currentPage === p }, classes.pageNumber) }
                                 key={p}
                                 onClick={(e) => {
                                     onPageChange(p)
                                 }}>{p}</span>
                })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1) }}>NEXT</button> }

            </div>
    )
};

export default Pagenator;