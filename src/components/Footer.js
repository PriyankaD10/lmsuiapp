import React from "react";
import { isEmpty, trim } from 'lodash';
//import { styles } from '../css/styles.css'

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            
        };
        
    }
    
    
    render() {
        return (
            <div style={{ width: "100%" }}>
                <footer className="footer">
                    <span className="text-muted">All rights reserved 2022</span>
                </footer>
            </div>
        )
    }
}
export default Footer;