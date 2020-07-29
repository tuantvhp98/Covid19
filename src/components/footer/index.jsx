import React from 'react';
import styled from 'styled-components';
const STFooter = styled.div`
    position: relative;
    background: #2e3a49;
    color:white;
    width: 100%;
    height: 70px;
    bottom: 0px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
`
function Footer(props) {
    return (
        <STFooter >
            <h4>Design by narTuan</h4>
        </STFooter>
    );
}

export default Footer;