<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Response;
use Throwable;

class TasksController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function getAll(?int $order = null): JsonResponse
    {
        try {
            if ($order) {
                $response = Response::json(Task::orderBy('created_at', 'desc')->get());
            } else {
                $response = Response::json(Task::all());
            }
        } catch (Throwable $t) {
            if (App::environment('local')) {
                $message = $t->getMessage();
            } else {
                $message = 'An error ocurred!';
            }
            $response = Response::json(['error' => $message]);
        }

        return $response;
    }

    public function create(Request $request): JsonResponse
    {
        $task = new Task();

        if ($request->description === null) {
            $task->description = "New Task";
        } else {
            $task->description = $request->description;
        }

        if ($task->save()) {
            $response = Response::json($task, 200);
        } else {
            $response = Response::json(['error' => 'An error ocurred while saving task']);
        }

        return $response;
    }

    public function markAsDone(int $id): JsonResponse
    {
        $task = Task::find($id);
        $task->is_done = 1;
        // return task set as done
        if ($task->save()) {
            $response = Response::json($task, 200);
        } else {
            $response = Response::json(['error' => 'An error ocurred while marking as done']);
        }

        return $response;
    }
}
