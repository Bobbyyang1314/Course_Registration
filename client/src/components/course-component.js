import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const history = useHistory();
    const handleTakeToLogin = () => {
      history.push("/login");
    };

    let [courseData, setCourseData] = useState(null);
    useEffect(() => {
        console.log("Using effect.")
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        }

        if (currentUser.user.role == "instructor"){
            CourseService.get(_id)
                .then((data) => {
                    console.log(data);
                    setCourseData(data.data);
                }).catch((err) => {
                    console.log(err);
            });
        } else if (currentUser.user.role == "student") {
            // console.log("Getting data for students");
            CourseService.getEnrolledCourses(_id).then((data) => {
                console.log(data);
                setCourseData(data.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);
    
    return <div style={{padding: "3rem"}}>
        {!currentUser && (
                <div>
                    <p>You must login before seeing your courses.</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg">
                        Take me to login page
                    </button>
                </div>
        )}

        {currentUser && currentUser.user.role == "instructor" && (
            <div>
                <h2>Course</h2>
                <p>The courses you need to teach.</p>
            </div>
        )}

        {currentUser && currentUser.user.role == "student" && (
            <div>
                <h2>Course</h2>
                <p> The courses you have enrolled.</p>
            </div>
        )}
        {currentUser && courseData && courseData.length != 0 && (
            <div>
                {/*<p>Here is the data we got back from the server.</p>*/}
                {courseData.map((course) => (
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body bg-light border rounded-3">
                            <button className="btn btn-primary card-title" >{course.title}</button>
                            <p className="card-text">Description: {course.description}</p>
                            <p>Student Count: {course.students.length}</p>
                            <p>Price: {course.price}</p>
                            {/*<button className="btn btn-primary">{ course.price }</button>*/}
                        </div>
                    </div>
                ))}
            </div>
        )}


    </div>;
};

export default CourseComponent;