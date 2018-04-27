import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import { withRouter } from 'react-router';

export class ManageCoursePage extends React.Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      isDirty: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    }
    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, () => {
          if (this.state.isDirty)
            return 'You have unsaved information, are you sure you want to leave this page?';
        });
      }

  componentWillReceiveProps(nextProps){

    if(this.props.course.id != nextProps.course.id){
      //in case page is loaded directly
      console.log('componentWillReceiveProps');
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }



  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    this.setState({isDirty: true});
    return this.setState({course: course});
  }
  courseFormIsValid(){

    let formsIsValid = true;
    let errors = {};
    if(this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 characters.';
      formsIsValid = false;
    }
    this.setState({errors: errors});
    return formsIsValid;
  }
  saveCourse(event) {
    event.preventDefault();
    if(!this.courseFormIsValid()){
      return;
    }
    this.setState({saving: true, isDirty: false});
    this.props.actions.saveCourse(this.state.course).
      then(() => this.redirect('Saved successfully'))
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }
  deleteCourse(event){
    console.log('deleteCourse');
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.deleteCourse(this.state.course).
      then(() => this.redirect('Deleted successfully'))
      .catch(error => {
        toastr.error('DeleteCourse error:' + error);
        this.setState({saving: false});
      });
  }

  redirect(message) {
    console.log('Redirecting....');
    this.setState({saving: false});
    toastr.success(message);

    this.context.router.push('/courses');
  }
  render() {
    return (
        <CourseForm
          allAuthors= {this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          onDelete={this.deleteCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}/>
    );
  }
}
ManageCoursePage.propTypes = {
 course: PropTypes.object.isRequired,
 authors: PropTypes.array.isRequired,
 actions: PropTypes.object.isRequired,
 router: PropTypes.object,
 route: PropTypes.object
};
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};
function getCourseById(courses, id){
  const course = courses.filter(course => course.id == id);
  console.log('filter result: ' + course[0]);
  // filter returns always an array
  if(course) return course[0];

  console.log('Cannot find the course' + id);

  return {id: '', watchHref: '', title: '', authorId: '', length:'', category: ''};
}
function mapStateToProps(state, ownProps){
  const courseId = ownProps.params.id;
  console.log('mapStateToProps courseId ' + courseId);
  let course = {id: '', watchHref: '', title: '', authorId: '', Length:'', category: ''};

  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
    if(course == undefined){
      console.log('mapStateToProps getCourseById: ' + course);
      course = {id: '', watchHref: '', title: '', authorId: '', length:'', category: ''};
    }
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage));
