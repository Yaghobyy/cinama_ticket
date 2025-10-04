<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    

    public function index()
    {
        $movies = Movie::query()->with('genres')->latest()->get();

        return Inertia::render('home',[
            'movies' => $movies
        ]);
    }
}
