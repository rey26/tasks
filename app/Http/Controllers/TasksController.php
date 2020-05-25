<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use App\Task;

class TasksController extends Controller
{
    public function index(){
        return view('index');
    }

    public function getAll($order = null){
        // order tasks from latest by default but when $order is set to 1, the task will be ordered the first created
        if($order){
            $response = Response::json(Task::orderBy('created_at', 'desc')->get());
        } else {
            $response = Response::json(Task::all());
        }
        return $response;
    }

    public function create(Request $request){
        $task = new Task;
        // set task description to default value
        if($request->description == null)
            $task->description = "New Task";
        else
            $task->description = $request->description;
        // return recently created task
        if($task->save()){
            return Response::json($task, 200);
        }
        return "Create error!";
    }

    public function setAsDone($id){
        $task = Task::find($id);
        $task->is_done = 1;
        // return task set as done 
        if($task->save()){
            return Response::json($task, 200);
        }
        return "SetAsDone error!";
    }


}
