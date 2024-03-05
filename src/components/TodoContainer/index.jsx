import React, { useEffect, useState } from "react";
import Form from "../Form";
import TodoItem from "../TodoItem";

const LOCAL_TODOS = "todos";

const TodoContainer = () => {
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_TODOS))
  );
  // Muốn todos có value thì lấy <Form/> add value vào cho todos
  const jsonTodos = JSON.stringify(todos);
  //   nếu đưa todos vào làm desc thì ko nên truyền [] or {} đưa vào desc nên chuyển đổi thành chuỗi rồi đứa biến chứa giá trị đó vào.
  useEffect(() => {
    localStorage.setItem(LOCAL_TODOS, jsonTodos);
  }, [jsonTodos]);
  let handleAddTodo = (newLabel) => {
    // mỗi lần đc gọi sẽ setTodos
    const newTodo = {
      id: Date.now(),
      label: newLabel || "",
      isDone: false,
      isEditting: false,
    };
    // [newTodo]: là giá trị mới mà user nhập vào
    // [todos]: là giá trị trước đó
    // newTodos: là giá trị lưu trữ các item
    setTodos((prevState) => [newTodo, ...prevState]);
  };
  const handleDeleteTodo = (deleteId) => {
    // hàm filter này làm nhiệm vụ lọc ra những item có id khacs nhau ( id nào khác nhau thoả điều kiện thì return ra)
    // ở đây nó dùng lại prevState là mảng chứa các item khi addTodo và filter trả ra giá trị mới là todo rồi từ todo.id so sánh với cái deleteId mà bên compoent kia truyền qua
    setTodos((prevState) => prevState.filter((todo) => todo.id !== deleteId));
  };
  const handleDoneTodo = (doneId) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        // nếu todo.id hiện tại bằng với doneId đc truyền từ bên kia qua thì sẽ thực hiện  {...todo, isDone: !todo.isDone}
        //  {...todo}:
        return todo.id === doneId ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };
  const handleEditMode = (editedId) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        return todo.id === editedId
          ? { ...todo, isEditting: !todo.isEditting }
          : todo;
      })
    );
  };
  const handleEditTodo = (editedId, edittedLabel) => {
    // edittedLabel: là giá trị mới mà ng dùng sửa
    setTodos((prevState) =>
      prevState.map((todo) => {
        return todo.id === editedId
          ? { ...todo, label: edittedLabel, isEditting: false }
          : todo;
      })
    );
  };
  // TodoItemActionsProps: là obj chứa các method để lấy obj giải vào trong <TodoItem/>
  // dùng để chứa các hàm handle xoá, sửa, edit sau đó cho TodoItem nhận làm props
  const TodoItemActionsProps = {
    handleDeleteTodo,
    handleDoneTodo,
    handleEditMode,
    handleEditTodo,
  };
  return (
    <div className="container">
      {/* Title */}
      <h1 className="title">Todo List</h1>
      {/* AddForm */}
      <Form btnText="Add" handleSubmit={handleAddTodo} />
      <ul className="todo-list" id="todoList">
        {/* Task 1: Normal status */}
        {todos.map((todo, index) => {
          {
            /* Laays cac phan tu obj ra */
          }
          {
            /* dùng id ko dùng index vì id nó sẽ ko bị trùng còn index vẫn có trường hợp trùng */
          }
          return (
            <TodoItem
              key={todo.id || index}
              todo={todo}
              {...TodoItemActionsProps}
            ></TodoItem>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoContainer;
