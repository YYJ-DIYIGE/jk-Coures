import API from "./course";
import request from "./axios";
export default {
  phoneCode(params) {
    return request.post(API.phonecode, params);
  },
  loginSms(params) {
    return request.post(API.loginsms, params, {
      withCredentials: true,
    });
  },
  all(params) {
    return request.get(API.allCourses, params);
  },
  sortCourse(params) {
    return request.get(API.sortCourse, params);
  },
  searchCourse(params) {
    return request.get(API.searchCourse, params);
  },
  courseEdit(id) {
    return request.get(API.courseEdit(id));
  },
};
