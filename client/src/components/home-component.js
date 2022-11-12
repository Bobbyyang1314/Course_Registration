import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return <main>
    <div class="container py-4">
      <div class="p-5 mb-4 bg-light border rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Course Registration System</h1>
          <br/>
          <p class="col-md-10 fs-4">
            This system is used by teachers and students to select and manage courses.
            Teachers can publish their own courses, and students can search for course information based
            on course names to register and enroll in courses. Both students and teachers need to register
            personal accounts before they can choose courses.
          </p>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-dark border rounded-3">
            <h2>Sign Up</h2>
            <br/>
            <p>
              If you don't have an account yet, click the button below to register. When registering, you need to fill in your name, email, password and role. If you are a student, please fill in student. Or if you are a teacher, please fill in instructor.
            </p>
            <Link className="nav-link" to="/register" href="#">
              <button className="btn btn-outline-light " type="button">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2>Sign In</h2>
            <br/>
            <p>
              If you already have an account, click the button below to log in. If you are a student, you can select courses and query course information after logging in. If you are a course teacher, you can query and publish the course information you will teach.
            </p>
            <Link className="nav-link" to="/register" href="#">
              <button className="btn btn-primary" type="button">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <footer class="pt-3 mt-4 text-muted border-top">
        <p>&copy; 2022  @Bobby Yang</p>
      </footer>
    </div>
  </main>
};

export default HomeComponent;