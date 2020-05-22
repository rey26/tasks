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

    public function show(){
        return Response::json(Task::all());
    }

    public function create(Request $request){
        $task = new Task;
        $task->description = $request->description;
        if($task->save()){
            return Response::json($task, 200);
        }
        return "Create error!";
    }

    public function setAsDone($id){
        $task = Task::find($id);
        $task->is_done = 1;
        if($task->save()){
            return Response::json($task, 200);
        }
        return "Create error!";
    }


}
