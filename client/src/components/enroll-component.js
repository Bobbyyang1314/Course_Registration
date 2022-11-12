import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import courseService from "../services/course.service";
import CourseService from "../services/course.service";


const EnrollComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const history = useHistory();
    let [searchInput, setSearchInput] = useState("");
    let [searchResult, setSearchResult] = useState(null);
    const handleTakeToLogin = () => {
        history.push("/login");
    };

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    };


    const handleSearch = () => {
        courseService.getCourseByName(searchInput).then((data) => {
            console.log(data);
            setSearchResult(data.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleEnroll = (e) => {
        // console.log(e.target.id);
        CourseService.enroll(e.target.id, currentUser.user._id)
            .then(
            (response) => {
                window.alert("Done Enrollment!");
                history.push("/course");
            }).catch((err) => {
                console.log(err);
        });
    };

    return (
        <div style={{ padding: "3rem" }}>
            {!currentUser && (
                <div>
                    <p>You must login first before searching for courses.</p>
                    <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
                        Take me to login page.
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role == "instructor" && (
                <div>
                    <h1>Only students can enroll in courses.</h1>
                </div>
            )}
            {currentUser && currentUser.user.role == "student" && (
                <div className="search input-group mb-3">
                    <input
                        onChange={handleChangeInput}
                        type="text"
                        class="form-control"
                    />
                    <button onClick={handleSearch} className="btn btn-primary">
                        Search
                    </button>
                </div>
            )}
            {currentUser && searchResult && searchResult.length > 0 && (
                <div>
                    <p>Data we got back from API.</p>
                    {searchResult.map((course) => (
                        <div key={course._id} className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <button className="btn btn-primary card-title" >{course.title}</button>
                                <p className="card-text">Description:{course.description}</p>
                                <p>Price: {course.price}</p>
                                <p>Student: {course.students.length}</p>
                                <a
                                    href="#"
                                    onClick={handleEnroll}
                                    className="card-text"
                                    className="btn btn-primary"
                                    id={ course._id }
                                >
                                    Enroll
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default EnrollComponent;