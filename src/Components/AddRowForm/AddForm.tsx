import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Modal from 'react-modal';
import { store } from "../../stote/store";
import { useAppSelector } from "../../app/hooks";
import { toggleAddFormVisible, addNewRow } from "../../stote/table-slice";
import { NewUser } from "../../types/table";

const schema = yup.object({
  id: yup.number().integer('Число должно быть целым').min(0).positive('Число должно быть положительным'),
  email: yup.string().email('Email должен удовлетворять шаблону ab@ab.ad').min(6, 'Email Должен содержать не менее 6 символов'),
  phone: yup.string().matches(/^(\(\d{3}\) ?)?\d{3}-\d{4}$/, 'Должно соответствовать формату (123)456-7890'),
  firstName: yup.string().min(2, 'Должно быть не менее 2 символов').max(20),
  lastName: yup.string().min(2, 'Должно быть не менее 2 символов').max(20),
  description: yup.string().min(10, 'Должно быть не менее 10 символов').max(500)
}).required();


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

const AddForm = () => {
  const isAddForm = useAppSelector(state => state.users.isAddForm)
  const uniqUsers = useAppSelector(state => state.users.uniqUsers)

  function closeModal() {
    store.dispatch(toggleAddFormVisible())
  }

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm<NewUser>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: NewUser) => {
    const ids = uniqUsers.map(item => item.id)
    const possibleId = data.id
    if (ids.includes(possibleId)) {
      setError("id", {
        type: "manual",
        message: "Такой Id уже существует в наборе данных"
      })
    } else {
      store.dispatch(addNewRow(data))
      closeModal()
    }
  }


  return (
    <Modal
      isOpen={isAddForm}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="form-modal">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">Id</label>
            <input id="validationCustom01" type="number" className="form-control" {...register("id")} />
            {errors.id && <div>{errors.id?.message}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">First name</label>
            <input id="validationCustom02" type="text" className="form-control" {...register("firstName")} />
            {errors.firstName && <div>{errors.firstName?.message}</div>}
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom03" className="form-label">Last name</label>
            <input id="validationCustom03" type="text" className="form-control" {...register("lastName")} />
            {errors.lastName && <div>{errors.lastName?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label">Email</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input id="validationCustomUsername" type="email" className="form-control" aria-describedby="inputGroupPrepend" {...register("email")} />
            </div>
            {errors.email && <div>{errors.email?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom04" className="form-label">Phone</label>
            <input id="validationCustom04" type="phone" className="form-control" {...register("phone")} />
            {errors.phone && <div>{errors.phone?.message}</div>}
          </div>
          <div className="col-md-12">
            <label htmlFor="validationCustom05" className="form-label">Description</label>
            <textarea id="validationCustom05" className="form-control" {...register("description")} />
            {errors.description && <div>{errors.description?.message}</div>}
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid}
            >
              Submit form
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export { AddForm }
