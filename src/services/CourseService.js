import axios from 'axios';
import { isEmpty} from 'lodash';

const COURSE_API_VIEW_ALL_URL = 'https://lmsuserservice.azurewebsites.net/users/getall'
const COURSE_API_SEARCH_BY_ALL_PARAMS_URL = 'https://lmscourse.azurewebsites.net/courses/get'
const COURSE_API_SEARCH_BY_URL = 'https://lmscourse.azurewebsites.net/courses/info'
const COURSE_API_SAVE_URL = 'https://lmscourse.azurewebsites.net/courses/add'
const COURSE_API_NAME_EXIST_URL = 'https://lmscourse.azurewebsites.net/courses/exists'
const COURSE_API_DELETE_URL = 'https://lmscourse.azurewebsites.net/courses/delete'

class CourseService {
    getCourses(){
        return axios.get(COURSE_API_VIEW_ALL_URL)
    }

    saveCourse(course){
        return axios.post(COURSE_API_SAVE_URL,course)
    }

    deleteCourse(courseName){
        let url = COURSE_API_DELETE_URL+'/'+courseName;
        return axios.delete(url)
    }

    isCourseNameExists(courseName){
        let url = COURSE_API_NAME_EXIST_URL+'/'+courseName;
        return axios.get(url)
    }

    getCoursesBySearchParams(searchParams){
        let url = '';
        if(!isEmpty(searchParams.searchText) && searchParams.duration==="-1"){
            url = COURSE_API_SEARCH_BY_URL+'/'+searchParams.searchBy+'/'+searchParams.searchText
        }else if(searchParams.duration!=="-1" && isEmpty(searchParams.searchText)){
            url = COURSE_API_SEARCH_BY_URL+'/'+searchParams.from+'/'+searchParams.to
        }else{
            url = COURSE_API_SEARCH_BY_ALL_PARAMS_URL+'/'+searchParams.searchBy+'/'+searchParams.searchText+'/'+searchParams.from+'/'+searchParams.to
        }
        console.log("url>>>>> "+url)
        return axios.get(url)
    }
}
export default new CourseService()