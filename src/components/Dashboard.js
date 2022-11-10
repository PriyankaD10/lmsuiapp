import React from "react";
import { isEmpty, trim } from 'lodash';
//import { styles } from '../css/styles.css'
import CourseService from '../services/CourseService';
import { withRouter } from "../withRouter";
import { login } from '../features/user';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            searchParams: {
                searchBy: 'course',
                searchText: '',
                duration: '-1',
                from: '',
                to: ''
            },
            userInfo: {},
            errorMessage: '',
            showDrawer: false,
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.signOut = this.signOut.bind(this);
       this.viewAll = this.viewAll.bind(this);
    }

    componentDidMount() {
        const userInfo = this.props.selector.user;
                CourseService.getCourses().then((res) => {
                    let data = res.data;
                    this.setState({ courseList: data, userInfo: userInfo })
                })
    }

    viewAll () {
        CourseService.getCourses().then((res) => {
            let data = res.data;
            this.setState({ courseList: data })
        })
    }
    onChangeValue(event) {
        let searchParams = this.state.searchParams;
        if (event.target.name === "searchBy") {
            searchParams.searchBy = event.target.value;
        }
        if (event.target.name === "searchText") {
            searchParams.searchText = trim(event.target.value);
        }
        if (event.target.name === "duration") {
            searchParams.duration = trim(event.target.value);
            if (trim(event.target.value) !== "-1") {
                let range = trim(event.target.value).split("_");
                if (range.length > 0) {
                    searchParams.from = trim(range[0]);
                    searchParams.to = trim(range[1]);
                }
            }
        }
        this.setState({ searchParams: searchParams })
    }

    addCourse = () => {
        this.props.navigate('/add-course')
    }

    signOut = (e) => {
        let userInfo = this.state.userInfo;
        console.log(JSON.stringify(userInfo))
        let loginInfo =  new Object();
        loginInfo.isLoggedIn =false;
        loginInfo.status ="OK";
        loginInfo.user = userInfo;
        this.props.dispatch(login(loginInfo));
        this.props.navigate('/login')
    }

    validate = () => {
        let isValid = true;
        let searchParams = this.state.searchParams;
        let errorMessage = this.state.errorMessage;
        if (searchParams.searchText === "" && searchParams.duration === "-1") {
            isValid = false;
            errorMessage ="Please provide course/technology/duration to continue search";
        }
        if (isValid) {
            errorMessage = '';
            CourseService.getCoursesBySearchParams(searchParams).then((res) => {
                let data = res.data;
                this.setState({ courseList: data, errorMessage: '' })
            })
        }else{
            this.setState({ errorMessage: errorMessage })
        }
        
    }

    getSearchComponent = () => {
        return (
            <div style={{ fontSize: "smaller" }}>
                <div onChange={this.onChangeValue} style={{ display: "inline" }}>
                    <input type="radio" value="course" name="searchBy" defaultChecked /> Course &nbsp; &nbsp; &nbsp; &nbsp;
                    <input type="radio" value="technology" name="searchBy" /> Technology &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
                <input id="searchText" name="searchText" type="text" placeholder="Search course/technology" onChange={this.onChangeValue} /> &nbsp; &nbsp;
                Duration &nbsp; &nbsp; <select type="select" id="duration" name="duration" onChange={this.onChangeValue} value={this.state.searchParams.duration} >
                    <option value="-1">Select</option>
                    <option value="24_48">1 to 2 Days</option>
                    <option value="48_168">2 Days to 1 Week</option>
                    <option value="168_336">1 to 2 Weeks</option>
                    <option value="336_504">2 to 3 Weeks</option>
                    <option value="504_672">3 to 4 Weeks(1 month)</option>
                </select> &nbsp; &nbsp; &nbsp; &nbsp;
                <button type="submit" onClick={(e) => this.validate()}>Search</button>
            </div>
        )
    }

    getDataRows = () => {
        let rows = this.state.courseList.map(course => {
            return (<tr key={course.id}>
                <td className="coldata" key="1">{course.courseName}</td>
                <td className="coldata" key="2">{course.courseDescription}</td>
                <td className="coldata" key="3">{course.technology}</td>
                <td className="coldata" key="4">{course.duration}</td>
                <td className="coldata" key="5">{course.launchUrl}</td>
                {this.state.userInfo.username === "admin" ? <td className="coldata" key="6"><button onClick={(event)=> {this.deleteCourse(course.courseName,event)}}>Delete</button></td> : null}
            </tr>)
        })
        return rows;
    }

    deleteCourse =  (courseName,event)  =>{
            CourseService.deleteCourse(courseName).then((res) => {
                let status = res.data;
                if(status === 1){
                    alert("Course deleted successfully.");
                }else{
                    alert("Error : Could not delete course.");
                }
            })
           this.viewAll();
    }
   /*  showErrorMessage  () {
        let errorMessage = this.state.errorMessage;
        let content = null;
        if( errorMessage.length > 0){
            content = errorMessage.map((err, i) => {
                <li className="error" key={i}>{err}</li>
        })
    }
    return (
        <div>{content}</div>
    )
    } */
    

    render() {
        return (
            <div style={{ width: "100%", padding: "2%" }}>
                <h6 className="text-right">Hi, {this.state.userInfo ? this.state.userInfo.username : null}</h6>
                <a href="#" onClick={this.signOut} className="text-right" style={{float:"right"}}><span>Sign out</span></a>
                <h6 className="text-left">Search Course</h6>
                <div className="row">
                    {this.getSearchComponent()}
                </div>
                <p><span className="error">{this.state.errorMessage}</span></p>
                <div className="row" style={{ paddingTop: "2%" }}>
                    {this.state.userInfo != null && this.state.userInfo.username === "admin" ?
                        <button className="tableheader" onClick={this.addCourse}>Add New Course</button> : null}
                        &nbsp;&nbsp;<button className="tableheader" style={{display:"inline", paddingLeft:"2%"}} onClick={this.viewAll}>View All</button>
                </div>
                <h6 className="text-center" style={{ padding: "2%" }}>Course List</h6>
                <div className="row" style={{ background: "white" }}>
                    <table className="table table-striped tableble-bordered">
                        <thead>
                            <tr>
                                <th className="tableheader">Course Name</th>
                                <th className="tableheader">Description</th>
                                <th className="tableheader">Technology</th>
                                <th className="tableheader">Duration</th>
                                <th className="tableheader">LaunchURL</th>
                                {this.state.userInfo != null && this.state.userInfo.username === "admin" ? <th className="tableheader">Actions</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courseList.length > 0 ? this.getDataRows() : <tr><td colSpan="5">{"No records to show"}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default withRouter(Dashboard);

