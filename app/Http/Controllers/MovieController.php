<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Reservation;
use App\Models\Seat;
use App\Models\ShowTime;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MovieController extends Controller
{
    
    public function index()
    {
        $movies = Movie::with('genres')->latest()->get();
        
        return Inertia::render('movies',[
            'movies' => $movies
        ]);
    }

    public function show(Movie $movie)
    {

        $movie->load('genres');
        $movie->load('artists');
        $movie->load('showTimes');

        // Only unique show dates for this movie
        $uniqueShowDates = $movie->showTimes()
            ->select('show_date')
            ->distinct()
            ->orderBy('show_date')
            ->pluck('show_date');

        $movies = Movie::with('genres')->inRandomOrder()->limit(4)->get();
        return Inertia::render('movieDetails',[
            'movie' => $movie,
            'movies' => $movies,
            'show_dates' => $uniqueShowDates,
        ]);
    }

    public function showTimes(Movie $movie,$date)
    {
        $seats = Seat::query()
            ->orderBy('row')
            ->orderBy('number')
            ->get()
            ->groupBy('row')
            ->toArray();

        
           
    
        $showTimes = ShowTime::where('movie_id',$movie->id)->where('show_date',Carbon::parse($date))
            ->orderBY('start_time')->with('reservations.seats')->get();


            

        return Inertia::render('seatLayout',[
            'movie' => $movie,
            'showTimes' => $showTimes,
            'seats' => $seats
        ]);
    }


    public function reservation(Request $request)
    {
        $request->validate([
            'show_time_id' => 'required',
            'seat_ids' => 'required|array'
        ]);

        $showTime = ShowTime::find($request->show_time_id);

        if(!$showTime){
            return back()->withErrors(['show_time_id' => 'سانس مورد نظر خود را انتخاب کنید']);
        }

        DB::transaction(function() use($showTime,$request){
            $reservation = Reservation::create([
                'user_id' => auth()->id(),
                'show_time_id' => $showTime->id,
                'price' => $showTime->price
            ]);
    
            $reservation->seats()->attach($request->seat_ids);
        });

        return to_route('panel.mybookings');
    }


}
