import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate, formatMoney } from "../helpers";
import savingIcon from "../img/icono_ahorro.svg";
import houseIcon from "../img/icono_casa.svg";
import foodIcon from "../img/icono_comida.svg";
import expensesIcon from "../img/icono_gastos.svg";
import leisureIcon from "../img/icono_ocio.svg";
import healthIcon from "../img/icono_salud.svg";
import subscriptionsIcon from "../img/icono_suscripciones.svg";

const icons = {
  ahorro: savingIcon,
  casa: houseIcon,
  comida: foodIcon,
  gastos: expensesIcon,
  ocio: leisureIcon,
  salud: healthIcon,
  suscripciones: subscriptionsIcon,
};

const Expense = ({ expense, setExpenseToEdit, deleteExpense }) => {
  const { id, date, expenseName, amount, category } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseToEdit(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteExpense(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={icons[category]} alt="icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{expenseName}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatDate(date)}</span>{" "}
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{formatMoney(amount)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
