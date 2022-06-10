import { useEffect, useState } from "react";
import Message from "./Message";
import closeButton from "../img/cerrar.svg";

const initialValues = {
  expenseName: "",
  amount: 0,
  category: "",
};

const Modal = ({
  setShowModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  expenseToEdit,
  setExpenseToEdit,
}) => {
  const [expenseObj, setExpenseObj] = useState(
    Object.keys(expenseToEdit).length > 0 ? expenseToEdit : initialValues
  );
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (Object.keys(expenseToEdit).length > 0) {
  //     setExpenseObj(expenseToEdit);
  //   }
  // }, [expenseToEdit]);

  const hideModal = () => {
    setAnimateModal(false);
    setExpenseToEdit({});
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setExpenseObj({
      ...expenseObj,
      [name]: name === "amount" ? parseInt(value) : value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { expenseName, amount, category } = expenseObj;

    if ([expenseName, amount, category].includes("")) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    saveExpense(expenseObj);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={closeButton} alt="close modal" onClick={hideModal} />
      </div>

      <form
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
        onSubmit={handleOnSubmit}
      >
        <legend>
          {expenseToEdit.expenseName ? "Editar Gasto" : "Nuevo Gasto"}
        </legend>
        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del gasto"
            name="expenseName"
            value={expenseObj.expenseName}
            onChange={handleOnChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="amount">Cantidad</label>
          <input
            id="amount"
            type="number"
            placeholder="Cantidad del gasto: ej. 300"
            name="amount"
            value={expenseObj.amount}
            onChange={handleOnChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={expenseObj.category}
            onChange={handleOnChange}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={expenseToEdit.expenseName ? "Guardar cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
