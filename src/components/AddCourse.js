import React from "react";
import { isEmpty, trim, isNaN } from 'lodash';
import CourseService from '../services/CourseService';
import { withRouter } from "../withRouter";


class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {
                courseName: '',
                courseDescription: '',
                technology: '',
                duration: '',
                launchUrl: ''
            },
            errorMsgs: {
                courseNameMsg: '',
                courseDescMsg: '',
                technologyMsg: '',
                durationMsg: '',
                launchUrlMsg: ''
            }
        }
        this.saveCourse = this.saveCourse.bind(this);
        this.resetFieldValue = this.resetFieldValue.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.validateFieldValue = this.validateFieldValue.bind(this);
        this.navigateBack = this.navigateBack.bind(this)
    }

    onChangeValue(e) {
        let course = this.state.course;
        if (e.target.name === "courseName") {
            course.courseName = trim(e.target.value);
        }
        if (e.target.name === "courseDescription") {
            course.courseDescription = trim(e.target.value);
        }
        if (e.target.name === "technology") {
            course.technology = trim(e.target.value);
        }
        if (e.target.name === "launchUrl") {
            course.launchUrl = trim(e.target.value);
        }
        if (e.target.name === "duration") {
            course.duration = trim(e.target.value);
        }
        this.setState({ course: course })
    }

    validateFieldValue(e) {
        let isValid = true;
        let fieldValue = trim(e.target.value);
        let errorMsgs = this.state.errorMsgs;
        if (e.target.name === "courseName") {
            if (isEmpty(fieldValue)) {
                errorMsgs.courseNameMsg = 'Please enter course name.';
                isValid = false;
            } else if (fieldValue.length > 20) {
                errorMsgs.courseNameMsg = 'Maxmimum limit 20 letters.'
                isValid = false;
            }
            else {
                CourseService.isCourseNameExists(fieldValue).then((res) => {
                    let data = res.data;
                    if (res.data === true) {
                        errorMsgs.courseNameMsg = 'Course name already exists';
                        isValid = false;
                    }
                })
            }
            if (isValid) {
                errorMsgs.courseNameMsg = '';
            }
        }

        if (e.target.name === "courseDescription") {
            if (isEmpty(fieldValue)) {
                errorMsgs.courseDescMsg = 'Please enter course description.';
                isValid = false;
            } else if (fieldValue.length > 100) {
                errorMsgs.courseDescMsg = 'Maxmimum limit 100 letters.'
                isValid = false;
            }
            if (isValid) {
                errorMsgs.courseDescMsg = '';
            }
        }
        if (e.target.name === "technology") {
            if (isEmpty(fieldValue)) {
                errorMsgs.technologyMsg = 'Please enter technology.';
                isValid = false;
            }
            if (isValid) {
                errorMsgs.technologyMsg = '';
            }
        }
        if (e.target.name === "launchUrl") {
            if (isEmpty(fieldValue)) {
                errorMsgs.launchUrlMsg = 'Please enter launchUrl.';
                isValid = false;
            }
            if (isValid) {
                errorMsgs.launchUrlMsg = '';
            }
        }
        if (e.target.name === "duration") {
            if (isEmpty(fieldValue)) {
                errorMsgs.durationMsg = 'Please enter course description.';
                isValid = false;
            } else if (isNaN(fieldValue)) {
                errorMsgs.durationMsg = 'Please provide number in hrs as duration'
                isValid = false;
            }
            if (isValid) {
                errorMsgs.durationMsg = '';
            }
        }
        this.setState({ errorMsgs: errorMsgs })
    }

    saveCourse() {
        let course = this.state.course;
        CourseService.saveCourse(course).then((res) => {
            let data = res.data;
            if (data != null) {
                alert("Course saved sucessfully");
            }
        })
    }

    resetFieldValue() {
           let course = this.state.course;
           course.courseName = '';
           course.courseDescription = '';
           course.technology = '';
           course.duration ='';
           course.launchUrl = '';

           let errorMsgs = this.state.errorMsgs;
           errorMsgs.courseNameMsg = '';
           errorMsgs.courseDescMsg = '';
           errorMsgs.technologyMsg = '';
           errorMsgs.durationMsg = '';
           errorMsgs.launchUrlMsg = '';

            this.setState({
              course: course,
              errorMsgs:errorMsgs
            });  
    }

    navigateBack(){
        this.props.navigate('/dashboard')
    } 

    render() {
        return (
            <div style={{ width: "100%" }}>
                <h6 className="text-center" style={{ padding: "5%" }}>Add New Course</h6>
                <div style={{ marginLeft: "5%", marginBottom: "2%" }}>
                    <div className="row" style={{ paddingBottom: "1%", textAlign: "justify" }}>
                        Course Name : <input id="courseName" name="courseName" type="text" placeholder="Course Name"  value={this.state.course.courseName} minLength="20" onChange={this.onChangeValue} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.courseNameMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.courseNameMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingBottom: "1%" }}>
                        Course Description :&nbsp;<input id="courseDescription" name="courseDescription" type="textbox" placeholder="Description" value={this.state.course.courseDescription} minLength="100" onChange={this.onChangeValue} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.courseDescMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.courseDescMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingBottom: "5%" }}>
                        Technology :&nbsp;<input id="technology" name="technology" type="text" placeholder="Technology" value={this.state.course.technology} onChange={this.onChangeValue} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.technologyMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.technologyMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingBottom: "1%" }}>
                        LaunchUrl : &nbsp;<input id="launchUrl" name="launchUrl" type="text" placeholder="Launch url" value={this.state.course.launchUrl} onChange={this.onChangeValue} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.launchUrlMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.launchUrlMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingBottom: "1%" }}>
                        Duration :&nbsp;<input id="duration" name="duration" type="text" placeholder="Duration" value={this.state.course.duration} onChange={this.onChangeValue} onBlur={this.validateFieldValue} />
                        {this.state.errorMsgs.durationMsg.length > 0 ? <span className="error"> {this.state.errorMsgs.durationMsg}</span> : null}
                    </div>
                    <div className="row" style={{ paddingBottom: "2%" }}>
                        <button onClick={this.saveCourse}>Save</button> &nbsp; &nbsp;
                        <button onClick={this.resetFieldValue}>Reset</button>
                        <button onClick={this.navigateBack}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AddCourse);