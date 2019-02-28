export class Task {
    taskId: number;
    taskName: string;
    parentId: number;
    parent: Task;
    startDate: Date;
    endDate: Date;
    priority: number;
}
