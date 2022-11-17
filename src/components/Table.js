import { useEffect, useState } from 'react';
import { Icons } from './Icons';


export default function Table({
    tableData,
    columnMap,
    options = [],
    isHavePaginator,
    isLoad,
    reorderColumns,
    onRowClick
}) {

    const PAGE_ITEMS = 25;
    const [pages, setPages] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [currOrder, setCurrOrder] = useState(null);

    useEffect(() => {
        setPages(Math.ceil(tableData.length / PAGE_ITEMS));
        setSelectedPage(0)
    }, [tableData])

    useEffect(() => {
        setSelectedPage(0)
    }, [currOrder])

    const dataToShow = (data, isHavePaginator, selectedPage, order) => {
        let returnedData = [...data];
        if (order) {
            returnedData = returnedData.sort((a, b) => {
                if (a[order.key] < b[order.key]) return -1;
                if (a[order.key] > b[order.key]) return 1;
                return 0
            })
            if (order.isReverse) returnedData = returnedData.reverse();
        }
        if (isHavePaginator) {
            returnedData = returnedData.slice(selectedPage * PAGE_ITEMS, Math.min(tableData.length, (selectedPage * PAGE_ITEMS) + PAGE_ITEMS))
        }
        return returnedData;
    }


    return (
        <div className='table-container' >
            <table className='table'>
                <thead>
                    <tr>
                        {
                            Object.keys(columnMap).map((key, idx) => (
                                <th key={idx}>
                                    <div className='flex align-center gap-0-5'>
                                        {columnMap[key]}
                                        {
                                            reorderColumns &&
                                            reorderColumns.some(column => column === key) && (
                                                <div className='flex column arrow-button-container'>
                                                    <button
                                                        onClick={() => { setCurrOrder({ key: key, isReverse: true }) }}
                                                        className={`${(currOrder?.key === key && currOrder?.isReverse) ? 'curr' : ''}`}
                                                    >
                                                        <Icons icon="arrow-up" />
                                                    </button>
                                                    <button
                                                        onClick={() => { setCurrOrder({ key: key, isReverse: false }) }}
                                                        className={`${(currOrder?.key === key && !currOrder?.isReverse) ? 'curr' : ''}`}
                                                    >
                                                        <Icons icon="arrow-down" />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </th>
                            ))
                        }
                        {!!options.length && <th>Options</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        dataToShow(tableData, isHavePaginator, selectedPage, currOrder).map((data, idx) => (
                            <tr
                                key={idx}
                                onClick={() => { if (onRowClick) onRowClick(data) }}
                            >
                                {
                                    Object.keys(columnMap).map((key, idx) => (

                                        <td data-label={columnMap[key]} key={key} >
                                            {data[key]}
                                        </td>
                                    ))
                                }
                                {
                                    !!options.length &&
                                    <td className='options'>
                                        {
                                            options.map((option, idx) => (
                                                <button className='button-primary' key={idx} onClick={() => option.cb(data.id)} title={option.icon} >
                                                    <Icons icon={option.icon} />
                                                </button>
                                            ))
                                        }
                                    </td>
                                }
                            </tr>
                        ))
                    }
                    {
                        isLoad &&
                        <tr>
                            <td colSpan={Object.keys(columnMap).length + ((!!options.length) ? 1 : 0)} ><div className='loader' ></div></td>
                        </tr>
                    }
                    {
                        !tableData.length && !isLoad &&
                        <tr>
                            <td colSpan={Object.keys(columnMap).length + ((!!options.length) ? 1 : 0)} >No data to show</td>
                        </tr>
                    }

                </tbody>
            </table>
            {
                isHavePaginator && pages > 1 && (
                    <div className='paginator'>
                        {
                            pages <= 7 && (
                                Array.from(Array(pages).keys()).map(page => (
                                    <div
                                        key={page}
                                        className={`page ${page === selectedPage ? 'curr' : ''}`}
                                        onClick={() => setSelectedPage(page)}
                                    >
                                        {page + 1}
                                    </div>
                                ))

                            )
                        }
                        {
                            pages > 7 && (
                                selectedPage > 3 && selectedPage < pages - 4 && (
                                    <>
                                        <div
                                            onClick={() => setSelectedPage(0)}
                                            className={`page ${0 === selectedPage ? 'curr' : ''}`}
                                        >
                                            1
                                        </div>
                                        <span>&#183;&#183;&#183;</span>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage - 2)}
                                            className={`page`}
                                        >
                                            {selectedPage - 1}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage - 1)}
                                            className={`page`}
                                        >
                                            {selectedPage}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage)}
                                            className={`page curr`}
                                        >
                                            {selectedPage + 1}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage + 1)}
                                            className={`page`}
                                        >
                                            {selectedPage + 2}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage + 2)}
                                            className={`page`}
                                        >
                                            {selectedPage + 3}
                                        </div>
                                        <span>&#183;&#183;&#183;</span>
                                        <div
                                            onClick={() => setSelectedPage(pages - 1)}
                                            className={`page ${0 === pages - 1 ? 'curr' : ''}`}
                                        >
                                            {pages}
                                        </div>
                                    </>
                                )
                                ||
                                selectedPage <= 3 && (
                                    <>
                                        {


                                            Array.from(Array(selectedPage + 1).keys()).map(page => (
                                                <div
                                                    key={page}
                                                    className={`page ${page === selectedPage ? 'curr' : ''}`}
                                                    onClick={() => setSelectedPage(page)}
                                                >
                                                    {page + 1}
                                                </div>
                                            ))
                                        }
                                        <div
                                            onClick={() => setSelectedPage(selectedPage + 1)}
                                            className={`page`}
                                        >
                                            {selectedPage + 2}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage + 2)}
                                            className={`page`}
                                        >
                                            {selectedPage + 3}
                                        </div>
                                        <span>&#183;&#183;&#183;</span>
                                        <div
                                            onClick={() => setSelectedPage(pages - 1)}
                                            className={`page ${0 === pages - 1 ? 'curr' : ''}`}
                                        >
                                            {pages}
                                        </div>
                                    </>
                                )
                                ||
                                selectedPage >= pages - 4 && (
                                    <>
                                        <div
                                            onClick={() => setSelectedPage(0)}
                                            className={`page ${0 === selectedPage ? 'curr' : ''}`}
                                        >
                                            1
                                        </div>
                                        <span>&#183;&#183;&#183;</span>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage - 2)}
                                            className={`page`}
                                        >
                                            {selectedPage - 1}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage - 1)}
                                            className={`page`}
                                        >
                                            {selectedPage}
                                        </div>
                                        <div
                                            onClick={() => setSelectedPage(selectedPage)}
                                            className={`page curr`}
                                        >
                                            {selectedPage + 1}
                                        </div>
                                        {
                                            Array.from(Array(pages - selectedPage - 1).keys()).reverse().map(pageSub => (
                                                <div
                                                    key={pageSub}
                                                    className={`page`}
                                                    onClick={() => setSelectedPage(pages - pageSub - 1)}
                                                >
                                                    {pages - pageSub}
                                                </div>
                                            ))
                                        }
                                    </>
                                )


                            )
                        }
                    </div>
                )
            }
        </div >
    )
}