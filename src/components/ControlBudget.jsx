import { useEffect, useState } from "react";
import { formatMoney } from "../helpers";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlBudget = ({
  budget,
  setBudget,
  expenses,
  setExpenses,
  setIsValidBudget,
}) => {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    const totalAvailable = budget - totalSpent;
    const percentageValue = (
      ((budget - totalAvailable) / budget) *
      100
    ).toFixed(2);

    setSpent(totalSpent);
    setAvailable(totalAvailable);
    setTimeout(() => {
      setPercentage(percentageValue);
    }, 1300);
  }, [expenses]);

  const handleResetApp = () => {
    const result = confirm("¿Deseas reiniciar tu presupuesto y gastos?");
    if (result) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "red" : "#3B82F6",
            textColor: "#3B82F6",
          })}
          value={percentage}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatMoney(budget)}
        </p>
        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatMoney(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatMoney(spent)}
        </p>
      </div>
    </div>
  );
};

export default ControlBudget;
