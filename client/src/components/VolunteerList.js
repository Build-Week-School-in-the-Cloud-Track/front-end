import React, { useEffect } from "react";
import { getVolunteers } from "../actions";
import { connect } from "react-redux";

function VolunteerList(props) {
  const fetchVolunteers = () => {
    props.getVolunteers();
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <div className="volunteers">
      {props.volunteers.map(volunteer => {
        return (
          <div className="volunteer" key={volunteer.id}>
            <h3>{volunteer.name}</h3>
            <p>Email: {volunteer.email}</p>
            <p>Availability: </p>
            <table>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
              {volunteer.availability.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.day}</td>
                    <td>{item.time_start}</td>
                    <td>{item.time_end}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    volunteers: state.volunteers,
    isFetchingVolunteers: state.isFetchingVolunteers,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getVolunteers })(VolunteerList);
