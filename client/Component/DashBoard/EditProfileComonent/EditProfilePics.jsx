import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Image, Video, Transformation, CloudinaryContext }
  from 'cloudinary-react';
import { connect } from 'react-redux';

import { updateUserProfilePics } from '../../../actions/authActions';


class EditProfilePics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  /**
   * @description upload widget
   *
   * @method uploadWidget
   *
   * @param { event } event
   *
   * @memberof EditProfilePics
   *
   * @return {void}
   */
  uploadWidget(event) {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dq3xmgag2', upload_preset: 'yj9pyvvc', tags: ['xmas'] },
      (error, result) => {
        const imageUrl = result[0].url;
        this.props.updateUserProfilePics(imageUrl);
      }
    );
  }

 /**
   * @method render
   * @returns {object} EditProfilePics Component
   */
  render() {
    return (
      <div className="col s12 m4">
        <a
          className="btn-floating btn-large waves-effect waves-light teal upload"
          href="#?"
          role="button"
          tabIndex={0}
          onClick={this.uploadWidget}
          style={{ position: 'relative', left: 153, top: 38 }}
          type="file"
          accept="image/*"
        >
          <i className="fa fa-folder-open-o" />
        </a>
        <img
          id="blah"
          src={this.props.imageUrl}
          alt="your img"
          className="responsive-img"
        />
      </div>
    );
  }
}
EditProfilePics.propTypes = {
  updateUserProfilePics: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
  return {
    imageUrl: state.authReducer.user.imageUrl
  };
}

export default connect(mapStateToProps, { updateUserProfilePics })(EditProfilePics);
