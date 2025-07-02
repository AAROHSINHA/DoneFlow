interface TaskProp {
    taskName: String
}

const TaskTitle:React.FC<TaskProp> = ({taskName}) => {
    return (
        <>
        <h3 className="text-white font-semibold text-xl leading-tight">{taskName}</h3>
        </>
    )
}

export default TaskTitle;