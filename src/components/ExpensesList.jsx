import React from "react";
import Expense from "./Expense";

const ExpensesList = ({
  expenses,
  setExpenseToEdit,
  deleteExpense,
  filterValue,
  leakedExpenses,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filterValue ? (
        <>
          <h2>
            {leakedExpenses.length
              ? "Gastos"
              : "No hay gastos en esta categoría"}
          </h2>
          {leakedExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setExpenseToEdit={setExpenseToEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setExpenseToEdit={setExpenseToEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpensesList;
