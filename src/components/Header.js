import React from "react";
import { isEmpty, trim } from 'lodash';
//import { styles } from '../css/styles.css'



class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            
        };
        
    }
    
    
    render() {
        return (
            <div style={{ width: "100%" }}>
                <header>
                    <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://localhost:3000/" className="navbar-brand">Learning Courses</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}
export default Header;