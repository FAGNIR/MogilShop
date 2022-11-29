import React, {useContext, useState} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from '../index'

import styled from "styled-components";

<link rel="stylesheet" href="LightPagination.css"></link>
const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const A = styled.div`
    cursor: pointer;
    :hover {
      color: white;
      text-shadow: 0 0 20px rgb(255, 224, 27),
                 0 0 20px rgb(255, 224, 27),
                 0 0 20px rgb(255, 224, 27),
                 0 0 20px rgb(255, 224, 27);
    }
        background-color: ${props => (props.selected ? 'red' : 'none')};
    `;

    const notActove = {
        display: 'block',
        margin: "5px",
        fontSize: "30px",
        backgroundColor: "#353535",
        textDecoration: 'none',
        padding: "20px",
        paddingBottom: "8px",
        paddingTop: "8px",
        border: "4px",
        borderRadius: '5px',
        boxShadow: 'insert 0 5px 10px rgba(0, 0, 0, .1), 0 2px 5px rgba(0, 0, 0, .5)',
        textShadow: '',
    };

    return (
    <div className="mt-5">
        <nav>
            <ul style={{
                margin: 0,
                padding: 0,
                display: 'flex'
            }}>
                {pages.map(page =>
                    <li 
                    style={{
                        listStyleType: "none",
                    }}

                    onClick={()=>device.setPage(page)}
                    >
                        <A
                            key={page}     
                            style={notActove}  
                        >{page}</A>
                    </li>
                
                )}
            </ul>
        </nav>
    </div>
     

    )
})

export default Pages