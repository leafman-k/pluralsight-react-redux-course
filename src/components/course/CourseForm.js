import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, onSave, onDelete,onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        placeholder="Title"
        onChange={onChange}
        error={errors.title}/>
      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId}/>
        <TextInput
          name="category"
          label="Category"
          value={course.category}
          placeholder="Category"
          onChange={onChange}
          error={errors.category}/>
        <TextInput
            name="length"
            label="Length"
            value={course.length}
            placeholder="Length"
            onChange={onChange}
            error={errors.length}/>
        <input
          name="savebutton"
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}/>
        <input
            name="deletebutton"
            type="submit"
            disabled={saving}
            value={saving ? 'Deleting...' : 'Delete'}
            className="btn btn-danger"
            onClick={onDelete}/>
    </form>
  );
};
CourseForm.propTypes = {
  course: React.PropTypes.object,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CourseForm;
