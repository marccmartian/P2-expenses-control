import { useEffect, useState } from "react";
import Header from "./components/Header";
import ExpensesList from "./components/ExpensesList";
import Modal from "./components/Modal";
import { generateId } from "./helpers";
import newExpenseIcon from "./img/nuevo-gasto.svg";
import Filters from "./components/Filters";

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );
  const [expenseToEdit, setExpenseToEdit] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const [leakedExpenses, setLeakedExpenses] = useState([]);

  // store budget at localStorage
  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if (budgetLS > 0) setIsValidBudget(true);
  }, []);

  // store expenses at localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  // filter expenses
  useEffect(() => {
    if (filterValue) {
      const leakedExpenses = expenses.filter(
        (item) => item.category === filterValue
      );
      setLeakedExpenses(leakedExpenses);
    }
  }, [filterValue]);

  useEffect(() => {
    if (Object.keys(expenseToEdit).length > 0) {
      setShowModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [expenseToEdit]);

  const handleNewExpense = () => {
    setShowModal(true);
    setExpenseToEdit({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };

  const saveExpense = (expense) => {
    if (expense.id) {
      const updatedExpenses = expenses.map((item) =>
        item.id === expense.id ? expense : item
      );
      setExpenses(updatedExpenses);
      setExpenseToEdit({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className={showModal ? "fijar" : ""}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filters
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />

            <ExpensesList
              expenses={expenses}
              setExpenseToEdit={setExpenseToEdit}
              deleteExpense={deleteExpense}
              filterValue={filterValue}
              leakedExpenses={leakedExpenses}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={newExpenseIcon}
              alt="new expense icon"
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          expenseToEdit={expenseToEdit}
          setExpenseToEdit={setExpenseToEdit}
        />
      )}
    </div>
  );
}

export default App;
