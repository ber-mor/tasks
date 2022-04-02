import {FaTimes} from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return(
		<div onDoubleClick={()=>onToggle(task.id)} className={`task ${task.reminder ? 'reminder':''}`}>
			<h3>{task.text}
				<FaTimes 
					style={faStyle} 
					onClick={()=>onDelete(task.id)}
				/>
			</h3>
			<p>{task.day}</p>
		</div>
	) 
}

const faStyle = {
	color: 'pink',
	cursor: 'pointer'
}

export default Task;
