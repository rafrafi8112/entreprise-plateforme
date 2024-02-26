<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
class TaskController extends Controller
{
    // Display a listing of tasks
    public function index()
    {
        $tasks = Task::with(['project', 'assignedTo'])->get();
        return TaskResource::collection($tasks);
    }

    // Store a newly created task
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());
        return response()->json($task, Response::HTTP_CREATED);
    }

    // Display the specified task
    public function show(Task $task)
    {
        return response()->json($task);
    }

    // Update the specified task
    public function update(UpdateTaskRequest $request, Task $task)
    {  

       
        $task->update($request->validated());
        return response()->json($task);
    }
    public function updateStatus(Request $request, $taskId)
    {
        // Find the task by ID
        $task = Task::find($taskId);

        if (!$task) {
            // If no task is found, return a 404 response
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Update the status of the task
        $status = $request->input('status');
        $task->status = $status;

        if ($task->save()) {
            // Log the successful update
            Log::info('Task status updated successfully', ['id' => $taskId, 'status' => $status]);
            return response()->json($task);
        } else {
            // Log the failed update
            Log::error('Task status update failed', ['id' => $taskId]);
            return response()->json(['message' => 'Failed to update task status'], 500);
        }
    }


    // Remove the specified task from storage
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
    
}