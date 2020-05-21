<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index(){
        return view('index');
    }

    public function showTasks(){
        return Task::all();
    }


}
