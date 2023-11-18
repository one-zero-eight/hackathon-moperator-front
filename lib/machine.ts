//  {
import { fetcher } from "@/lib/api";
//     "id": 0,
//     "name": "string",
//     "type": "string",
//     "description": "string",
//     "status": "free",
//     "current_location": "string",
//     "suitable_tasks": [
//       {
//         "id": 0,
//         "type": {
//           "id": 0,
//           "title": "string",
//           "description": "string"
//         },
//         "title": "string",
//         "description": "string",
//         "status": "draft",
//         "priority": "string",
//         "location": "string",
//         "starting": "2023-11-18T20:36:13.108Z",
//         "deadline": "2023-11-18T20:36:13.108Z",
//         "created_at": "2023-11-18T20:36:13.108Z",
//         "updated_at": "2023-11-18T20:36:13.108Z",
//         "current_machine": {
//           "id": 0,
//           "name": "string",
//           "type": "string",
//           "status": "free",
//           "current_location": "string"
//         },
//         "current_agregate": {
//           "id": 0,
//           "name": "string",
//           "type": "string",
//           "status": "string",
//           "current_location": "string"
//         }
//       }
//     ],
//     "current_task": {
//       "id": 0,
//       "type": {
//         "id": 0,
//         "title": "string",
//         "description": "string"
//       },
//       "title": "string",
//       "description": "string",
//       "status": "draft",
//       "priority": "string",
//       "location": "string",
//       "starting": "2023-11-18T20:36:13.108Z",
//       "deadline": "2023-11-18T20:36:13.108Z",
//       "created_at": "2023-11-18T20:36:13.108Z",
//       "updated_at": "2023-11-18T20:36:13.108Z",
//       "current_machine": {
//         "id": 0,
//         "name": "string",
//         "type": "string",
//         "status": "free",
//         "current_location": "string"
//       },
//       "current_agregate": {
//         "id": 0,
//         "name": "string",
//         "type": "string",
//         "status": "string",
//         "current_location": "string"
//       }
//     },
//     "suitable_agregates": [
//       {
//         "id": 0,
//         "name": "string",
//         "type": "string",
//         "status": "string",
//         "current_location": "string"
//       }
//     ]
//   }
import { Task } from "@/lib/task";
import useSWR from "swr";

export type Machine = {
  id: number;
  name: string;
  type: string;
  description: string;
  status: MachineStatus;
  current_location: string;
  suitable_tasks: Task[];
  current_task: Task;
  suitable_agregates: Agregate[];
};

export type MachineStatus = "free" | "busy" | "broken";

export type Agregate = {
  id: number;
  name: string;
  type: string;
  description: string;
  status: string;
  current_location: string;
  suitable_tasks: Task[];
  current_task: Task;
};

export const machineStatusToText: { [key in MachineStatus]: string } = {
  free: "Свободна",
  busy: "Занята",
  broken: "Сломана",
};

export function useMachines() {
  const { data, error } = useSWR<Machine[]>("/machines", fetcher);

  return {
    machines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useMachine(id?: number) {
  const { data, error } = useSWR<Machine>(
    () => (id ? `/machines/${id}` : null),
    fetcher,
  );

  return {
    machine: data,
    isLoading: !error && !data,
    isError: error,
  };
}
