import React from 'react';
import Button from '../Button';
import Form from '../Form';

const TodoItem = ({ todo, handleDeleteTodo, handleDoneTodo, handleEditMode,handleEditTodo, ...restProps }) => {
    const { id, label, isDone, isEditting } = todo;
    return (
        <li
                // nếu isDone = true thì sẽ vào trạng thái undone và ngc lại 
            className={`todo-item ${isDone ? "done" : ""}`}
            {...restProps}
        >
                {/* ${isDone ? "done" : ""}`} ko viết  && vì khi ko có thì nó sẽ trở thành undef */}
                {/* Nếu isEditting = true => form sửa sẽ dc mở
                     Nếu isEditting = false => form sửa sẽ đóng
                */}
            {isEditting ? (<Form value={label} btnText="Save" handleSubmit={(editedLabel)=> handleEditTodo(id, editedLabel)}/>) : 
            (<>
                <span className="todo-label">{label}</span>
                <div className="todo-action">
                {/* nút delete phải truyền vào trong onclick một cái id để cho nó truyền qua bên kia so sánh với id của item hiện tại */}
                    <Button className="btn-delete" onClick={()=> handleDeleteTodo(id)}>Delete</Button>
                    {!isDone && <Button className="btn-edit" onClick={()=> handleEditMode(id)}>Edit</Button>}
                    <Button className="btn-done" onClick={()=> handleDoneTodo(id)}>{isDone ? "Undone" : "Done"}</Button>
                </div>
            </>)}
        </li>
    );
};

export default TodoItem;