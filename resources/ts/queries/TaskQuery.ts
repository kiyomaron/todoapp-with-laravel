import axios from "axios"
import {useQuery} from "react-query"
import { Task } from "../types/Task"


const useTasks = () => {
    return useQuery('tasks', async () => {
        const { data } = await axios.get<Task[]>('api/tasks')
        return data
    })
} 

export {
    useTasks
}