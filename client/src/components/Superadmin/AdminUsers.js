import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";
import './ServiceLocation.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AiOutlineUserAdd } from 'react-icons/ai'

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    name: "Lokesh",
    phone: "9818505260",
    location: "Lazimpat",
    email: "lokesh.bajracharya55@gmail.com",
    username: "lokesh",
    password: "lokesh123",
  },
  {
    id: 2,
    name: "Lokesh",
    phone: "9818505260",
    location: "Lazimpat",
    email: "lokesh.bajracharya55@gmail.com",
    username: "lokesh",
    password: "lokesh123",
  }
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: payload => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: task => {
    count += 1;
    tasks.push({
      ...task,
      id: count
    });
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.name = data.name;
    task.description = data.description;
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const AdminUsers = () => (
  <div style={styles.container}>
    {/* Super Users */}
    <CRUDTable
      caption="Super Users"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="S.N" hideInCreateForm />
        <Field name="name" label="Name" placeholder="name" />
        <Field name="phone" label="Phone" placeholder="name" />
        <Field name="location" label="Location" placeholder="name" />
        <Field name="email" label="Email" placeholder="name" />
        <Field name="username" label="Username" placeholder="name" />

      </Fields>
      <CreateForm
        name="Task Creation"
        message="Create a new service center!"
        trigger="Add SuperUser"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide task's name";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          return errors;
        }}
      />

      <UpdateForm
        name="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.name) {
            errors.name = "Please, provide task's name";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        name="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>

    {/* Admin USers */}
    <CRUDTable
      caption="Admin Users"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="S.N" hideInCreateForm />
        <Field name="name" label="Name" placeholder="name" />
        <Field
          name="description"
          label="Location"
          render={DescriptionRenderer}
        />
        <Field name="name" label="Name" placeholder="name" />
      </Fields>
      <CreateForm
        name="Task Creation"
        message="Create a new service center!"
        trigger="Add Admin"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide task's name";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          return errors;
        }}
      />

      <UpdateForm
        name="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.name) {
            errors.name = "Please, provide task's name";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        name="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);
export default AdminUsers;
