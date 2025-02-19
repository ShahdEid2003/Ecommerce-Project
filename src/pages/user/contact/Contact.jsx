import React from "react";
import "./Contact.css";
import MainVeiw from "../../../components/user/mainVeiw/MainVeiw";
export default function Contact() {
  return (
    <>
      <MainVeiw title={"Contact"} subtitle={"Home/contact"} />
      <div className="container mt-5">
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093687!2d144.9547979153183!3d-37.81720974201445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1a6df1b%3A0x5045675218ce6e0!2s121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1610000000000"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="row gap-5 mt-5 d-flex justify-content-center ">
          <div className="col-md-4 contact-info p-4">
            <h4 className="fw-bold">Contact Info</h4>
            <div className="mb-3">
              <p className="fw-bold mb-1">Phone:</p>
              <span>+012 345 678 102 | +012 345 678 203</span>
            </div>

            <div className="mb-3">
              <p className="fw-bold mb-1">Email:</p>
              <span>email@here.com | your@email.here</span>
            </div>

            <div>
              <p className="fw-bold mb-1">Address:</p>
              <span>Address goes here, Street, Crossroad 123.</span>
            </div>
          </div>
          <div className="col-md-7 contact-form p-4">
            <h4 className="fw-bold">Get In Touch</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="fw-bold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="fw-bold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="fw-bold">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                ></textarea>
              </div>
              <button type="submit" className=" btnOrange w-100 fw-bold">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
