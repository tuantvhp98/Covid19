import React from 'react';
const style ={
    display: "flex",
    justifyContent: "center",
    textAlign: "center",

}
function NotFound(props) {
    return (
        <div style={style}> 
            <h4 style={{fontSize:'50px'}}>Trang này không tồn tại</h4>
        </div>
    );
}

export default NotFound;