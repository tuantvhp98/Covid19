import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

InfoBox.propTypes = {
    label: PropTypes.string,
    total: PropTypes.number,
    numToday: PropTypes.number,
    icon: PropTypes.string,
    color:PropTypes.string,
    changeClick:PropTypes.func,
    background:PropTypes.string,
};
const convertNum = (num) => {
    const a = num ? numeral(parseInt(num)).format('0.0a') : '0';
    return a
}
InfoBox.defaultProps = {
    label: "",
    total: 0,
    numToday: 0,
    icon: '',
    color:'',
    changeClick:null,
    background:'',
}

function InfoBox(props) {
    const { label, total, numToday, icon, color, changeClick, background } = props;
    const handleChangClick = () =>{
        if(changeClick){
            changeClick()
        }
    }
    return (
        <div className="info" style={{borderTop:`5px solid ${background}`, cursor:'pointer'}} onClick={handleChangClick}>
            <div className="info-icon">
                <img style={{width: '45px'}} src={icon} alt="" />
            </div>
            <div className="info-body">
                <p style={{ fontWeight: 'bold', fontSize: "17px",color: color }}>{label}</p>
                <p style={{ fontWeight: 'bold', color: color, fontSize: "30px" }}>+{numToday}</p>
                <p style={{ fontWeight: 'bold', color: '#898585', fontSize:'15px' }}>{convertNum(total)} tổng số</p>
            </div>
        </div>
    );
}

export default InfoBox;