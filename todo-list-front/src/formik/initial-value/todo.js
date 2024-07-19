

export const TodoInitialValues = (userId) => {
    return{
        title:"",
        description: "",
        completed: false,
        userId
    }
};

export const TodoUpdateInitialValues = (todo) => {
    return {
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        userId: todo.userId
    }
}