import { withFormik, FormikProps, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from 'react-modal';
import { store } from "../../stote/store";
import { addNewRow, toggleAddFormVisible } from "../../stote/table-slice";
import { useAppSelector } from "../../app/hooks";

interface FormValues {
  description: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  }
}

interface OtherProps {
  message: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialDescription?: string;
  initialFirstName?: string;
  initialId?: number;
  initialLastName?: string;
  initialPhone?: string;
  initialAddress?: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  }
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const AddRowForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, handleSubmit } = props;

  const isAddForm = useAppSelector(state => state.users.isAddForm)

  function closeModal() {
    store.dispatch(toggleAddFormVisible())
  }

  return (
    <Modal
      isOpen={isAddForm}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="form-modal">
        <Form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">Id</label>
            <Field name="id" type="number" className="form-control" />
            {touched.id && errors.id && <div>{errors.id}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <Field name="firstName" type="text" className="form-control" />
            {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <Field name="lastName" type="text" className="form-control" />
            {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label">Email</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <Field name="email" type="email" className="form-control" aria-describedby="inputGroupPrepend" />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">Phone</label>
            <Field name="phone" type="phone" className="form-control" />
            {touched.phone && errors.phone && <div>{errors.phone}</div>}
          </div>
          <div className="col-md-12">
            <label htmlFor="validationCustom03" className="form-label">Description</label>
            <Field name="description" component="textarea" className="form-control" />
            {touched.description && errors.description && <div>{errors.description}</div>}
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit form</button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

const validationSchema = Yup.object().shape({
  id: Yup.number().integer().min(0).positive().required(),
  email: Yup.string().email().min(6, 'must be at least 6 characters long').required('Enter valid email').required(),
  phone: Yup.string().matches(/^(\(\d{3}\) ?)?\d{3}-\d{4}$/, 'Должно соответствовать формату (123)456-7890').required(),
  firstName: Yup.string().min(2, 'Должно быть не менее 2 символов').max(20).required('Обязательное поле.'),
  lastName: Yup.string().min(2).max(20).required('Обязательное поле.'),
  description: Yup.string().min(10).max(300).required('Обязательное поле.'),

})

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
      description: props.initialDescription || '',
      firstName: props.initialFirstName || '',
      id: props.initialId || 0,
      lastName: props.initialLastName || '',
      phone: props.initialPhone || '',
      address: props.initialAddress || {
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
      }
    };
  },
  validationSchema: validationSchema,
  handleSubmit: (values, { setSubmitting, setErrors }) => {
    console.log(values);
    if (values.id < 100) {
      setErrors({ ['id']: 'Id Должен быть больше 100' })
      setSubmitting(false)
      return
    } else {

      store.dispatch(addNewRow(values))
    }

    store.dispatch(toggleAddFormVisible())
    setTimeout(() => {
      setSubmitting(false)
    }, 1000)
  },

})(AddRowForm);

export { MyForm }
